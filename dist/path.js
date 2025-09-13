/**
 * @remarks
 * Future home of more path related functionality.
 */
import { Query } from "./query.svelte";
export class Path {
    protocol;
    host;
    path;
    query;
    constructor() {
        this.protocol = location.protocol;
        this.host = location.host;
        this.path = location.pathname;
        if (location.search.length > 0) {
            this.query = new Query(Object.fromEntries(new URLSearchParams(location.search)));
        }
    }
    toURL() {
        return `${this.protocol}://${this.host}${this.path}${this.query ? this.query.toString() : ""}`;
    }
    toURI() {
        return `${this.path}${this.query ? this.query.toString() : ""}`;
    }
}
export var paths;
(function (paths) {
    paths.base = (base, path) => {
        return path.match(new RegExp(`^${base}(/|$)`)) !== null;
    };
})(paths || (paths = {}));
