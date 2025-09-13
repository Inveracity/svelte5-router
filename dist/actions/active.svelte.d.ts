import type { RouteOptions } from "./options";
/**
 * Add the `active` class to the node if the current route matches the node's href.
 *
 * > Similar to {@link route}.
 *
 * Add `use:active` to an anchor element to manage active state.
 *
 * @param {HTMLAnchorElement} node The anchor element to handle.
 *
 * @category Actions
 * @source
 */
export declare const active: (node: HTMLAnchorElement, options?: Pick<RouteOptions, "active">) => {
    destroy(): void;
};
