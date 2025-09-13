/**
 * Get a query parameter from the current URL.
 *
 * @param key - The key of the query parameter to get
 *
 * @returns The value of the query parameter, or null if it doesn't exist
 *
 * @category Helpers
 */
export const query = (key) => {
    return new URLSearchParams(window.location.search).get(key);
};
