/**
 * Navigate backwards in the browser history N pages.
 *
 * @param delta - The number of pages to navigate backwards (default: 1)
 *
 * @example
 *
 * ```ts
 * import { pop } from "@mateothegreat/svelte5-router";
 * pop(); // Navigate back 1 page
 * pop(2); // Navigate back 2 pages
 * ```
 *
 * @category Helpers
 */
export declare const pop: (delta?: number) => void;
