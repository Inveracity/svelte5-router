/**
 * @remarks
 * Future home of more path related functionality.
 */
import { Query } from "./query.svelte";
/**
 * The types of values that can be used as a path.
 *
 * @category Router
 */
export type PathType = string | number | RegExp | Function | Promise<unknown>;
export declare class Path {
    protocol: string;
    host: string;
    path: string;
    query: Query;
    constructor();
    toURL(): string;
    toURI(): string;
}
export declare namespace paths {
    const base: (base: string, path: string) => boolean;
}
