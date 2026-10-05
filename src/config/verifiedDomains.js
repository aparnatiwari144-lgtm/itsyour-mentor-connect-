/**
 * Verified College Domains Configuration
 * Mentors may only sign up or sign in using institutional college domains.
 */

export const VERIFIED_COLLEGE_DOMAINS = [
  // Primary Target Institutes
  'nitk.edu.in',
  'iiserkol.ac.in',
  'iitb.ac.in',
  'iitd.ac.in',
  'iitm.ac.in',
  'iitk.ac.in',
  'iitkgp.ac.in',
  'iitr.ac.in',
  'iitg.ac.in',
  'iith.ac.in',
  'nitw.ac.in',
  'nitt.edu',
  'vnit.ac.in',
  'mnit.ac.in',
  'nitc.ac.in',
  'iisc.ac.in',
  'tifr.res.in',
  // Premier Central Universities & Colleges
  'du.ac.in',
  'hindu.du.ac.in',
  'srcc.du.ac.in',
  'ststephens.edu',
  'lsr.du.ac.in',
  'sscbs.du.ac.in',
  'christuniversity.in',
  'christ.in',
  'nmcollege.in',
  'presiuniv.ac.in'
];

/**
 * 5 Real Verified Mentors whose existing profiles link to their email
 */
export const REAL_MENTOR_EMAILS = [
  'bkp26ms173@iiserkol.ac.in',
  'akashpatel.261ec105@nitk.edu.in',
  'sohampurohit.261cv146@nitk.edu.in',
  'knvineethrao.261cv119@nitk.edu.in',
  'mausmi.261ec135@nitk.edu.in'
];

/**
 * Validates whether an email belongs to a verified institutional domain
 * Checks exact domain match OR standard Indian academic domain patterns (.edu.in, .ac.in, .res.in)
 */
export const isVerifiedCollegeDomain = (email) => {
  if (!email || typeof email !== 'string') return false;
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];

  // Check explicit allow-list
  if (VERIFIED_COLLEGE_DOMAINS.includes(domain)) {
    return true;
  }

  // Check common subdomains (e.g. *.nitk.edu.in, *.du.ac.in)
  for (const allowed of VERIFIED_COLLEGE_DOMAINS) {
    if (domain.endsWith('.' + allowed)) {
      return true;
    }
  }

  // Generalized institutional domain pattern
  if (domain.endsWith('.edu.in') || domain.endsWith('.ac.in') || domain.endsWith('.res.in') || domain.endsWith('.edu')) {
    return true;
  }

  return false;
};

/**
 * Returns user-friendly institutional name from email domain
 */
export const getInstitutionFromEmail = (email) => {
  if (!email) return 'Verified College';
  const domain = email.split('@')[1]?.toLowerCase() || '';

  if (domain.includes('nitk')) return 'NITK Surathkal';
  if (domain.includes('iiserkol')) return 'IISER Kolkata';
  if (domain.includes('iitb')) return 'IIT Bombay';
  if (domain.includes('iitd')) return 'IIT Delhi';
  if (domain.includes('iitm')) return 'IIT Madras';
  if (domain.includes('iitk')) return 'IIT Kanpur';
  if (domain.includes('iitkgp')) return 'IIT Kharagpur';
  if (domain.includes('nitw')) return 'NIT Warangal';
  if (domain.includes('nitt')) return 'NIT Trichy';
  if (domain.includes('srcc')) return 'SRCC, Delhi';
  if (domain.includes('hindu')) return 'Hindu College, Delhi';
  if (domain.includes('ststephens')) return "St. Stephen's College, Delhi";
  if (domain.includes('lsr')) return 'LSR, Delhi';
  if (domain.includes('sscbs')) return 'SSCBS, Delhi';
  if (domain.includes('christ')) return 'Christ University';
  if (domain.includes('nmcollege')) return 'NM College, Mumbai';
  if (domain.includes('iisc')) return 'IISc Bengaluru';

  return 'Verified Premier Institute';
};
