/**
 * Wait for a predicate to become true with timeout handling.
 *
 * @param predicate Function that returns boolean to check for
 * @param timeout Time in milliseconds to wait before timing out
 * @throws Error if timeout is reached before predicate becomes true
 *
 * @category utilities
 */
export async function wait(predicate, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout after ${timeout}ms waiting for predicate: ${predicate}`));
        }, timeout);
        const check = async () => {
            if (predicate()) {
                clearTimeout(timer);
                resolve();
            }
            else {
                setTimeout(check, 50);
            }
        };
        check();
    });
}
/**
 * Check if a value is a promise.
 *
 * @param value - The value to check.
 *
 * @returns True if the value is a promise, false otherwise.
 *
 * @category utilities
 */
export function isPromise(value) {
    return !!value && (typeof value === "object" || typeof value === "function") && typeof value.then === "function";
}
/**
 * Execute a function and return a promise if the function is a promise.
 *
 * @param fn - The function to execute.
 *
 * @returns A promise if the function is a promise, otherwise the function result.
 *
 * @category utilities
 */
export const execute = async (fn) => {
    if (isPromise(fn)) {
        return await fn();
    }
    else {
        return fn();
    }
};
/**
 * A reactive map that can be observed for changes using `$state()`.
 *
 * @category utilities
 */
export class ReactiveMap extends Map {
    #state = $state(false);
    get size() {
        this.#state;
        return super.size;
    }
    #trig() {
        this.#state = !this.#state;
    }
    add(key, value) {
        if (this.has(key)) {
            throw new Error(`key ${key} already exists`);
        }
        return this.set(key, value);
    }
    get(key) {
        this.#state;
        return super.get(key);
    }
    set(key, value) {
        const result = super.set(key, value);
        this.#trig();
        return result;
    }
    delete(key) {
        const result = super.delete(key);
        if (result)
            this.#trig();
        return result;
    }
    clear() {
        const result = super.clear();
        this.#trig();
        return result;
    }
    keys() {
        this.#state;
        return super.keys();
    }
    values() {
        this.#state;
        return super.values();
    }
    entries() {
        this.#state;
        return super.entries();
    }
    forEach(fn) {
        this.#state;
        return super.forEach(fn);
    }
    [Symbol.iterator]() {
        this.#state;
        return super[Symbol.iterator]();
    }
}
