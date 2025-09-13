import type { RouteOptions } from "./options";
/**
 * Svelte action to handle routing with optional active state.
 *
 * Similar to {@link active}
 *
 * Add `use:route` to an anchor element to handle routing and optionally manage active state.
 *
 * @param {HTMLAnchorElement} node The anchor element to handle.
 * @param {RouteOptions} options Options for the route action (optional).
 * @category Actions
 * @includeExample ../demo/src/app.svelte
 * @source
 */
export declare const route: (node: HTMLAnchorElement, options?: RouteOptions) => {
    destroy(): void;
};
