/**
 * Navigate to a new path by replacing the current browser history entry
 * instead of adding a new one (history.replaceState).
 *
 * @param path - The path to navigate to (excluding the base URL).
 * @param queryParams - Optional query parameters to append.
 *
 * @category Helpers
 */
export declare const replace: (path: string, queryParams?: Record<string, unknown>) => void;
