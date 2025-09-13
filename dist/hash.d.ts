import { Query } from "./query.svelte";
export type Hash = {
    path: string;
    query: Query;
    hash: string;
};
export declare namespace hash {
    /**
     * Parse a URL string into its components
     * @param url The URL to parse
     * @returns Object containing path, query params, and hash components
     */
    const parse: (url: string) => Hash;
}
