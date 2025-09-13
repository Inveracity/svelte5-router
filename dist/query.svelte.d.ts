import { type Condition } from "./helpers/evaluators";
import type { ReturnParam } from "./helpers/urls";
/**
 * The types of values that can be used as a query.
 *
 * @category Router
 */
export type QueryType<T = unknown> = Record<string, string | number | RegExp | Function | Promise<T>>;
/**
 * The types of values that the {Query} test method can return.
 *
 * @category Router
 */
export type QueryEvaluationResult = {
    condition: Condition;
    matches?: Record<string, ReturnParam>;
};
/**
 * Query string operations.
 *
 * @category Helpers
 */
export declare class Query {
    params: Record<string, ReturnParam>;
    original?: string;
    constructor(query?: Record<string, string> | string | Query | Record<string, ReturnParam>);
    /**
     * Get a value from the query string parameters and optionally provide
     * a default value if the key is not found.
     *
     * @param key - The key to get the value from.
     * @param defaultValue - The default value to return if the key is not found.
     */
    get<T>(key: string, defaultValue?: T): T;
    /**
     * Set a value in the query string parameters.
     */
    set(key: string, value: string): void;
    /**
     * Delete a value from the query string parameters.
     */
    delete(key: string): void;
    /**
     * Clear the query string parameters.
     */
    clear(): void;
    goto(path: string): void;
    test(inbound: Query): QueryEvaluationResult;
    /**
     * Convert the query string parameters to a string.
     */
    toString(): string;
    /**
     * Convert the query string parameters to a JSON object given
     * we may have parameter values that are not json serializable
     * out of the box.
     */
    toJSON(preserveOriginal?: boolean): {
        [k: string]: string;
    };
}
