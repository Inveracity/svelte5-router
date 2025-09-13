export const Identities = {
    string: "string",
    number: "number",
    boolean: "boolean",
    null: "null",
    undefined: "undefined",
    regexp: "regexp",
    function: "function",
    object: "object",
    array: "array",
    promise: "promise",
    unknown: "unknown"
};
export const identify = (value) => {
    if (value === null) {
        return Identities.null;
    }
    if (value === undefined) {
        return Identities.undefined;
    }
    if (value instanceof RegExp) {
        return Identities.regexp;
    }
    if (typeof value === "string") {
        return Identities.string;
    }
    if (typeof value === "number") {
        return Identities.number;
    }
    if (typeof value === "boolean") {
        return Identities.boolean;
    }
    if (Array.isArray(value)) {
        return Identities.array;
    }
    if (typeof value === "function") {
        return Identities.function;
    }
    if (typeof value === "object") {
        return Identities.object;
    }
    return Identities.unknown;
};
