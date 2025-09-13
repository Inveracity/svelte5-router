import { evaluators } from "./helpers/evaluators";
import { goto } from "./helpers/goto";
import { Identities } from "./helpers/identify";
import { marshal } from "./helpers/marshal";
/**
 * Query string operations.
 *
 * @category Helpers
 */
export class Query {
    params = {};
    original;
    constructor(query) {
        if (typeof query === "string") {
            this.original = query;
        }
        if (query) {
            const marshalled = marshal(query);
            if (marshalled.value) {
                this.params = marshalled.value;
            }
        }
    }
    /**
     * Get a value from the query string parameters and optionally provide
     * a default value if the key is not found.
     *
     * @param key - The key to get the value from.
     * @param defaultValue - The default value to return if the key is not found.
     */
    get(key, defaultValue) {
        return this.params[key] || defaultValue;
    }
    /**
     * Set a value in the query string parameters.
     */
    set(key, value) { }
    /**
     * Delete a value from the query string parameters.
     */
    delete(key) {
        delete this.params[key];
    }
    /**
     * Clear the query string parameters.
     */
    clear() {
        this.params = {};
    }
    goto(path) {
        goto(path, this.params);
    }
    test(inbound) {
        if (typeof inbound === "object") {
            const matches = {};
            for (const [key, test] of Object.entries(inbound.params)) {
                if (this.params[key]) {
                    const marshalled = marshal(this.params[key]);
                    if (test instanceof RegExp) {
                        const res = evaluators.any[Identities.regexp](test, this.params[key]);
                        if (res) {
                            matches[key] = res;
                        }
                        else {
                            return {
                                condition: "no-match"
                            };
                        }
                    }
                    else if (marshalled.identity === Identities.number) {
                        if (marshalled.value === this.params[key]) {
                            matches[key] = marshalled.value;
                        }
                    }
                    else if (marshalled.identity === Identities.string) {
                        matches[key] = marshalled.value === this.params[key];
                    }
                    else if (marshalled.identity === Identities.boolean) {
                        matches[key] = marshalled.value === Boolean(this.params[key]);
                    }
                    else if (marshalled.identity === Identities.array) {
                        matches[key] = marshalled.value.includes(this.params[key]);
                    }
                }
                else {
                    return {
                        condition: "no-match"
                    };
                }
            }
            if (Object.keys(matches).length === Object.keys(inbound).length && evaluators.valid[Identities.object](matches)) {
                return {
                    condition: "exact-match",
                    matches: marshal(matches).value
                };
            }
            return {
                condition: Object.keys(matches).length > 1 && Object.keys(inbound).length !== Object.keys(matches).length
                    ? "exact-match"
                    : "no-match",
                matches: matches
            };
        }
    }
    /**
     * Convert the query string parameters to a string.
     */
    toString() {
        const stringifyValue = (value) => {
            if (Array.isArray(value)) {
                return value.map((v) => stringifyValue(v)).join(",");
            }
            if (typeof value === "object" && value !== null) {
                return Object.entries(value)
                    .map(([k, v]) => `${k}:${stringifyValue(v)}`)
                    .join(",");
            }
            // console.log("stringifyValue", value, typeof value);
            return encodeURIComponent(value);
        };
        return Object.entries(this.params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${stringifyValue(value)}`)
            .join("&");
        // return preserveOriginal ? this._original : "";
    }
    /**
     * Convert the query string parameters to a JSON object given
     * we may have parameter values that are not json serializable
     * out of the box.
     */
    toJSON(preserveOriginal) {
        return Object.fromEntries(Object.entries(this.params).map(([key, value]) => [key, value.toString()]));
    }
}
