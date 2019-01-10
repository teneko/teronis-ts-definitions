export const nameof = <T>(name: Extract<keyof T, string>): string => name;

export type PromiseFunction = () => Promise<any>;
export type PromiseFunction1Return<ArgumentType, ReturnType> = (arg: ArgumentType) => Promise<ReturnType>;
export type PromiseFunctionRestArray = (...args: any[]) => Promise<any>;
export type PromiseFunctionRestArrayReturn<R> = (...args: any[]) => Promise<R>;

export type GetFunctionResult<F extends Function> = F extends (...args: any[]) => infer A ? A : never;
export type GetPromiseFunctionGenericType<F extends Function> = GetFunctionResult<F> extends Promise<infer T> ? T : never;

export type GetFunctionArguments<F extends Function> = F extends (...args: infer A) => any ? A : never;