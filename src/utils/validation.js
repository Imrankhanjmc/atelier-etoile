/**
 * Form validation helpers
 */

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
};

export const isValidPhone = (phone) => {
  // Accepts standard 10-digit mobile number, optional +91 or leading 0
  const cleaned = String(phone).replace(/[\s\-()]/g, '');
  return /^(?:\+91|0)?[6-9]\d{9}$/.test(cleaned);
};

export const isValidIndianPincode = (pincode) => {
  // Indian pincodes are 6 digits, first digit between 1-9
  return /^[1-9][0-9]{5}$/.test(String(pincode).trim());
};
