import type { ApplyFn } from "./route.svelte";
import { RouterInstanceConfig } from "./router-instance-config";
import { RouterInstance } from "./router-instance.svelte";
import { ReactiveMap } from "./utilities.svelte";
import type { Span } from "./helpers/tracing.svelte";
/**
 * Handles the dynamic registration and deregistration of router instances.
 *
 * @remarks
 * This is a singleton and should not be instantiated directly.
 *
 * @category Registry
 */
export declare class Registry {
    /**
     * Container for router instances.
     */
    instances: ReactiveMap<string, RouterInstance>;
    constructor();
    /**
     * Register a new router instance.
     *
     * @param {Instance} config The instance to register.
     * @param {ApplyFn} applyFn The function to call for applying route changes.
     *
     * @see {@link deregister}: The opposite of this method.
     */
    register(config: RouterInstanceConfig, applyFn: ApplyFn, span?: Span): RouterInstance;
    /**
     * Deregister a router instance.
     *
     * @param {string} id The id of the instance to deregister.
     */
    deregister(id: string, span?: Span): void;
    get(id: string): RouterInstance;
}
/**
 * Expose a reference to the registry of router instances.
 *
 * This is used to register & unregister router instances and to get
 * the route for a given path.
 *
 * This is a singleton and should not be instantiated directly and should
 * never be accessed outside of the scope of this package in most cases.
 *
 * @category Registry
 */
export declare const registry: any;
