/**
 * Browser notification handler for download events
 * Manages browser notifications for download completion and errors
 */

const NotificationManager = (() => {
  // Cache the browser API check
  const hasBrowserAPI = typeof browser !== 'undefined' && browser.notifications;
  const hasChromeAPI = typeof chrome !== 'undefined' && chrome.notifications;

  // Pick the available API for performance, avoiding repeated checks
  const notifyAPI = hasBrowserAPI ? browser.notifications : (hasChromeAPI ? chrome.notifications : null);

  /**
   * Show a browser notification
   * @param {string} title - Notification title
   * @param {Object} options - Notification options
   * @param {string} options.message - Notification message
   * @param {string} options.iconUrl - Icon URL
   */
  async function notify(title, options = {}) {
    if (!notifyAPI) return; // Fail fast if no API

    try {
      await notifyAPI.create({
        type: 'basic',
        title: title,
        message: options.message || '',
        iconUrl: options.iconUrl || 'icons/icon-128.png'
      });
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.warn) {
        Logger.warn('Notification failed:', error);
      } else {
        console.warn('Notification failed:', error);
      }
    }
  }

  /**
   * Notify user of download completion
   * @param {string} title - Book title
   * @param {boolean} success - Whether download was successful
   */
  function notifyDownloadComplete(title, success) {
    if (success) {
      notify('Download Complete ✅', {
        message: `"${title}" saved to Downloads folder.`
      });
    } else {
      notify('Download Failed ❌', {
        message: `Failed to download "${title}".`
      });
    }
  }

  return {
    notify,
    notifyDownloadComplete
  };
})();
