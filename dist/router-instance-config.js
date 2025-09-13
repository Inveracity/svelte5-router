import {} from "svelte";
import { RouteConfig } from "./route.svelte";
/**
 * The configuration for a new router instance.
 *
 * @remarks
 * This class should rarely be used directly. Instead, use the `Router` component
 * to create a new router instance.
 *
 * @category Router
 */
export class RouterInstanceConfig {
    /**
     * The id for the router instance.
     *
     * @optional If no value is provided, the id will be a random string of characters.
     */
    id;
    /**
     * The base path for the router instance.
     *
     * @optional If no value is provided, the base path will be "/".
     */
    basePath;
    /**
     * The routes for the router instance.
     */
    routes;
    /**
     * Hooks to be run before and after the routes are rendered
     * at the router level (independent of the route hooks if applicable).
     *
     * @optional If no value is provided, no hooks will be run.
     */
    hooks;
    /**
     * The initial path for the router instance.
     *
     * @optional If no value is provided, the initial path will be the current path of the browser.
     */
    initialPath;
    /**
     * The not found component for the router instance.
     *
     * @optional If no value is provided and no route could be found,
     * the router will will not render anything.
     */
    notFoundComponent;
    /**
     * The default components rendered when a route is not found and
     * the status code is in one of the following:
     * 400, 401, 403, 404, 500
     * @optional If no value is provided, the default components will not be rendered.
     */
    statuses;
    /**
     * Whether to allow components to re-mount when navigating to routes.
     * When true, components will re-mount for both same routes and different routes using the same component.
     * This ensures fresh component state for each navigation.
     *
     * @default true - Components will re-mount when navigating to any route
     */
    renavigation;
    /**
     * The constructor for this router instance.
     *
     * @param {RouterInstanceConfig} config The config for this router instance.
     */
    constructor(config) {
        this.id = config.id || Math.random().toString(36).substring(2, 15);
        this.basePath = config.basePath;
        this.hooks = config.hooks;
        this.initialPath = config.initialPath;
        this.notFoundComponent = config.notFoundComponent;
        this.statuses = config.statuses;
        this.renavigation = config.renavigation ?? true;
        this.routes = config.routes.map((route) => new RouteConfig({
            ...route,
            ...config
        }));
    }
    toJSON() {
        return {
            id: this.id,
            basePath: this.basePath,
            routes: this.routes,
            hooks: this.hooks
        };
    }
}
