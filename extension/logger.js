/**
 * Advanced logging system for debugging and monitoring
 * Provides structured logging with different levels
 */

const Logger = (() => {
  const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
    TRACE: 4
  };

  let currentLevel = LOG_LEVELS.DEBUG;
  let logs = [];

  /**
   * Get current timestamp
   * @returns {string} ISO timestamp
   */
  function getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Log a message at specified level
   * @param {string} level - Log level (ERROR, WARN, INFO, DEBUG, TRACE)
   * @param {string} message - Log message
   * @param {any} data - Additional data to log
   */
  function log(level, message, data) {
    if (LOG_LEVELS[level] > currentLevel) return;
    
    const timestamp = getTimestamp();
    logs.push({ timestamp, level, message, data });
    if (logs.length > 1000) logs.shift();
    
    const method = level === 'ERROR' ? 'error' : level === 'WARN' ? 'warn' : 'log';
    console[method](`[${timestamp}] [${level}] ${message}`, data || '');
  }

  return {
    error: (msg, data) => log('ERROR', msg, data),
    warn: (msg, data) => log('WARN', msg, data),
    info: (msg, data) => log('INFO', msg, data),
    debug: (msg, data) => log('DEBUG', msg, data),
    trace: (msg, data) => log('TRACE', msg, data),
    setLevel: (level) => { currentLevel = LOG_LEVELS[level] || LOG_LEVELS.DEBUG; },
    getLogs: () => [...logs],
    clearLogs: () => { logs = []; },
    exportLogs: () => JSON.stringify(logs, null, 2)
  };
})();