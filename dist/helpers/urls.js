import { hash } from "../hash";
import { Query } from "../query.svelte";
import { normalize } from "./normalize";
export var urls;
(function (urls) {
    /**
     * Parse a URL string into its components
     * @param url The URL to parse
     * @returns Object containing path, query params, and hash components
     */
    urls.parse = (url) => {
        if (url === undefined || url.length === 0) {
            throw new Error(`invalid URL: ${url}`);
        }
        const isFileUrl = url.startsWith("file:///");
        const isAbsoluteUrl = url.includes("://") && !isFileUrl;
        if (isAbsoluteUrl) {
            const [protocol, remaining] = url.split("://");
            const hostPortMatch = remaining.match(/^([^/:]+)(?::(\d+))?(.*)$/);
            const [host, port, path] = hostPortMatch?.slice(1) ?? [];
            const [before, queryString = ""] = (path || "").split("?");
            const hashed = hash.parse(url);
            return {
                protocol,
                host,
                port,
                path: normalize(before) || "/",
                query: new Query(queryString),
                hash: hashed
            };
        }
        else if (isFileUrl) {
            const [protocol, remaining] = url.split("://");
            const posHash = remaining.indexOf("#");
            const posFirstQuestionmark = remaining.indexOf("?");
            let host = "";
            let path = "/";
            let query;
            if (posHash > posFirstQuestionmark && posFirstQuestionmark != -1) {
                host = remaining.slice(0, posFirstQuestionmark);
                path = normalize(remaining.slice(posFirstQuestionmark));
                query = new Query(path);
            }
            else {
                host = remaining.slice(0, posHash);
                path = normalize(remaining.slice(posHash));
                const [_, queryString] = (path || "").split("?");
                query = new Query(queryString);
            }
            const hashed = hash.parse(remaining);
            return {
                protocol,
                host,
                port: "",
                path,
                query,
                hash: hashed
            };
        }
        else {
            // Handle relative URLs
            const [pathPart, queryString = ""] = url.split("?");
            const hashed = hash.parse(url);
            return {
                protocol: window.location.protocol.replace(":", ""),
                host: window.location.hostname,
                port: window.location.port,
                path: normalize(pathPart) || "/",
                query: new Query(queryString),
                hash: hashed
            };
        }
    };
    urls.path = (path) => {
        return path.split("?")[0];
    };
})(urls || (urls = {}));
