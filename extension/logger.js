/**
 * Advanced logging system for debugging and monitoring
 * Performance Optimized
 */

const Logger = (() => {
  const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
    TRACE: 4
  };

  // Cache methods to avoid constant lookup
  const consoleMethods = {
    ERROR: console.error.bind(console),
    WARN: console.warn.bind(console),
    INFO: console.log.bind(console),
    DEBUG: console.log.bind(console),
    TRACE: console.log.bind(console)
  };

  let currentLevel = LOG_LEVELS.DEBUG;
  let logs = [];
  const MAX_LOGS = 1000;

  /**
   * Log a message at specified level
   * @param {string} level - Log level (ERROR, WARN, INFO, DEBUG, TRACE)
   * @param {string} message - Log message
   * @param {any} data - Additional data to log
   */
  function log(level, message, data) {
    if (LOG_LEVELS[level] > currentLevel) return;
    
    // Defer timestamp creation to only when actually logging
    const timestamp = new Date().toISOString();

    // Performance: Use a circular-like buffer approach or simple push/shift
    // depending on engine, but standard push/shift with MAX_LOGS is generally okay.
    logs.push({ timestamp, level, message, data });
    if (logs.length > MAX_LOGS) {
      logs.shift(); // Remove oldest
    }
    
    const method = consoleMethods[level];
    if (data !== undefined) {
      method(`[${timestamp}] [${level}] ${message}`, data);
    } else {
      method(`[${timestamp}] [${level}] ${message}`);
    }
  }

  return {
    error: (msg, data) => log('ERROR', msg, data),
    warn: (msg, data) => log('WARN', msg, data),
    info: (msg, data) => log('INFO', msg, data),
    debug: (msg, data) => log('DEBUG', msg, data),
    trace: (msg, data) => log('TRACE', msg, data),
    setLevel: (level) => { currentLevel = LOG_LEVELS[level] || LOG_LEVELS.DEBUG; },
    getLogs: () => [...logs], // Return a shallow copy
    clearLogs: () => { logs = []; }, // Direct reassignment is fast
    exportLogs: () => JSON.stringify(logs, null, 2)
  };
})();
