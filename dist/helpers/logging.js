import { runtime } from "./runtime";
/**
 * Logging facility.
 *
 * @category Helpers
 */
export var logging;
(function (logging) {
    /**
     * Acceptable log levels (applies to all logging methods).
     */
    let LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["FATAL"] = -1] = "FATAL";
        LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
        LogLevel[LogLevel["TRACE"] = 4] = "TRACE";
        LogLevel[LogLevel["DISABLED"] = 5] = "DISABLED";
    })(LogLevel = logging.LogLevel || (logging.LogLevel = {}));
    /**
     * Convenience method for logging an info message.
     */
    logging.info = (...msg) => {
        logging.log(LogLevel.INFO, ...msg);
    };
    /**
     * Convenience method for logging a debug message.
     */
    logging.debug = (...msg) => {
        logging.log(LogLevel.DEBUG, ...msg);
    };
    /**
     * Convenience method for logging an error message.
     */
    logging.error = (...msg) => {
        logging.log(LogLevel.ERROR, ...msg);
    };
    /**
     * Convenience method for logging a trace message.
     */
    logging.trace = (...msg) => {
        logging.log(LogLevel.TRACE, ...msg);
    };
    /**
     * Convenience method for logging a fatal error and finally throwing an error.
     *
     * @remarks
     * This is used to stop the application from running if an error is encountered
     * that is not recoverable.
     */
    logging.fatal = (...msg) => {
        logging.log(LogLevel.FATAL, ...msg);
        throw new Error("Fatal error");
    };
    /**
     * Raw log method.
     */
    logging.log = (level, ...msg) => {
        if (level <= runtime.current.logging.level && level !== LogLevel.DISABLED) {
            if (runtime.current.logging.console) {
                if (msg.some((m) => m?.toConsole)) {
                    msg.forEach((m) => m?.toConsole?.(runtime.current.logging.level));
                }
                else if (runtime.current.logging.console) {
                    console.log(...msg);
                }
            }
            if (runtime.current.logging.sink) {
                runtime.current.logging.sink(msg);
            }
        }
    };
})(logging || (logging = {}));
