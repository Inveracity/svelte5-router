/**
 * Logging facility.
 *
 * @category Helpers
 */
export declare namespace logging {
    /**
     * Acceptable log levels (applies to all logging methods).
     */
    enum LogLevel {
        FATAL = -1,
        ERROR = 1,
        INFO = 2,
        DEBUG = 3,
        TRACE = 4,
        DISABLED = 5
    }
    /**
     * A grouping of log messages.
     */
    type Group = {
        name: string;
        messages: any | any[];
    };
    /**
     * Acceptable log types typed out so that it's clearer what can be
     * passed to the logging functions like groups of logs to combine them
     * in the outputs.
     */
    type Log = Group | Group[] | any | any[];
    /**
     * Convenience method for logging an info message.
     */
    const info: (...msg: Log[]) => void;
    /**
     * Convenience method for logging a debug message.
     */
    const debug: (...msg: Log[]) => void;
    /**
     * Convenience method for logging an error message.
     */
    const error: (...msg: any[]) => void;
    /**
     * Convenience method for logging a trace message.
     */
    const trace: (...msg: any[]) => void;
    /**
     * Convenience method for logging a fatal error and finally throwing an error.
     *
     * @remarks
     * This is used to stop the application from running if an error is encountered
     * that is not recoverable.
     */
    const fatal: (...msg: any[]) => void;
    /**
     * Raw log method.
     */
    const log: (level: LogLevel, ...msg: Log[]) => void;
}
