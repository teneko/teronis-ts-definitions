export type RestArrayFunction = (...args: any[]) => any;
export type EmptyPromiseFunction = () => Promise<any>;
export type RestArrayPromiseFunction = (...args: any[]) => Promise<any>;
export type T1TResultPromiseFunction<T1, TResult> = (arg: T1) => Promise<TResult>;
export type RestArrayTResultPomiseFunction<TResult> = (...args: any[]) => Promise<TResult>;
export type GetPromiseFunctionGenericType<TFunction extends RestArrayPromiseFunction> = ReturnType<TFunction> extends Promise<infer T> ? T : never;

export const nameof = <T>(name: Extract<keyof T, string>): string => name;