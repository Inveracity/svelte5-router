import { logging } from "./logging";
/**
 * Runtime level configuration functionality.
 *
 * @category Helpers
 */
export declare namespace runtime {
    /**
     * Runtime configuration.
     */
    type Config = {
        tracing: {
            enabled: boolean;
            level?: logging.LogLevel;
            console?: boolean;
            sink?: (...msg: logging.Log[]) => void | Promise<void>;
        };
        logging: {
            level?: logging.LogLevel;
            console?: boolean;
            sink?: (...msg: logging.Log[]) => void | Promise<void>;
        };
    };
    /**
     * Retrieve the runtime configuration.
     *
     * This can be sourced from environment variables or passed in as an argument.
     */
    const config: (config?: Config) => Config;
    /**
     * The current runtime configuration.
     *
     * When first called, it will retrieve the runtime configuration from the environment variables.
     * After that, it can be mutated and will not be retrieved from the environment variables again.
     */
    let current: Config;
}
