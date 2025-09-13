import { ReactiveMap } from "../utilities.svelte";
import { logging } from "./logging";
/**
 * A span is a single trace in a trace collection.
 *
 * @category Helpers
 */
export declare class Span {
    prefix?: string;
    id?: string;
    date?: Date;
    name?: string;
    description?: string;
    metadata?: Record<string, any>;
    traces?: ReactiveMap<string, Trace>;
    constructor(span: Span, prefix?: string);
    trace?(trace: Trace, prefix?: string): Trace;
    get?(): MapIterator<Trace>;
}
/**
 * A trace is a collection of spans.
 *
 * @category Helpers
 */
export declare class Trace {
    prefix?: string;
    id?: string;
    index?: number;
    date?: Date;
    name?: string;
    description?: string;
    metadata?: Record<string, any>;
    span?: Span;
    constructor(trace: Trace, index?: number, span?: Span, prefix?: string);
    /**
     * Wrapper method for logging a trace to the browser console.
     *
     * @category Helpers
     */
    toConsole?(level?: logging.LogLevel): void;
}
/**
 * A reactive map of spans.
 *
 * @category Helpers
 */
export declare const spans: ReactiveMap<string, Span>;
/**
 * Helper method for creating a new span.
 *
 * @category Helpers
 */
export declare const createSpan: (name: string, metadata?: Record<string, any>) => Span;
