import { type Component } from "svelte";
import type { Hook } from "./hooks";
import { RouteConfig } from "./route.svelte";
import type { Statuses } from "./statuses";
/**
 * Configuration interface for creating a new router instance.
 */
export interface RouterInstanceConfigOptions {
    id?: string;
    basePath?: string;
    routes: any[];
    hooks?: {
        pre?: Hook | Hook[];
        post?: Hook | Hook[];
    };
    initialPath?: string;
    notFoundComponent?: Component<any>;
    statuses?: Statuses;
    renavigation?: boolean;
}
/**
 * The configuration for a new router instance.
 *
 * @remarks
 * This class should rarely be used directly. Instead, use the `Router` component
 * to create a new router instance.
 *
 * @category Router
 */
export declare class RouterInstanceConfig {
    /**
     * The id for the router instance.
     *
     * @optional If no value is provided, the id will be a random string of characters.
     */
    id?: string;
    /**
     * The base path for the router instance.
     *
     * @optional If no value is provided, the base path will be "/".
     */
    basePath?: string;
    /**
     * The routes for the router instance.
     */
    routes: RouteConfig[];
    /**
     * Hooks to be run before and after the routes are rendered
     * at the router level (independent of the route hooks if applicable).
     *
     * @optional If no value is provided, no hooks will be run.
     */
    hooks?: {
        pre?: Hook | Hook[];
        post?: Hook | Hook[];
    };
    /**
     * The initial path for the router instance.
     *
     * @optional If no value is provided, the initial path will be the current path of the browser.
     */
    initialPath?: string;
    /**
     * The not found component for the router instance.
     *
     * @optional If no value is provided and no route could be found,
     * the router will will not render anything.
     */
    notFoundComponent?: Component<any>;
    /**
     * The default components rendered when a route is not found and
     * the status code is in one of the following:
     * 400, 401, 403, 404, 500
     * @optional If no value is provided, the default components will not be rendered.
     */
    statuses?: Statuses;
    /**
     * Whether to allow components to re-mount when navigating to routes.
     * When true, components will re-mount for both same routes and different routes using the same component.
     * This ensures fresh component state for each navigation.
     *
     * @default true - Components will re-mount when navigating to any route
     */
    renavigation?: boolean;
    /**
     * The constructor for this router instance.
     *
     * @param {RouterInstanceConfig} config The config for this router instance.
     */
    constructor(config: RouterInstanceConfigOptions);
    toJSON(): any;
}
