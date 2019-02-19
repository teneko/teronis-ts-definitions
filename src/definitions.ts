/** A function that accepts any arguments and returns `any`. */
export type RestArrayFn = (...args: any[]) => any;
/** A function that accepts one generic argument and returns a generic type. */
export type ParamTypeToReturnTypeFn<ParamType, ReturnType> = (arg: ParamType) => ReturnType;
/** A function that is fusioned by function head (parameter list) and function body (return type). */
export type FunctionResultUnion<Fn extends RestArrayFn, ReturnType> = Fn extends (this: infer Context, ...args: infer Params) => any ? (this: Context, ...args: Params) => ReturnType : never;

/** Get the parameter type of the function by index. */
export type FnParamAt<Fn, Index extends number> = Fn extends (...args: infer Params) => any ? Params[Index] : never;
/** Get the context type of the function. */
export type ContextType<Fn extends Function> = Fn extends (this: infer T) => any ? T : never;


/** A function that accepts no arguments and returns `Promise<any>`. */
export type EmptyParamsToPromiseFn = () => Promise<any>;

/** A function that accepts any arguments and returns any typed `Promise<any>` */
export type RestArrayToPromiseFn = (...args: any[]) => Promise<any>;
/** A function that accepts any arguments and returns a generic typed Promise. */
export type RestArrayToPromiseResolveTypeFn<ResolveType> = (...args: any[]) => Promise<ResolveType>;

/** A function that accepts one generic argument and returns `Promise<any>`. */
export type ParamToPromiseFn<T1> = (arg: T1) => Promise<any>;
/** A function that accepts one generic argument and returns a generic typed Promise. */
export type ParamToPromiseResolveTypeFn<T1, ResolveType> = (arg: T1) => Promise<ResolveType>;

/** Get the resolve type of the generic typed Promise or never. */
export type PromiseResolveType<ReturnType> = ReturnType extends Promise<infer T> ? T : never;
/** Get the resolve type of the generic typed Promise that gets returned by a function. */
export type PromiseResolveTypeFromFn<Fn extends RestArrayToPromiseFn> = PromiseResolveType<ReturnType<Fn>>;

/** Get the resolve type of the generic typed Promise or the generic type. */
export type PromiseResolveTypeOrType<Type> = Type extends Promise<infer ResolveType> ?
    ResolveType :
    Type;

/** A function that converts a non-Promise-returning function into a function that returns a Promise. */
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


/** Get any keys of the type `T`, that extends any. The purpose is to get the keys of union types as union. */
export type AnyKeys<T> = T extends any ? keyof T : never;
/** Returns `true` or `false`, whether `A` extends `B` or not. `A` and `B` are compared in brackets, that eliminates wrong results. */
export type Extends<A, B> = [A] extends [B] ? true : false;

/** Extract object, unless otherwise specified by `TObject`, of `A`. */
export type ExtractObject<A, TObject extends object = object> = Extract<A, TObject>;
/** Extract any array, unless otherwise specified by `TArray`, from `A`. */
export type ExtractArray<A, TArray extends any[]= any[]> = Extract<A, TArray>;

/** Exclude object, unless otherwise specified by `TObject`, from `A`. */
export type ExcludeObject<A, TObject extends object = object> = Exclude<A, TObject>;
/** Exclude any array, unless otherwise specified by `TArray`, from `A`. */
export type ExcludeArray<A, TArray extends object = object> = Exclude<A, TArray>;

/** Extract object of `A` except any array, unless otherwise specified by `TArray`. */
export type ExtractObjectExceptArray<A, TObject extends object = object, TArray extends any[]= any[]> = ExcludeArray<ExtractObject<A, TObject>, TArray>;

/** Exclude object, unless otherwise specified by `TOrray`, from `A` except any array, unless otherwise specified by `TArray`. */
export type ExcludeObjectExceptArray<A, TObject extends object = object, TArray extends any[]= any[]> = ExcludeObject<A, TObject> | ExtractArray<A, TArray>;


/** 
 * Use this if you need an inline variable.
 * @example never extends Inferable<[ComplexType], infer T> ? T : never
 */
export type Inferable<T, Inference extends T = T> = T;

/** Get a property of `T`, that throws an error if not contained in `T`. */
export function keyof<T>(name: Extract<keyof T, string>): string {
    return name;
}

/** 
 * Get a property of `T`, that throws an error if not contained in `T`.
 * @deprecated Consider to use keyof due to name change. 
 */
export const nameof = keyof;

/** A function that returns `value` that is now typed as `T`. */
export function as<T>(value: any): T {
    return value;
}