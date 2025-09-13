import { type Hash } from "../hash";
import { Query } from "../query.svelte";
/**
 * The returned param value types for paths.
 *
 * @remarks
 * Multiple types are supported to allow for flexibility in the
 * types of params such as when an evaluation uses regex with match grouping.
 *
 * Every param value is a string, array of string, or a record
 * of string keys and values.
 *
 * Params are extracted and converted to the appropriate type
 * later in the route lifecycle
 *
 * @category Router
 */
export type Param = string | number | boolean;
/**
 * The returned param value types.
 *
 * @remarks
 * Multiple types are supported to allow for flexibility in the
 * types of params such as when an evaluation uses regex with match grouping.
 *
 * Every param value is a string, array of string, or a record
 * of string keys and values.
 *
 * Params are extracted and converted to the appropriate type
 * later in the route lifecycle
 *
 * @category Router
 */
export type ReturnParam = RegExp | boolean | boolean[] | number | number[] | string | string[] | Record<string, string | number | boolean | string[] | number[] | boolean[]>;
export type URL = {
    protocol: string;
    host: string;
    port: string;
    path: string;
    query: Query;
    hash: Hash;
};
export declare namespace urls {
    /**
     * Parse a URL string into its components
     * @param url The URL to parse
     * @returns Object containing path, query params, and hash components
     */
    const parse: (url: string) => URL;
    const path: (path: string) => string;
}
