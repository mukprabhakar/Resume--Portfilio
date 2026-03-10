/**
 * Security utilities for sanitizing user input and external data
 * to prevent XSS (Cross-Site Scripting) attacks
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (html) => {
  if (!html || typeof html !== 'string') {
   return '';
  }
 return DOMPurify.sanitize(html);
};

/**
 * Sanitize text content (escape special characters)
 * @param {string} text - The text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') {
   return '';
  }
  
  // Create a temporary element to escape HTML
  const temp = document.createElement('div');
  temp.textContent = text;
 return temp.innerHTML;
};

/**
 * Sanitize URL to prevent injection attacks
 * @param {string} url - The URL to sanitize
 * @returns {string} - Sanitized URL or empty string if invalid
 */
export const sanitizeURL = (url) => {
  if (!url || typeof url !== 'string') {
   return '';
  }
  
  try {
    // Only allow http, https, and mailto protocols
   const parsedUrl = new URL(url);
    if (!['http:', 'https:', 'mailto:'].includes(parsedUrl.protocol)) {
     return '';
    }
   return url;
  } catch {
    // If URL parsing fails, return empty string
   return '';
  }
};

/**
 * Sanitize object with nested properties
 * @param {Object} obj - The object to sanitize
 * @param {Array<string>} fieldsToSanitize - Array of field names to sanitize
 * @returns {Object} - New sanitized object
 */
export const sanitizeObject = (obj, fieldsToSanitize) => {
  if (!obj || typeof obj !== 'object') {
   return obj;
  }
  
  const sanitized = { ...obj };
  
  for (const field of fieldsToSanitize) {
    if (typeof sanitized[field] === 'string') {
      sanitized[field] = sanitizeHTML(sanitized[field]);
    } else if (typeof sanitized[field] === 'object' && sanitized[field] !== null) {
      sanitized[field] = sanitizeObject(sanitized[field], Object.keys(sanitized[field]));
    }
  }
  
 return sanitized;
};
