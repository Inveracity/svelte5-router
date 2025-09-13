import { Query, RouterInstanceConfig, Span, type ApplyFn, type Hook } from ".";
import { Route, RouteResult } from "./route.svelte";
/**
 * The default routes that are used when no routes match.
 *
 * @category Router
 */
export declare const defaultRoutes: string[];
/**
 * The handlers type that is used when registering a router instance.
 *
 * This is used to restore the original history methods when the last instance is destroyed
 * and to register & unregister the event listeners for the router instances to prevent memory leaks.
 *
 * @category Router
 */
export type RouterHandlers = {
    /**
     * The handler for the pushState event.
     */
    pushStateHandler: () => void;
    /**
     * The handler for the replaceState event.
     */
    replaceStateHandler: () => void;
    /**
     * The handler for the popState event.
     */
    popStateHandler: () => void;
    /**
     * The handler for the hashchange event.
     */
    hashChangeHandler: () => void;
};
/**
 * A class that represents a router instance.
 *
 * @remarks
 * This class should rarely be used directly. Instead, use the `Router` component
 * to create a new router instance.
 *
 * @category Router
 */
export declare class RouterInstance {
    /**
     * The id of the router instance.
     */
    id: string;
    /**
     * The routes for the router instance.
     */
    routes: Set<Route>;
    /**
     * The handlers for the router instance.
     */
    handlers: RouterHandlers;
    /**
     * The config for the router instance.
     */
    config: RouterInstanceConfig;
    /**
     * The apply function for the router instance.
     */
    applyFn: ApplyFn;
    /**
     * Whether the router instance is navigating.
     */
    navigating: boolean;
    /**
     * The current route for the router instance.
     */
    current: RouteResult;
    /**
     * The constructor for the RouterInstance class.
     *
     * @param {RouterInstanceConfig} config The config for the router instance.
     * @param {ApplyFn} applyFn The apply function for the router instance.
     */
    constructor(config: RouterInstanceConfig, applyFn: ApplyFn);
    /**
     * Process a state change event from the browser history API.
     *
     * This method is called when the browser history API is used to change the
     * current route via the `pushState`, `replaceState`, or `popState` methods.
     *
     * The method will evaluate the route for the given path and query, and apply
     * the route to the router instance to ultimately call the `applyFn` function
     * on the downstream router component to render the new route.
     *
     * @param {string} path The path to handle the state change for.
     * @param {Query} query The query to handle the state change for.
     * @param {Span} span @optional The span to attach traces to. If not provided,
     * a new span will be created.
     */
    handleStateChange(url: string, span?: Span): Promise<void>;
    evaluateHooks(route: RouteResult, hooks: Hook | Hook[]): Promise<boolean>;
    /**
     * Retrieve a route for a given path.
     *
     * @param {string} path The path to get the route for.
     *
     * @returns {RegistryMatch} The matched route for the given path.
     */
    get(path: string, query?: Query, span?: Span): Promise<RouteResult>;
    /**
     * Deregister a router instance by removing it from the registry and
     * restoring the original history methods.
     *
     * This is called when a router instance is removed from the DOM
     * triggered by the `onDestroy` lifecycle method of the router instance.
     */
    deregister(span?: Span): void;
    /**
     * Get routes as an array for serialization purposes.
     *
     * @returns {Route[]} The routes as an array.
     */
    get routesArray(): Route[];
    /**
     * Custom JSON serialization to handle Set objects properly.
     *
     * @returns {object} The serializable representation of the router instance.
     */
    toJSON(): any;
}
