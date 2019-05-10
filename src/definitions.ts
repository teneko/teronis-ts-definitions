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
export type OmitType<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
export type SomePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type SomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type EveryExclude<T, U> = { [K in keyof T]: Exclude<T[K], U> };
/** Extract T, but return unknown */
export type Length<Tuple extends any[]> = Tuple extends { length: infer L } ? L : 0;
/** credits: https://stackoverflow.com/a/49936686/11044059 */
export type DeepPartial<T> = (
    {
        [P in keyof T]?: (
            T[P] extends Array<infer U>
            ? Array<DeepPartial<U>>
            : (T[P] extends ReadonlyArray<infer U>
                ? ReadonlyArray<DeepPartial<U>>
                : DeepPartial<T[P]>)) }
);
export type DeepAs<T, Type> = (
    { [P in keyof T]?: (
        T[P] extends Array<infer U>
        ? Array<DeepAs<U, Type>>
        : (T[P] extends ReadonlyArray<infer U>
            ? ReadonlyArray<DeepAs<U, Type>>
            : (T[P] extends object
                ? DeepAs<T[P], Type>
                : Type))) }
);
/** Pick properties of an object as `DeepPartial`. */
export type PickDeepPartial<T, K extends keyof T> = { [P in K]: DeepPartial<T[P]>; };
/** If `Keys` is equals never, then `never` will be returned instead of `{}`. */
export type NoneEmptyPick<T, Keys extends keyof T> = [Keys] extends [never] ? never : Pick<T, Keys>;
/** Pick properties of an object and cast them to `Type`. */
export type PickAs<T, K extends keyof T, Type> = {
    [P in K]: Type;
};
export type PickAsDeepAs<T, K extends keyof T, Type> = {
    [P in K]: DeepAs<T[P], Type>;
};

export interface NoneNotTypeIntersectionOptions {
    Comparable_A: any;
    Comparable_B: any;
    UseKeyOf_AB: boolean;
    WrapInTuple: boolean;
    EndResult: any;
}

export interface DefaultNoneNotTypeIntersectionOptions extends Pick<NoneNotTypeIntersectionOptions, "WrapInTuple" | "UseKeyOf_AB"> {
    UseKeyOf_AB: boolean;
    WrapInTuple: false;
}

/** Prevents an intersection if A or B extends NotType. */
export type NoneTypeExtendsNotTypeIntersection<
    A,
    B,
    NotType,
    Options extends DeepPartial<NoneNotTypeIntersectionOptions> = DefaultNoneNotTypeIntersectionOptions,
    __Comparable_A = Options extends Pick<NoneNotTypeIntersectionOptions, "Comparable_A"> ? Options["Comparable_A"] : A,
    __Comparable_B = Options extends Pick<NoneNotTypeIntersectionOptions, "Comparable_B"> ? Options["Comparable_B"] : B,
    __UseKeyOf_AB = Options extends Pick<NoneNotTypeIntersectionOptions, "UseKeyOf_AB"> ? Options["UseKeyOf_AB"] : DefaultNoneNotTypeIntersectionOptions["UseKeyOf_AB"],
    __WrapUpInTuple = Options extends Pick<NoneNotTypeIntersectionOptions, "WrapInTuple"> ? Options["WrapInTuple"] : DefaultNoneNotTypeIntersectionOptions["WrapInTuple"],
    __A = true extends __UseKeyOf_AB ? (true extends __WrapUpInTuple ? [keyof __Comparable_A] : keyof __Comparable_A) : (true extends __WrapUpInTuple ? [__Comparable_A] : __Comparable_A),
    __B = true extends __UseKeyOf_AB ? (true extends __WrapUpInTuple ? [keyof __Comparable_B] : keyof __Comparable_B) : (true extends __WrapUpInTuple ? [__Comparable_B] : __Comparable_B),
    __NotType = true extends __WrapUpInTuple ? [NotType] : NotType,
    __EndResult = Options extends Pick<NoneNotTypeIntersectionOptions, "EndResult"> ? Options["EndResult"] : A & B,
    > = (
        __B extends __NotType
        ? A
        : (__A extends __NotType
            ? B
            : __EndResult)
    );
/** Prevents an intersection if NotType extends A or B. */
export type NoneNotTypeExtendsTypeIntersection<
    A,
    B,
    NotType,
    Options extends DeepPartial<NoneNotTypeIntersectionOptions> = DefaultNoneNotTypeIntersectionOptions,
    __Comparable_A = Options extends Pick<NoneNotTypeIntersectionOptions, "Comparable_A"> ? Options["Comparable_A"] : A,
    __Comparable_B = Options extends Pick<NoneNotTypeIntersectionOptions, "Comparable_B"> ? Options["Comparable_B"] : B,
    __UseKeyOf_AB = Options extends Pick<NoneNotTypeIntersectionOptions, "UseKeyOf_AB"> ? Options["UseKeyOf_AB"] : DefaultNoneNotTypeIntersectionOptions["UseKeyOf_AB"],
    __WrapUpInTuple = Options extends Pick<NoneNotTypeIntersectionOptions, "WrapInTuple"> ? Options["WrapInTuple"] : DefaultNoneNotTypeIntersectionOptions["WrapInTuple"],
    __A = true extends __UseKeyOf_AB ? (true extends __WrapUpInTuple ? [keyof __Comparable_A] : keyof __Comparable_A) : (true extends __WrapUpInTuple ? [__Comparable_A] : __Comparable_A),
    __B = true extends __UseKeyOf_AB ? (true extends __WrapUpInTuple ? [keyof __Comparable_B] : keyof __Comparable_B) : (true extends __WrapUpInTuple ? [__Comparable_B] : __Comparable_B),
    __NotType = true extends __WrapUpInTuple ? [NotType] : NotType,
    __EndResult = Options extends Pick<NoneNotTypeIntersectionOptions, "EndResult"> ? Options["EndResult"] : A & B,
    > = (
        __NotType extends __B
        ? A
        : (__NotType extends __A
            ? B
            : __EndResult)
    );
/** Prevents an intersection if A or B is equals NotType. */
export type NoneTypeEqualsNotTypeIntersection<
    A,
    B,
    NotType,
    Options extends DeepPartial<NoneNotTypeIntersectionOptions> = DefaultNoneNotTypeIntersectionOptions,
    __Comparable_A = Options extends Pick<NoneNotTypeIntersectionOptions, "Comparable_A"> ? Options["Comparable_A"] : A,
    __Comparable_B = Options extends Pick<NoneNotTypeIntersectionOptions, "Comparable_B"> ? Options["Comparable_B"] : B,
    __UseKeyOf_AB = Options extends Pick<NoneNotTypeIntersectionOptions, "UseKeyOf_AB"> ? Options["UseKeyOf_AB"] : DefaultNoneNotTypeIntersectionOptions["UseKeyOf_AB"],
    __WrapUpInTuple = Options extends Pick<NoneNotTypeIntersectionOptions, "WrapInTuple"> ? Options["WrapInTuple"] : DefaultNoneNotTypeIntersectionOptions["WrapInTuple"],
    __A = true extends __UseKeyOf_AB ? (true extends __WrapUpInTuple ? [keyof __Comparable_A] : keyof __Comparable_A) : (true extends __WrapUpInTuple ? [__Comparable_A] : __Comparable_A),
    __B = true extends __UseKeyOf_AB ? (true extends __WrapUpInTuple ? [keyof __Comparable_B] : keyof __Comparable_B) : (true extends __WrapUpInTuple ? [__Comparable_B] : __Comparable_B),
    __NotType = true extends __WrapUpInTuple ? [NotType] : NotType,
    __EndResult = Options extends Pick<NoneNotTypeIntersectionOptions, "EndResult"> ? Options["EndResult"] : A & B,
    > = (
        __B extends __NotType
        ? (__NotType extends __B
            ? A
            : (__A extends __NotType
                ? (__NotType extends __A
                    ? B
                    : __EndResult)
                : __EndResult))
        : (__A extends __NotType
            ? (__NotType extends __A
                ? B
                : (__B extends __NotType
                    ? (__NotType extends __B
                        ? A
                        : __EndResult)
                    : __EndResult))
            : __EndResult)
    );


// Credits go to @jcalz from https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never


/** Get any keys of the type `T`, that extends any. The purpose is to get the keys of union types as union. */
export type AnyKeys<T> = T extends any ? keyof T : never;
/**
 * Get the optional keys from an object.
 * Credits: https://stackoverflow.com/a/49683575
 */
export type OptionalKeys<Props> = { [K in keyof Props]-?: {} extends { [P in K]: Props[K] } ? K : never }[keyof Props];
/** Returns `true` or `false`, whether `A` extends `B` or not. `A` and `B` are compared in brackets, that eliminates wrong results. */
export type Extends<A, B> = [A] extends [B] ? true : false;

/** 
 * Use this if you need an inline variable.
 * @example never extends Inferable<[ComplexType], infer T> ? T : never
 */
export type Inferable<T, Inference extends T> = T;

/** Get a property of `T`, that throws an error if not contained in `T`. */
export function keyof<T>(name: Extract<keyof T, string>): string {
    return name;
}

/** A function that returns `value` that is now typed as `T`. */
export function as<T>(value: any): T {
    return value;
}