import { paths } from "./path";
import { Query } from "./query.svelte";
import { evaluators } from "./helpers/evaluators";
import { Identities } from "./helpers/identify";
import { marshal } from "./helpers/marshal";
import { normalize } from "./helpers/normalize";
import { regexp } from "./helpers/regexp";
import { urls } from "./helpers/urls";
/**
 * A route result that includes the evaluation results of the route.
 *
 * This type is necessary for the internal workings of the router to ensure that
 * the evaluation results are included in the route result and to avoid requiring
 * it to be merged in the original route instance.
 *
 * @since 2.0.0
 * @category Router
 * @example
 * ```ts
 * const routeResult = new RouteResult({
 *   router: myRouter,
 *   route: myRoute,
 *   result: {
 *     path: {
 *       condition: "exact-match",
 *       original: "/users/123",
 *       params: { id: "123" }
 *     },
 *     querystring: {
 *       condition: "exact-match",
 *       original: { filter: "active" },
 *       params: { filter: "active" }
 *     },
 *     component: UserComponent,
 *     status: 200
 *   }
 * });
 * ```
 */
export class RouteResult {
    /**
     * The route that was evaluated to render this result.
     *
     * @since 2.0.0
     * @remarks This may be undefined if the route result was created without an associated route.
     * @see {@link Route}
     */
    route;
    /**
     * The comprehensive result of routing evaluation that rendered this route.
     *
     * This object contains all the information gathered during the route matching process,
     * including path evaluation, querystring parsing, component resolution, and status determination.
     *
     * @since 2.0.0
     * @remarks The result object is immutable once created and represents a snapshot of the routing state.
     *
     * @example
     * ```ts
     * // Accessing route evaluation results
     * console.log(routeResult.result.path.original); // "/users/123"
     * console.log(routeResult.result.path.params?.id); // "123"
     * console.log(routeResult.result.status); // 200
     * ```
     */
    result;
    /**
     * The constructor for the `RouteResult` class.
     *
     * @param result The result of the route evaluation.
     */
    constructor(result) {
        this.route = result.route;
        this.result = result.result;
    }
    /**
     * The string representation of the route including the querystring.
     */
    toString() {
        let querystring = "";
        if (this.result.querystring.original && typeof this.result.querystring.original === "object") {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(this.result.querystring.original)) {
                if (value !== undefined && value !== null) {
                    params.append(key, String(value));
                }
            }
            querystring = params.toString();
        }
        else if (this.result.querystring.original) {
            querystring = String(this.result.querystring.original);
        }
        return `${this.result.path.original}${querystring ? `?${querystring}` : ""}`;
    }
}
export class RouteConfig {
    name;
    basePath;
    path;
    querystring;
    component;
    props;
    hooks;
    children;
    status;
    constructor(config) {
        this.name = config.name;
        this.basePath = config.basePath;
        this.path = config.path;
        this.querystring = config.querystring;
        this.component = config.component;
        this.props = config.props;
        this.hooks = config.hooks;
        this.status = config.status;
    }
    toJSON() {
        return {
            name: this.name,
            basePath: this.basePath,
            path: this.path,
            props: this.props,
            component: this.component,
            querystring: this.querystring,
            hooks: this.hooks,
            children: this.children,
            status: this.status
        };
    }
}
/**
 * A route that can be navigated to.
 * @example
 * ```ts
 * const routes: Route[] = [
 *   {
 *     component: Home
 *   },
 *   {
 *      path: "(?<child>.*)",
 *      component: ParseRouteParams
 *   }
 * ]
 * ```
 *
 * @category Router
 */
export class Route {
    /**
     * The unique identifier of this route.
     * This is useful if you need to track routes outside of the router's scope.
     *
     * @optional If no value is provided, the route will not have a name.
     */
    name;
    /**
     * The base path of the route.
     *
     * This is useful if you want to be declarative about the base path of the route
     * and not depend on the router to determine the base path.
     */
    basePath;
    /**
     * The path of the route to match against the current path.
     *
     * @optional If not provided, the route will match any path
     * as it will be the default route.
     */
    path;
    /**
     * The query params of the route.
     *
     * @optional If no value is provided, there are no query params.
     */
    querystring;
    /**
     * The component to render when the route is active.
     *
     * @optional If no value is provided, the route will not render a component.
     * This is useful if you want to use pre or post hooks to render a component
     * or snippet conditionally.
     */
    component;
    /**
     * The props to pass to the component.
     *
     * @optional If a value is provided, the component will receive this value in $props().
     */
    props;
    /**
     * Hooks to be run before and after the routes are rendered
     * at the router level (independent of the route hooks if applicable).
     *
     * @optional If no value is provided, no hooks will be run.
     */
    hooks;
    /**
     * The children routes of the route.
     *
     * This is useful if you want to be declarative about the routes that are direct
     * children of this route and not depend on the router to determine the children
     * when there are multiple <Router/> instances.
     *
     *
     * @optional If no value is provided, there are no direct child routes. Routes may
     * be mapped to children routes by the router when there are multiple <Router/> instances
     * with overlapping `basePath` values.
     *
     * @example
     * ```ts
     * const routes: Route[] = [
     *   ...
     *   {
     *     path: "/users",
     *     children: [
     *       {
     *         path: "/:id",
     *         component: User
     *       }
     *     ]
     *   }
     *   ...
     * ]
     * ```
     */
    children;
    /**
     * The status of the route once it has been matched or otherwise processed.
     */
    status;
    /**
     * Traces are a list of objects that describe the route's path and query params
     * as it is processed by the router.
     */
    traces = $state([]);
    /**
     * The constructor for the `Route` class.
     *
     * @param {Route} config An instance of the `Route` class.
     */
    constructor(config) {
        this.name = config.name;
        this.basePath = config.basePath;
        this.path = typeof config.path === "string" ? normalize(config.path) : config.path;
        if (config.querystring) {
            this.querystring = new Query(config.querystring);
        }
        this.component = config.component;
        this.props = config.props;
        this.hooks = config.hooks;
        this.status = config.status;
        this.children = config.children?.map((child) => new Route(child));
    }
    /**
     * Parse the route against the given path.
     * @param path The path to parse against the route.
     */
    test(path) {
        const matcher = urls.path(path.toString());
        // Handle string paths being passed in at the route.path level:
        if (typeof this.path === "string") {
            // Detect if this path contains regex syntax:
            if (regexp.can(this.path)) {
                // Path is a regex, so we need to test it against the path passed in:
                const match = regexp.from(this.path).exec(matcher);
                if (match) {
                    return {
                        condition: "exact-match",
                        params: match.groups
                    };
                }
            }
            else {
                // Path is not a regex, so we then check if the path passed in is a direct match:
                if (this.path === matcher) {
                    return {
                        condition: "exact-match",
                        params: this.path
                    };
                }
                else if (paths.base(this.path, matcher)) {
                    return {
                        condition: "base-match",
                        params: {}
                    };
                }
            }
        }
        // Handle RegExp instances being passed in at the route.path level:
        else if (this.path instanceof RegExp) {
            const res = evaluators.any[Identities.regexp](this.path, matcher);
            if (res) {
                return {
                    condition: "exact-match",
                    params: res
                };
            }
        }
        // Handle numeric paths being passed in at the route.path level:
        else if (typeof this.path === "number" && this.path === marshal(matcher).value) {
            throw new Error("numbered route match not supported at the route.path level");
        }
        return {
            condition: "no-match",
            params: {}
        };
    }
    /**
     * The absolute path of the route by combining the router's base path and
     * the route's path.
     */
    absolute() {
        /**
         * If the router has a base path, we need to combine it with the route's path
         * otherwise it will have "undefined" as the base path and the path will be
         * incorrect:
         */
        if (this.basePath) {
            return `${this.basePath}${this.path}`;
        }
        return this.path.toString();
    }
}
