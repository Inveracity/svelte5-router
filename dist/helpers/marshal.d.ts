import { type Identity } from "./identify";
export type MarshallableType = string | number | boolean | RegExp | Function | Promise<unknown>;
export type Marshalled<T> = {
    identity: Identity;
    value: T;
};
/**
 * Marshal a value to a specific type.
 *
 * @param value - The value to marshal
 *
 * @returns The marshaled value
 */
export declare const marshal: <T>(value: unknown) => Marshalled<T>;
