/**
 * Navigate to a new path by using the browser's history API (pushState specifically).
 *
 * @param path - The path to navigate to (excluding the base URL).
 * @param queryParams - The query parameters to add to the URL.
 *
 * @category Helpers
 */
export const goto = (path, queryParams) => {
    const url = new URL(path, window.location.origin);
    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
    }
    window.history.pushState({}, "", url.toString());
};
