/**
 * Wait for a predicate to become true with timeout handling.
 *
 * @param predicate Function that returns boolean to check for
 * @param timeout Time in milliseconds to wait before timing out
 * @throws Error if timeout is reached before predicate becomes true
 *
 * @category utilities
 */
export declare function wait(predicate: () => boolean, timeout?: number): Promise<void>;
/**
 * Check if a value is a promise.
 *
 * @param value - The value to check.
 *
 * @returns True if the value is a promise, false otherwise.
 *
 * @category utilities
 */
export declare function isPromise(value: any): boolean;
/**
 * Execute a function and return a promise if the function is a promise.
 *
 * @param fn - The function to execute.
 *
 * @returns A promise if the function is a promise, otherwise the function result.
 *
 * @category utilities
 */
export declare const execute: <T>(fn: () => T | Promise<T>) => Promise<T>;
/**
 * A reactive map that can be observed for changes using `$state()`.
 *
 * @category utilities
 */
export declare class ReactiveMap<K, V> extends Map<K, V> {
    #private;
    get size(): number;
    add(key: K, value: V): this;
    get(key: K): V;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    clear(): void;
    keys(): MapIterator<K>;
    values(): MapIterator<V>;
    entries(): MapIterator<[K, V]>;
    forEach(fn: (value: V, key: K, map: Map<K, V>) => void): void;
    [Symbol.iterator](): MapIterator<[K, V]>;
}
