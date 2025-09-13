/**
 * Options for the route action.
 *
 * @category Router
 */
export class RouteOptions {
    /**
     * When the route is inactive, these options are applied.
     */
    default;
    /**
     * When the route is active, these options are applied.
     */
    active;
    /**
     * The css class(es) to add when route is loading.
     */
    loading;
    /**
     * When the route is disabled, these options are applied.
     */
    disabled;
    constructor(options) {
        if (options) {
            Object.assign(this, options);
        }
    }
}
