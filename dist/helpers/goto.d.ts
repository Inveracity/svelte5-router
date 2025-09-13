/**
 * Navigate to a new path by using the browser's history API (pushState specifically).
 *
 * @param path - The path to navigate to (excluding the base URL).
 * @param queryParams - The query parameters to add to the URL.
 *
 * @category Helpers
 */
export declare const goto: (path: string, queryParams?: Record<string, unknown>) => void;
