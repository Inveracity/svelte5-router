/**
 * Regular expression utilities.
 *
 * @module regexp
 * @category Helpers
 */
export declare namespace regexp {
    /**
     * Safely handle a capable value as a RegExp.
     *
     * If the value is a string, it will be converted to a RegExp.
     * If the value is already a RegExp, it will be returned as is.
     * Otherwise, an error will be thrown.
     *
     * @throws {Error} If the value is not a string or RegExp.
     */
    const from: (v: string | RegExp) => RegExp;
    /**
     * Check if a string contains regex syntax.
     *
     * @param v The string to check.
     * @returns True if the string contains regex syntax, false otherwise.
     */
    const can: (v: string) => boolean;
}
