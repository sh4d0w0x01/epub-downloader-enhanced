/**
 * Browser notification handler for download events
 * Manages browser notifications for download completion and errors
 */

const NotificationManager = (() => {
  /**
   * Show a browser notification
   * @param {string} title - Notification title
   * @param {Object} options - Notification options
   * @param {string} options.message - Notification message
   * @param {string} options.iconUrl - Icon URL
   */
  async function notify(title, options = {}) {
    try {
      await browser.notifications.create({
        type: 'basic',
        title: title,
        message: options.message || '',
        iconUrl: options.iconUrl || 'icons/icon-128.png'
      });
    } catch (error) {
      Logger?.warn?.('Notification failed:', error);
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