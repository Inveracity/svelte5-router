import type { ReturnParam } from "./urls";
/**
 * Path or querystring evaluation result.
 *
 * @category Router
 */
export type Condition = "exact-match" | "base-match" | "default-match" | "no-match" | "permitted-no-conditions" | "one-or-more-missing";
/**
 * The conditions that are considered successful.
 *
 * @category Router
 */
export declare const SuccessfulConditions: Condition[];
/**
 * The conditions that are considered failed.
 *
 * @category Router
 */
export declare const FailedConditions: Condition[];
/**
 * The evaluation results of the route.
 *
 * @category Router
 */
export type Evaluation = {
    condition: Condition;
    params?: ReturnParam;
};
/**
 * The evaluation results of the route.
 *
 * @category Router
 */
export type EvaluationResult = {
    path: Evaluation;
    querystring: Evaluation;
    original: ReturnParam;
};
export declare namespace evaluators {
    /**
     * Composite evaluator function that can handle different types of values.
     *
     * @param a - The first value to evaluate.
     * @param b - The second value to evaluate {a} against.
     * @returns A boolean, string[], or object.
     */
    const any: Record<string, (a: any, b: any) => boolean | boolean[] | number | number[] | string | string[] | {
        [key: string]: boolean | boolean[] | number | number[] | string | string[];
    }>;
    /**
     * Evaluator function that checks if a value is empty recursively.
     *
     * @category Router
     */
    const valid: Record<string, (a: any) => boolean>;
}
