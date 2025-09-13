import { type URL } from "../helpers/urls";
import { RouteOptions } from "./options";
/**
 * Applies the active class to the node if the href is the same as the current location.
 *
 * @param href - The href to check if it is the same as the current location.
 * @param options - The options to apply to the node.
 * @param node - The node to apply the active class to.
 *
 * @category Actions
 */
export declare const applyActiveClass: (href: URL, options: RouteOptions, node: HTMLAnchorElement) => void;
