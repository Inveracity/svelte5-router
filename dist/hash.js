import { Query } from "./query.svelte";
export var hash;
(function (hash) {
    /**
     * Parse a URL string into its components
     * @param url The URL to parse
     * @returns Object containing path, query params, and hash components
     */
    hash.parse = (url) => {
        if (url) {
            const [_, afterHash = ""] = url.split("#");
            const [path, queryString = ""] = afterHash.split("?");
            return {
                path,
                query: new Query(queryString),
                hash: afterHash
            };
        }
    };
})(hash || (hash = {}));
