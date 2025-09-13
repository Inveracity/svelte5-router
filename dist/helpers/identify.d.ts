export type Identity = string | number | boolean | null | undefined | RegExp | Function | Object | Array<unknown> | Promise<unknown>;
export declare const Identities: {
    string: string;
    number: string;
    boolean: string;
    null: string;
    undefined: string;
    regexp: string;
    function: string;
    object: string;
    array: string;
    promise: string;
    unknown: string;
};
export declare const identify: (value: unknown) => (typeof Identities)[keyof typeof Identities];
