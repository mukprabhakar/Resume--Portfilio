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

/**
 * Escape HTML entities to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text safe for DOM insertion
 */
export const escapeHTML = (text) => {
  if (!text || typeof text !== 'string') {
  return '';
  }
  
  const escapeMap = {
   '&': '&amp;',
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&#039;',
   '/': '&#x2F;',
   '`': '&#x60;',
   '=': '&#x3D;'
  };
  
  return text.replace(/[&<>"'`=/]/g, char => escapeMap[char]);
};

/**
 * Validate and sanitize error messages before display
 * Prevents exception text from being reinterpreted as HTML
 * @param {string|Error} error - Error message or Error object
 * @returns {string} - Safe error message for display
 */
export const sanitizeErrorMessage = (error) => {
  if (!error) {
  return '';
  }
  
  const errorMessage = typeof error === 'string' ? error : error.message || String(error);
  
  // Remove any potential HTML/script tags
  const cleanMessage = errorMessage.replace(/<[^>]*>/g, '');
  
  // Escape remaining special characters
  return escapeHTML(cleanMessage);
};

/**
 * Safely insert text content into DOM element
 * Prevents XSS by using textContent instead of innerHTML
 * @param {HTMLElement} element - Target DOM element
 * @param {string} text - Text content to insert
 */
export const safeSetTextContent = (element, text) => {
  if (!element || !text) {
  return;
  }
  
  // Use textContent which automatically escapes HTML
  element.textContent = text;
};

/**
 * Safely set HTML content with sanitization
 * Only use when you absolutely need HTML content
 * @param {HTMLElement} element - Target DOM element
 * @param {string} html - HTML content to insert (will be sanitized)
 */
export const safeSetInnerHTML = (element, html) => {
  if (!element || !html) {
  return;
  }
  
  // Always sanitize before setting innerHTML
  element.innerHTML = sanitizeHTML(html);
};
