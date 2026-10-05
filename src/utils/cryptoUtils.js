/**
 * Web Crypto API utilities for Local Prototype Mode
 * Provides client-side salted SHA-256 password hashing.
 * Plain-text passwords are never stored in localStorage.
 */

// Generate a cryptographic random salt
export const generateSalt = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Hash password with salt using SHA-256
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

// Verify password against stored hash and salt
export const verifyPassword = async (password, salt, storedHash) => {
  if (!password || !salt || !storedHash) return false;
  const { hash } = await hashPassword(password, salt);
  return hash === storedHash;
};
