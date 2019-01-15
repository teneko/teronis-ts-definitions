export type RestArrayFunction = (...args: any[]) => any;
export type EmptyPromiseFunction = () => Promise<any>;
export type RestArrayPromiseFunction = (...args: any[]) => Promise<any>;
export type T1TResultPromiseFunction<T1, TResult> = (arg: T1) => Promise<TResult>;
export type RestArrayTResultPomiseFunction<TResult> = (...args: any[]) => Promise<TResult>;
export type PromiseFunctionGenericType<TFunction extends RestArrayPromiseFunction> = ReturnType<TFunction> extends Promise<infer T> ? T : never;
export type TResultFunction<F extends RestArrayFunction, TResult> = F extends (...args: infer TParams) => any ? (...args: TParams) => TResult : never;
export type FunctionParameterAt<F, TIndex extends number> = F extends (...args: infer TParams) => any ? TParams[TIndex] : never;

export const nameof = <T>(name: Extract<keyof T, string>): string => name;