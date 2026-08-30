/**
 * Utility functions for common operations (Performance Optimized)
 */

const Utils = (() => {
  // Pre-calculate natural logarithm of 1024 for formatBytes
  const LN1024 = Math.log(1024);
  const SIZES = ['Bytes', 'KB', 'MB', 'GB'];

  /**
   * Format bytes to human-readable format
   * @param {number} bytes - Number of bytes
   * @returns {string} Formatted size string
   */
  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / LN1024);
    // Use bitwise shift for power of 1024 to avoid Math.pow overhead
    // (Note: works safely up to 1024^3 (GB) within JS safe integer limits)
    const divisor = i === 0 ? 1 : (1 << (i * 10));
    return Math.round((bytes / divisor) * 100) / 100 + ' ' + SIZES[i];
  }

  /**
   * Format duration in seconds to human-readable format
   * @param {number} seconds - Duration in seconds
   * @returns {string} Formatted duration
   */
  function formatDuration(seconds) {
    if (seconds < 60) return (seconds | 0) + 's';
    if (seconds < 3600) return ((seconds / 60) | 0) + 'm';
    return ((seconds / 3600) | 0) + 'h';
  }

  /**
   * Sleep for specified milliseconds
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise} Resolves after delay
   */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid URL
   */
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  return {
    formatBytes,
    formatDuration,
    sleep,
    isValidUrl
  };
})();
