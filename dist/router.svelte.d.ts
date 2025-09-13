import { type Component } from "svelte";
import { RouterInstanceConfig } from "./router-instance-config";
import type { RouterInstance } from "./router-instance.svelte";
type $$ComponentProps = {
    instance?: RouterInstance;
} & Partial<RouterInstanceConfig> & Record<string, any>;
declare const Router: Component<$$ComponentProps, {}, "instance">;
type Router = ReturnType<typeof Router>;
export default Router;
