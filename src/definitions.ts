export type RestArrayFn = (...args: any[]) => any;
export type ParamTypeToReturnTypeFn<ParamType, ReturnType> = (arg: ParamType) => ReturnType;
export type FunctionResultUnion<Fn extends RestArrayFn, ReturnType> = Fn extends (this: infer Context, ...args: infer Params) => any ? (this: Context, ...args: Params) => ReturnType : never;

export type FnParamAt<Fn, Index extends number> = Fn extends (...args: infer Params) => any ? Params[Index] : never;
export type ContextType<Fn extends Function> = Fn extends (this: infer T) => any ? T : never;


export type EmptyParamsToPromiseFn = () => Promise<any>;

export type RestArrayToPromiseFn = (...args: any[]) => Promise<any>;
export type RestArrayToPromiseResolveTypeFn<ResolveType> = (...args: any[]) => Promise<ResolveType>;

export type ParamToPromiseFn<T1> = (arg: T1) => Promise<any>;
export type ParamToPromiseResolveTypeFn<T1, ResolveType> = (arg: T1) => Promise<ResolveType>;

export type PromiseResolveType<ReturnType> = ReturnType extends Promise<infer T> ? T : never;
export type PromiseResolveTypeFromFn<Fn extends RestArrayToPromiseFn> = PromiseResolveType<ReturnType<Fn>>;

export type PromiseResolveTypeOrType<Type> = Type extends Promise<infer ResolveType> ?
    ResolveType :
    Type;

export type PromisifyFn<Fn extends RestArrayFn> = Fn extends (...args: any[]) => infer ReturnType ?
    (ReturnType extends Promise<infer PromiseResolveType> ?
        (...args: Parameters<Fn>) => Promise<PromiseResolveType> :
        (...args: Parameters<Fn>) => Promise<ReturnType>) :
    never;


// Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SomePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type SomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type EveryExclude<T, U> = { [K in keyof T]: Exclude<T[K], U> };
// Credits go to @jcalz from https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never


export const nameof = <T>(name: Extract<keyof T, string>): string => name;

export function hasTypeNumberProperty<T>(obj: any, property: keyof T): obj is T {
    return obj && typeof obj[property] === "number";
}