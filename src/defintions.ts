export const nameof = <T>(name: Extract<keyof T, string>): string => name;

export type PromiseFunction = (...args: any[]) => Promise<any>;
export type PromiseFunction1<T> = (args: T) => Promise<any>;

export type GetFunctionResult<F extends Function> = F extends (...args: any[]) => infer A ? A : never;
export type GetPromiseFunctionGenericType<F extends Function> = GetFunctionResult<F> extends Promise<infer T> ? T : never;

export type GetFunctionArguments<F extends Function> = F extends (...args: infer A) => any ? A : never;