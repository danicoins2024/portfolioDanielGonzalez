/**
 * utils.js
 * Utility functions for DOM manipulation and route parsing.
 */

/**
 * Get a query parameter value by name from the current URL.
 * @param {string} param - The name of the parameter.
 * @returns {string|null} The value of the parameter or null.
 */
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Escapes HTML characters to prevent cross-site scripting (XSS).
 * @param {string} unsafe - The unsafe string.
 * @returns {string} The escaped string.
 */
export function sanitizeHTML(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
