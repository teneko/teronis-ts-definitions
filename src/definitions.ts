export type RestArrayFn = (...args: any[]) => any;
export type FunctionResultUnion<F extends RestArrayFn, Result> = F extends (this: infer Context, ...args: infer Params) => any ? (this: Context, ...args: Params) => Result : never;

export type FnParamAt<F, Index extends number> = F extends (...args: infer Params) => any ? Params[Index] : never;
export type ContextType<T extends Function> = T extends (this: infer T) => any ? T : never;


export type EmptyParamsToPromiseFn = () => Promise<any>;

export type RestArrayToPromiseFn = (...args: any[]) => Promise<any>;
export type RestArrayToPromiseResultFn<Result> = (...args: any[]) => Promise<Result>;

export type ParamToPromiseFn<T1> = (arg: T1) => Promise<any>;
export type ParamToPromiseResultFn<T1, Result> = (arg: T1) => Promise<Result>;

export type PromiseResultFromFn<F extends RestArrayToPromiseFn> = ReturnType<F> extends Promise<infer T> ? T : never;


export const nameof = <T>(name: Extract<keyof T, string>): string => name;