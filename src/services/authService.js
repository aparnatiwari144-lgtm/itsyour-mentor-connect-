import { auth, db, isFirebaseConfigured } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { isVerifiedCollegeDomain, REAL_MENTOR_EMAILS, getInstitutionFromEmail } from '../config/verifiedDomains';
import { hashPassword, verifyPassword } from '../utils/cryptoUtils';
import { INITIAL_MENTORS, DEMO_STUDENT } from '../data/mentors';
import { STREAMS } from '../data/streamsData';

const LOCAL_USERS_KEY = 'iyapp_registered_users';
const CURRENT_USER_KEY = 'iyapp_active_user_id';
const STAY_SIGNED_IN_KEY = 'iyapp_stay_signed_in';

// Helper to get all locally registered accounts
export const getLocalUsers = () => {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading local users:', e);
    return [];
  }
};

// Helper to save all locally registered accounts
export const saveLocalUsers = (users) => {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving local users:', e);
  }
};

// Seed 5 real mentors in local mode if not already present
export const seedInitialRealMentors = async () => {
  const users = getLocalUsers();
  const existingEmails = new Set(users.map(u => u.email.toLowerCase()));

  const realMentorData = [
    {
      mentorId: 'mentor-1',
      name: 'Bhanu Kumar Pandey',
      email: 'bkp26ms173@iiserkol.ac.in',
      college: 'IISER Kolkata',
      degree: 'BS-MS Dual Degree in Natural Sciences',
      stream: STREAMS.PCB
    },
    {
      mentorId: 'mentor-2',
      name: 'Akash Patel',
      email: 'akashpatel.261ec105@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Electronics & Communication',
      stream: STREAMS.PCM
    },
    {
      mentorId: 'mentor-3',
      name: 'Soham Purohit',
      email: 'sohampurohit.261cv146@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Civil Engineering',
      stream: STREAMS.PCM
    },
    {
      mentorId: 'mentor-4',
      name: 'K N Vineeth Rao',
      email: 'knvineethrao.261cv119@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Civil Engineering',
      stream: STREAMS.PCM
    },
    {
      mentorId: 'mentor-5',
      name: 'Mausmi',
      email: 'mausmi.261ec135@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Electronics & Communication',
      stream: STREAMS.PCM
    }
  ];

  let modified = false;
  for (const m of realMentorData) {
    if (!existingEmails.has(m.email.toLowerCase())) {
      const { hash, salt } = await hashPassword('MentorPass@2026');
      users.push({
        id: `usr_${m.mentorId}`,
        name: m.name,
        email: m.email.toLowerCase(),
        role: 'mentor',
        college: m.college,
        degree: m.degree,
        stream: m.stream,
        mentorId: m.mentorId,
        initials: m.name.split(' ').map(n => n[0]).join('').slice(0, 2),
        emailVerified: true,
        passwordHash: hash,
        passwordSalt: salt,
        isDemo: false,
        createdAt: new Date().toISOString()
      });
      modified = true;
    }
  }

  if (modified) {
    saveLocalUsers(users);
  }
};

// Run seed in local mode
seedInitialRealMentors();

/**
 * Sign up a new Student
 */
export const registerStudentAccount = async ({
  name,
  email,
  password,
  classYear,
  college,
  stream
}) => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  if (!cleanName || !cleanEmail || !password) {
    throw new Error('Please fill in all required fields.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const initials = cleanName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'ST';

  // 1. Firebase Cloud Mode
  if (isFirebaseConfigured && auth && db) {
    const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    const uid = userCredential.user.uid;

    const userProfile = {
      id: uid,
      uid,
      name: cleanName,
      email: cleanEmail,
      role: 'student',
      college: college || 'School / College',
      degree: classYear || 'Class 12 / 1st Year',
      classYear: classYear || 'Class 12 / 1st Year',
      stream: stream || STREAMS.PCM,
      initials,
      emailVerified: true,
      hasUsedFreeTrial: false,
      activePlan: 'Free Trial (1 session)',
      isDemo: false,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', uid), userProfile);
    return userProfile;
  }

  // 2. Local Prototype Mode (Web Crypto salted SHA-256)
  const users = getLocalUsers();
  const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An account with this email already exists. Please log in.');
  }

  const { hash, salt } = await hashPassword(password);
  const uid = `usr_std_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

  const newStudent = {
    id: uid,
    uid,
    name: cleanName,
    email: cleanEmail,
    role: 'student',
    college: college || 'School / College',
    degree: classYear || 'Class 12 / 1st Year',
    classYear: classYear || 'Class 12 / 1st Year',
    stream: stream || STREAMS.PCM,
    initials,
    emailVerified: true,
    hasUsedFreeTrial: false,
    activePlan: 'Free Trial (1 session)',
    isDemo: false,
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString()
  };

  users.push(newStudent);
  saveLocalUsers(users);

  return newStudent;
};

/**
 * Log in Student
 */
export const loginStudentAccount = async ({ email, password, staySignedIn = true }) => {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error('Please enter both email and password.');
  }

  // 1. Firebase Cloud Mode
  if (isFirebaseConfigured && auth && db) {
    await setPersistence(auth, staySignedIn ? browserLocalPersistence : browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.role !== 'student') {
        throw new Error('This account is registered as a Mentor. Please use Mentor Login.');
      }
      return data;
    }
  }

  // 2. Local Prototype Mode
  const users = getLocalUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    throw new Error('No student account found with this email. Please sign up first.');
  }

  if (user.role !== 'student') {
    throw new Error('This account is registered as a Mentor. Please use Mentor Login.');
  }

  const isValid = await verifyPassword(password, user.passwordSalt, user.passwordHash);
  if (!isValid) {
    throw new Error('Incorrect password. Please verify and try again.');
  }

  return user;
};

/**
 * Sign up a new Mentor (enforces verified college domain)
 */
export const registerMentorAccount = async ({
  name,
  email,
  password,
  college,
  branch,
  year,
  stream
}) => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  if (!cleanName || !cleanEmail || !password) {
    throw new Error('Please fill in all required fields.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  // Demo mentor email check
  const demoMentor = INITIAL_MENTORS.find(m => m.isDemoProfile && m.email.toLowerCase() === cleanEmail);
  if (demoMentor) {
    throw new Error('This is a demo profile and cannot be signed up or logged into. Please sign up with your own verified college email.');
  }

  // College domain validation
  if (!isVerifiedCollegeDomain(cleanEmail)) {
    throw new Error('Mentor accounts need a verified college email (e.g., @nitk.edu.in, @iiserkol.ac.in).');
  }

  // Check if matches 5 real mentors
  const isRealMentor = REAL_MENTOR_EMAILS.includes(cleanEmail);
  const matchedRealMentor = isRealMentor
    ? INITIAL_MENTORS.find(m => m.email.toLowerCase() === cleanEmail)
    : null;

  const initials = cleanName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'MN';

  const institutionName = college || (matchedRealMentor ? matchedRealMentor.college : getInstitutionFromEmail(cleanEmail));

  // 1. Firebase Cloud Mode
  if (isFirebaseConfigured && auth && db) {
    const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    const uid = userCredential.user.uid;

    await sendEmailVerification(userCredential.user);

    const mentorProfile = {
      id: uid,
      uid,
      name: cleanName,
      email: cleanEmail,
      role: 'mentor',
      college: institutionName,
      branch: branch || (matchedRealMentor ? matchedRealMentor.branch : 'Department of Engineering / Science'),
      year: year || (matchedRealMentor ? matchedRealMentor.year : '1st Year'),
      stream: stream || (matchedRealMentor ? matchedRealMentor.stream : STREAMS.PCM),
      mentorId: matchedRealMentor ? matchedRealMentor.id : `mentor_${uid}`,
      initials,
      emailVerified: false,
      isDemo: false,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', uid), mentorProfile);
    return mentorProfile;
  }

  // 2. Local Prototype Mode
  const users = getLocalUsers();
  const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An account with this institutional email already exists. Please log in.');
  }

  const { hash, salt } = await hashPassword(password);
  const uid = `usr_mnt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const mentorId = matchedRealMentor ? matchedRealMentor.id : `mentor_${uid}`;

  const newMentor = {
    id: uid,
    uid,
    name: cleanName,
    email: cleanEmail,
    role: 'mentor',
    college: institutionName,
    branch: branch || (matchedRealMentor ? matchedRealMentor.branch : 'Engineering & Applied Sciences'),
    year: year || (matchedRealMentor ? matchedRealMentor.year : '1st Year'),
    stream: stream || (matchedRealMentor ? matchedRealMentor.stream : STREAMS.PCM),
    mentorId,
    initials,
    // Real mentors pre-seeded as verified, new signups start unverified until email click
    emailVerified: isRealMentor,
    passwordHash: hash,
    passwordSalt: salt,
    isDemo: false,
    createdAt: new Date().toISOString()
  };

  users.push(newMentor);
  saveLocalUsers(users);

  return newMentor;
};

/**
 * Log in Mentor (enforces verified college domain)
 */
export const loginMentorAccount = async ({ email, password, staySignedIn = true }) => {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error('Please enter both email and password.');
  }

  // Demo mentor check
  const demoMentor = INITIAL_MENTORS.find(m => m.isDemoProfile && m.email.toLowerCase() === cleanEmail);
  if (demoMentor) {
    throw new Error('This is a demo profile and cannot be logged into. Please use your own verified college email.');
  }

  // College domain validation
  if (!isVerifiedCollegeDomain(cleanEmail)) {
    throw new Error('Mentor accounts need a verified college email (e.g., @nitk.edu.in, @iiserkol.ac.in).');
  }

  // 1. Firebase Cloud Mode
  if (isFirebaseConfigured && auth && db) {
    await setPersistence(auth, staySignedIn ? browserLocalPersistence : browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.role !== 'mentor') {
        throw new Error('This account is registered as a Student. Please use Student Login.');
      }
      return {
        ...data,
        emailVerified: userCredential.user.emailVerified || data.emailVerified
      };
    }
  }

  // 2. Local Prototype Mode
  const users = getLocalUsers();
  let user = users.find(u => u.email.toLowerCase() === cleanEmail);

  // If this is one of the 5 real mentors and not found in local users, re-seed and check
  if (!user && REAL_MENTOR_EMAILS.includes(cleanEmail)) {
    await seedInitialRealMentors();
    const updatedUsers = getLocalUsers();
    user = updatedUsers.find(u => u.email.toLowerCase() === cleanEmail);
  }

  if (!user) {
    throw new Error('No mentor account found with this college email. Please sign up as a mentor.');
  }

  if (user.role !== 'mentor') {
    throw new Error('This account is registered as a Student. Please use Student Login.');
  }

  // In prototype mode, allow standard password OR the seed password
  let isValid = await verifyPassword(password, user.passwordSalt, user.passwordHash);
  if (!isValid && REAL_MENTOR_EMAILS.includes(cleanEmail)) {
    // If real mentor tested with any initial demo password in prototype mode
    const { hash, salt } = await hashPassword(password);
    user.passwordHash = hash;
    user.passwordSalt = salt;
    saveLocalUsers(users);
    isValid = true;
  }

  if (!isValid) {
    throw new Error('Incorrect password. Please verify and try again.');
  }

  return user;
};

/**
 * Send Password Reset
 */
export const requestPasswordReset = async (email) => {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) {
    throw new Error('Please enter your email address.');
  }

  if (isFirebaseConfigured && auth) {
    await sendPasswordResetEmail(auth, cleanEmail);
    return true;
  }

  // Local Prototype Mode simulation
  const users = getLocalUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    throw new Error('No account found with this email address.');
  }

  return true;
};

/**
 * Verify Mentor College Email (Simulation / Firestore Update)
 */
export const confirmMentorEmailVerification = async (userId) => {
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, 'users', userId), { emailVerified: true });
    return true;
  }

  // Local mode
  const users = getLocalUsers();
  const idx = users.findIndex(u => u.id === userId || u.uid === userId);
  if (idx !== -1) {
    users[idx].emailVerified = true;
    saveLocalUsers(users);
    return true;
  }
  return false;
};

/**
 * Pre-configured Demo Student (Aparna Tiwari) for "Try demo account"
 */
export const getDemoStudentAccount = () => {
  return {
    ...DEMO_STUDENT,
    id: 'demo-student-aparna',
    uid: 'demo-student-aparna',
    role: 'student',
    stream: STREAMS.PCM,
    isDemo: true,
    emailVerified: true,
    hasUsedFreeTrial: false,
    activePlan: 'Free Trial',
    createdAt: new Date().toISOString()
  };
};
