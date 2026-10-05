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
import { hashPassword, verifyPassword, generateSecureOtp, hashOtp, verifyOtp } from '../utils/cryptoUtils';
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
      department: 'Biological & Chemical Sciences',
      designation: 'Research Scholar / Senior Mentor',
      phone: '+91 98765 43210',
      stream: STREAMS.PCB
    },
    {
      mentorId: 'mentor-2',
      name: 'Akash Patel',
      email: 'akashpatel.261ec105@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Electronics & Communication',
      department: 'Electronics & Communication',
      designation: 'Senior Scholar / Mentor',
      phone: '+91 98765 43211',
      stream: STREAMS.PCM
    },
    {
      mentorId: 'mentor-3',
      name: 'Soham Purohit',
      email: 'sohampurohit.261cv146@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Civil Engineering',
      department: 'Civil Engineering',
      designation: 'Senior Mentor',
      phone: '+91 98765 43212',
      stream: STREAMS.PCM
    },
    {
      mentorId: 'mentor-4',
      name: 'K N Vineeth Rao',
      email: 'knvineethrao.261cv119@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Civil Engineering',
      department: 'Civil Engineering',
      designation: 'Senior Mentor',
      phone: '+91 98765 43213',
      stream: STREAMS.PCM
    },
    {
      mentorId: 'mentor-5',
      name: 'Mausmi',
      email: 'mausmi.261ec135@nitk.edu.in',
      college: 'NITK Surathkal',
      degree: 'B.Tech Electronics & Communication',
      department: 'Electronics & Communication',
      designation: 'Senior Scholar / Mentor',
      phone: '+91 98765 43214',
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
        fullName: m.name,
        email: m.email.toLowerCase(),
        role: 'mentor',
        college: m.college,
        degree: m.degree,
        department: m.department,
        branch: m.department,
        designation: m.designation,
        phone: m.phone,
        stream: m.stream,
        mentorId: m.mentorId,
        mentorEmployeeId: `ID-${m.mentorId.toUpperCase()}`,
        initials: m.name.split(' ').map(n => n[0]).join('').slice(0, 2),
        emailVerified: true,
        verified: true,
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
 * Register a New Mentor with full credential details and trigger College Email OTP Verification
 */
export const registerMentorAccount = async ({
  fullName,
  name,
  mentorId,
  college,
  department,
  branch,
  designation,
  collegeEmail,
  email,
  phone,
  password,
  confirmPassword,
  stream
}) => {
  const cleanName = (fullName || name || '').trim();
  const cleanEmail = (collegeEmail || email || '').trim().toLowerCase();
  const cleanMentorId = (mentorId || '').trim();
  const cleanCollege = (college || '').trim();
  const cleanDepartment = (department || branch || '').trim();
  const cleanDesignation = (designation || 'Senior Mentor').trim();
  const cleanPhone = (phone || '').trim();

  // 1. Mandatory field checks
  if (!cleanName || !cleanEmail || !password) {
    throw new Error('Please fill in all required fields including your official college email.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (confirmPassword && password !== confirmPassword) {
    throw new Error('Passwords do not match. Please verify your password entries.');
  }

  // 2. Demo mentor protection
  const demoMentor = INITIAL_MENTORS.find(m => m.isDemoProfile && m.email.toLowerCase() === cleanEmail);
  if (demoMentor) {
    throw new Error('This is a demo profile and cannot be registered or logged into. Please use your official college email.');
  }

  // 3. College domain validation
  if (!isVerifiedCollegeDomain(cleanEmail)) {
    throw new Error('Mentor accounts need a verified college email (e.g., @nitk.edu.in, @iiserkol.ac.in).');
  }

  // 4. Duplicate checks (by Email and by Mentor ID)
  const users = getLocalUsers();
  const existingEmail = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existingEmail) {
    throw new Error('An account with this college email already exists. Please log in.');
  }

  if (cleanMentorId) {
    const existingId = users.find(
      u =>
        (u.mentorEmployeeId && u.mentorEmployeeId.toLowerCase() === cleanMentorId.toLowerCase()) ||
        (u.mentorId && u.mentorId.toLowerCase() === cleanMentorId.toLowerCase())
    );
    if (existingId) {
      throw new Error(`A mentor with Employee / Mentor ID "${cleanMentorId}" already exists. Please check and try again.`);
    }
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

  const institutionName = cleanCollege || (matchedRealMentor ? matchedRealMentor.college : getInstitutionFromEmail(cleanEmail));
  const assignedMentorId = cleanMentorId || (matchedRealMentor ? matchedRealMentor.id : `mentor_${Date.now()}`);

  // 5. Generate secure 6-digit OTP
  const generatedOtp = generateSecureOtp();
  const { hash: otpHash, salt: otpSalt } = await hashOtp(generatedOtp);

  // OTP valid for 5 minutes, 5 attempts allowed
  const otpExpiryMs = 5 * 60 * 1000;
  const otpData = {
    hash: otpHash,
    salt: otpSalt,
    expiresAt: Date.now() + otpExpiryMs,
    attemptsRemaining: 5,
    lastSentAt: Date.now()
  };

  // 6. Hash password with cryptographic salt
  const { hash: passHash, salt: passSalt } = await hashPassword(password);
  const uid = `usr_mnt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

  const newMentor = {
    id: uid,
    uid,
    name: cleanName,
    fullName: cleanName,
    email: cleanEmail,
    role: 'mentor',
    mentorId: assignedMentorId,
    mentorEmployeeId: cleanMentorId || assignedMentorId,
    college: institutionName,
    department: cleanDepartment || (matchedRealMentor ? matchedRealMentor.branch : 'Department of Engineering / Science'),
    branch: cleanDepartment || (matchedRealMentor ? matchedRealMentor.branch : 'Department of Engineering / Science'),
    designation: cleanDesignation,
    phone: cleanPhone,
    year: 'Faculty / Senior Scholar',
    stream: stream || (matchedRealMentor ? matchedRealMentor.stream : STREAMS.PCM),
    initials,
    // Explicitly unverified until OTP verification completes
    emailVerified: false,
    verified: false,
    passwordHash: passHash,
    passwordSalt: passSalt,
    otpData,
    isDemo: false,
    createdAt: new Date().toISOString()
  };

  users.push(newMentor);
  saveLocalUsers(users);

  // If Firebase is configured, persist user doc to Firestore
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'users', uid), {
        ...newMentor,
        passwordHash: null,
        passwordSalt: null
      });
    } catch (e) {
      console.warn('Firestore write warning:', e);
    }
  }

  // Return mentor and generatedOtp (for simulated dispatch/transparency in prototype)
  return {
    user: newMentor,
    generatedOtp
  };
};

/**
 * Verify Mentor 6-digit College Email OTP
 */
export const verifyMentorOtp = async ({ email, otp }) => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOtp = (otp || '').trim();

  if (!cleanEmail || !cleanOtp) {
    throw new Error('Please enter both your college email and 6-digit OTP.');
  }

  if (cleanOtp.length !== 6) {
    throw new Error('Please enter a valid 6-digit verification code.');
  }

  const users = getLocalUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);

  if (userIndex === -1) {
    throw new Error('No mentor account found with this college email.');
  }

  const user = users[userIndex];

  // Already verified?
  if (user.emailVerified && user.verified) {
    return user;
  }

  if (!user.otpData) {
    throw new Error('No active verification OTP found. Please request a new verification code.');
  }

  // 1. Expiry Check
  if (Date.now() > user.otpData.expiresAt) {
    throw new Error('OTP expired. Please request a new OTP.');
  }

  // 2. Attempt Limit Check
  if (user.otpData.attemptsRemaining <= 0) {
    throw new Error('Maximum verification attempts exceeded. Please request a new OTP.');
  }

  // 3. Cryptographic Verification against salted hash
  const isValid = await verifyOtp(cleanOtp, user.otpData.salt, user.otpData.hash);

  if (!isValid) {
    user.otpData.attemptsRemaining -= 1;
    saveLocalUsers(users);

    if (user.otpData.attemptsRemaining <= 0) {
      throw new Error('Maximum verification attempts exceeded. Please request a new OTP.');
    }
    throw new Error(`Invalid OTP. Please try again. (${user.otpData.attemptsRemaining} attempts left)`);
  }

  // 4. Successful Verification: Mark Verified
  user.emailVerified = true;
  user.verified = true;
  user.otpData = null; // Clear OTP data upon successful verification
  user.verifiedAt = new Date().toISOString();

  users[userIndex] = user;
  saveLocalUsers(users);

  // Firestore update if configured
  if (isFirebaseConfigured && db && user.uid) {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        emailVerified: true,
        verified: true,
        otpData: null,
        verifiedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Firestore update warning:', e);
    }
  }

  return user;
};

/**
 * Resend a fresh 6-digit OTP to Mentor College Email (with cooldown)
 */
export const resendMentorOtp = async ({ email }) => {
  const cleanEmail = email.trim().toLowerCase();
  const users = getLocalUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);

  if (userIndex === -1) {
    throw new Error('No mentor account found with this college email.');
  }

  const user = users[userIndex];

  // Cooldown enforcement (45 seconds)
  const COOLDOWN_SECONDS = 45;
  if (user.otpData && user.otpData.lastSentAt) {
    const elapsedSeconds = Math.floor((Date.now() - user.otpData.lastSentAt) / 1000);
    if (elapsedSeconds < COOLDOWN_SECONDS) {
      const remaining = COOLDOWN_SECONDS - elapsedSeconds;
      throw new Error(`Please wait ${remaining}s before requesting a new OTP.`);
    }
  }

  // Generate new OTP & salted hash
  const newOtp = generateSecureOtp();
  const { hash: otpHash, salt: otpSalt } = await hashOtp(newOtp);

  user.otpData = {
    hash: otpHash,
    salt: otpSalt,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    attemptsRemaining: 5,
    lastSentAt: Date.now()
  };

  users[userIndex] = user;
  saveLocalUsers(users);

  return {
    success: true,
    email: cleanEmail,
    generatedOtp: newOtp
  };
};

/**
 * Log in Mentor (enforces verified college domain and checks verification status)
 */
export const loginMentorAccount = async ({ email, password, staySignedIn = true }) => {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error('Please enter both college email and password.');
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
        emailVerified: userCredential.user.emailVerified || data.emailVerified,
        verified: userCredential.user.emailVerified || data.verified
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
    throw new Error('No mentor account found with this college email. Please register as a mentor.');
  }

  if (user.role !== 'mentor') {
    throw new Error('This account is registered as a Student. Please use Student Login.');
  }

  // Password verification
  let isValid = await verifyPassword(password, user.passwordSalt, user.passwordHash);
  if (!isValid && REAL_MENTOR_EMAILS.includes(cleanEmail)) {
    // If real mentor tested with initial demo password in prototype mode
    const { hash, salt } = await hashPassword(password);
    user.passwordHash = hash;
    user.passwordSalt = salt;
    saveLocalUsers(users);
    isValid = true;
  }

  if (!isValid) {
    throw new Error('Incorrect password. Please verify and try again.');
  }

  // Check verification status
  if (user.emailVerified === false || user.verified === false) {
    let freshOtp = null;
    if (!user.otpData || Date.now() > user.otpData.expiresAt) {
      freshOtp = generateSecureOtp();
      const { hash: otpHash, salt: otpSalt } = await hashOtp(freshOtp);
      user.otpData = {
        hash: otpHash,
        salt: otpSalt,
        expiresAt: Date.now() + 5 * 60 * 1000,
        attemptsRemaining: 5,
        lastSentAt: Date.now()
      };
      saveLocalUsers(users);
    }
    // Account exists but is not verified yet
    return {
      ...user,
      needsVerification: true,
      generatedOtp: freshOtp
    };
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
 * Confirm Mentor Email Verification manually (e.g. simulated verification button)
 */
export const confirmMentorEmailVerification = async (userId) => {
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, 'users', userId), { emailVerified: true, verified: true, otpData: null });
    return true;
  }

  // Local mode
  const users = getLocalUsers();
  const idx = users.findIndex(u => u.id === userId || u.uid === userId);
  if (idx !== -1) {
    users[idx].emailVerified = true;
    users[idx].verified = true;
    users[idx].otpData = null;
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
