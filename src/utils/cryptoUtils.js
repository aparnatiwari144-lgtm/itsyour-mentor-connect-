/**
 * Web Crypto API utilities for Local Prototype Mode
 * Provides client-side salted SHA-256 password and OTP hashing.
 * Plain-text passwords and plain-text OTPs are never stored on client side.
 */

// Generate a cryptographic random salt
export const generateSalt = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Hash string (password or OTP) with salt using SHA-256
export const hashPassword = async (password, salt = null) => {
  const actualSalt = salt || generateSalt();
  const encoder = new TextEncoder();
  const data = encoder.encode(actualSalt + ':' + password);
  
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return {
    hash: hashHex,
    salt: actualSalt
  };
};

// Verify string against stored hash and salt
export const verifyPassword = async (password, salt, storedHash) => {
  if (!password || !salt || !storedHash) return false;
  const { hash } = await hashPassword(password, salt);
  return hash === storedHash;
};

// Generate a secure 6-digit numeric OTP
export const generateSecureOtp = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  // Ensure exactly 6 digits between 100000 and 999999
  const otpNumber = 100000 + (array[0] % 900000);
  return otpNumber.toString();
};

// Hash OTP using salted SHA-256
export const hashOtp = async (otp, salt = null) => {
  return await hashPassword(otp, salt);
};

// Verify entered OTP against stored salt and hash
export const verifyOtp = async (enteredOtp, salt, storedHash) => {
  return await verifyPassword(enteredOtp.trim(), salt, storedHash);
};
