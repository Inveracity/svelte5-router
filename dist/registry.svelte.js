import { RouterInstanceConfig } from "./router-instance-config";
import { RouterInstance } from "./router-instance.svelte";
import { ReactiveMap } from "./utilities.svelte";
/**
 * Handles the dynamic registration and deregistration of router instances.
 *
 * @remarks
 * This is a singleton and should not be instantiated directly.
 *
 * @category Registry
 */
export class Registry {
    /**
     * Container for router instances.
     */
    instances = new ReactiveMap();
    constructor() {
        // Prevent multiple instantiation during HMR by storing instance in window
        if (window.__SVELTE_SPA_ROUTER_REGISTERED__) {
            return window.__SVELTE_SPA_ROUTER_REGISTERED__;
        }
        window.__SVELTE_SPA_ROUTER_REGISTERED__ = this;
        const { pushState, replaceState } = window.history;
        window.history.pushState = function (...args) {
            pushState.apply(window.history, args);
            window.dispatchEvent(new Event("pushState"));
        };
        window.history.replaceState = function (...args) {
            replaceState.apply(window.history, args);
            window.dispatchEvent(new Event("replaceState"));
        };
    }
    /**
     * Register a new router instance.
     *
     * @param {Instance} config The instance to register.
     * @param {ApplyFn} applyFn The function to call for applying route changes.
     *
     * @see {@link deregister}: The opposite of this method.
     */
    register(config, applyFn, span) {
        if (this.instances.has(config.id)) {
            throw new Error(`router instance with id ${config.id} already registered`);
        }
        const instance = new RouterInstance(config, applyFn);
        if (span) {
            span.trace({
                prefix: "🔍",
                name: "registry.register",
                description: "registering a new router instance",
                metadata: {
                    router: {
                        id: config.id,
                        basePath: config.basePath
                    },
                    location: "/src/lib/registry.svelte:register()",
                    config
                }
            });
        }
        this.instances.set(config.id, instance);
        return instance;
    }
    /**
     * Deregister a router instance.
     *
     * @param {string} id The id of the instance to deregister.
     */
    deregister(id, span) {
        const instance = this.instances.get(id);
        if (span) {
            span.trace({
                prefix: instance ? "✅" : "❌",
                name: "registry.deregister",
                description: "deregistering a router instance",
                metadata: {
                    router: {
                        id,
                        basePath: instance.config.basePath
                    },
                    location: "/src/lib/registry.svelte:deregister()",
                    config: instance.config
                }
            });
        }
        if (instance) {
            this.instances.delete(id);
        }
        else {
            throw new Error(`router instance with id ${id} not found`);
        }
    }
    get(id) {
        const instance = this.instances.get(id);
        return instance;
    }
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
export const registry = window.__SVELTE_SPA_ROUTER_REGISTRY__ || new Registry();
