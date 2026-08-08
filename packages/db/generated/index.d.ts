
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model PriceHistory
 * 
 */
export type PriceHistory = $Result.DefaultSelection<Prisma.$PriceHistoryPayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>
/**
 * Model RateConfig
 * 
 */
export type RateConfig = $Result.DefaultSelection<Prisma.$RateConfigPayload>
/**
 * Model GuildConfig
 * 
 */
export type GuildConfig = $Result.DefaultSelection<Prisma.$GuildConfigPayload>
/**
 * Model ChannelConfig
 * 
 */
export type ChannelConfig = $Result.DefaultSelection<Prisma.$ChannelConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Items
 * const items = await prisma.item.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Items
   * const items = await prisma.item.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs>;

  /**
   * `prisma.priceHistory`: Exposes CRUD operations for the **PriceHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceHistories
    * const priceHistories = await prisma.priceHistory.findMany()
    * ```
    */
  get priceHistory(): Prisma.PriceHistoryDelegate<ExtArgs>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs>;

  /**
   * `prisma.rateConfig`: Exposes CRUD operations for the **RateConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RateConfigs
    * const rateConfigs = await prisma.rateConfig.findMany()
    * ```
    */
  get rateConfig(): Prisma.RateConfigDelegate<ExtArgs>;

  /**
   * `prisma.guildConfig`: Exposes CRUD operations for the **GuildConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuildConfigs
    * const guildConfigs = await prisma.guildConfig.findMany()
    * ```
    */
  get guildConfig(): Prisma.GuildConfigDelegate<ExtArgs>;

  /**
   * `prisma.channelConfig`: Exposes CRUD operations for the **ChannelConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChannelConfigs
    * const channelConfigs = await prisma.channelConfig.findMany()
    * ```
    */
  get channelConfig(): Prisma.ChannelConfigDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Item: 'Item',
    PriceHistory: 'PriceHistory',
    SyncLog: 'SyncLog',
    RateConfig: 'RateConfig',
    GuildConfig: 'GuildConfig',
    ChannelConfig: 'ChannelConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "item" | "priceHistory" | "syncLog" | "rateConfig" | "guildConfig" | "channelConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      PriceHistory: {
        payload: Prisma.$PriceHistoryPayload<ExtArgs>
        fields: Prisma.PriceHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          findFirst: {
            args: Prisma.PriceHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          findMany: {
            args: Prisma.PriceHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>[]
          }
          create: {
            args: Prisma.PriceHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          createMany: {
            args: Prisma.PriceHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>[]
          }
          delete: {
            args: Prisma.PriceHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          update: {
            args: Prisma.PriceHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PriceHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PriceHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceHistoryPayload>
          }
          aggregate: {
            args: Prisma.PriceHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceHistory>
          }
          groupBy: {
            args: Prisma.PriceHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PriceHistoryCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
      RateConfig: {
        payload: Prisma.$RateConfigPayload<ExtArgs>
        fields: Prisma.RateConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RateConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RateConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>
          }
          findFirst: {
            args: Prisma.RateConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RateConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>
          }
          findMany: {
            args: Prisma.RateConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>[]
          }
          create: {
            args: Prisma.RateConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>
          }
          createMany: {
            args: Prisma.RateConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RateConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>[]
          }
          delete: {
            args: Prisma.RateConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>
          }
          update: {
            args: Prisma.RateConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>
          }
          deleteMany: {
            args: Prisma.RateConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RateConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RateConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateConfigPayload>
          }
          aggregate: {
            args: Prisma.RateConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRateConfig>
          }
          groupBy: {
            args: Prisma.RateConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<RateConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.RateConfigCountArgs<ExtArgs>
            result: $Utils.Optional<RateConfigCountAggregateOutputType> | number
          }
        }
      }
      GuildConfig: {
        payload: Prisma.$GuildConfigPayload<ExtArgs>
        fields: Prisma.GuildConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          findFirst: {
            args: Prisma.GuildConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          findMany: {
            args: Prisma.GuildConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>[]
          }
          create: {
            args: Prisma.GuildConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          createMany: {
            args: Prisma.GuildConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuildConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>[]
          }
          delete: {
            args: Prisma.GuildConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          update: {
            args: Prisma.GuildConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          deleteMany: {
            args: Prisma.GuildConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GuildConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          aggregate: {
            args: Prisma.GuildConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuildConfig>
          }
          groupBy: {
            args: Prisma.GuildConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuildConfigCountArgs<ExtArgs>
            result: $Utils.Optional<GuildConfigCountAggregateOutputType> | number
          }
        }
      }
      ChannelConfig: {
        payload: Prisma.$ChannelConfigPayload<ExtArgs>
        fields: Prisma.ChannelConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChannelConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChannelConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>
          }
          findFirst: {
            args: Prisma.ChannelConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChannelConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>
          }
          findMany: {
            args: Prisma.ChannelConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>[]
          }
          create: {
            args: Prisma.ChannelConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>
          }
          createMany: {
            args: Prisma.ChannelConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChannelConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>[]
          }
          delete: {
            args: Prisma.ChannelConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>
          }
          update: {
            args: Prisma.ChannelConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>
          }
          deleteMany: {
            args: Prisma.ChannelConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChannelConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChannelConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChannelConfigPayload>
          }
          aggregate: {
            args: Prisma.ChannelConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChannelConfig>
          }
          groupBy: {
            args: Prisma.ChannelConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChannelConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChannelConfigCountArgs<ExtArgs>
            result: $Utils.Optional<ChannelConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    history: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | ItemCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceHistoryWhereInput
  }


  /**
   * Count Type GuildConfigCountOutputType
   */

  export type GuildConfigCountOutputType = {
    channels: number
  }

  export type GuildConfigCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channels?: boolean | GuildConfigCountOutputTypeCountChannelsArgs
  }

  // Custom InputTypes
  /**
   * GuildConfigCountOutputType without action
   */
  export type GuildConfigCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfigCountOutputType
     */
    select?: GuildConfigCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuildConfigCountOutputType without action
   */
  export type GuildConfigCountOutputTypeCountChannelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelConfigWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    rarityPct: number | null
    officialTaxGems: number | null
    officialTaxGold: number | null
    apiValue: number | null
    apiDemand: number | null
    apiPrestige: number | null
    apiTaxGems: number | null
    apiTaxGold: number | null
  }

  export type ItemSumAggregateOutputType = {
    rarityPct: number | null
    officialTaxGems: number | null
    officialTaxGold: number | null
    apiValue: number | null
    apiDemand: number | null
    apiPrestige: number | null
    apiTaxGems: number | null
    apiTaxGold: number | null
  }

  export type ItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    slug: string | null
    category: string | null
    rarityLabel: string | null
    rarityPct: number | null
    status: string | null
    obtainedFrom: string | null
    emoji: string | null
    officialDemand: string | null
    officialRate: string | null
    officialTaxGems: number | null
    officialTaxGold: number | null
    sheet: string | null
    existingAmount: string | null
    apiValue: number | null
    apiDemand: number | null
    apiRateOfChange: string | null
    apiPrestige: number | null
    apiTaxGems: number | null
    apiTaxGold: number | null
    apiUpdatedAt: Date | null
    apiId: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    slug: string | null
    category: string | null
    rarityLabel: string | null
    rarityPct: number | null
    status: string | null
    obtainedFrom: string | null
    emoji: string | null
    officialDemand: string | null
    officialRate: string | null
    officialTaxGems: number | null
    officialTaxGold: number | null
    sheet: string | null
    existingAmount: string | null
    apiValue: number | null
    apiDemand: number | null
    apiRateOfChange: string | null
    apiPrestige: number | null
    apiTaxGems: number | null
    apiTaxGold: number | null
    apiUpdatedAt: Date | null
    apiId: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    name: number
    normalized: number
    slug: number
    category: number
    rarityLabel: number
    rarityPct: number
    status: number
    obtainedFrom: number
    emoji: number
    officialKeys: number
    officialScrolls: number
    officialVizards: number
    officialDemand: number
    officialRate: number
    officialTaxGems: number
    officialTaxGold: number
    sheet: number
    existingAmount: number
    apiValue: number
    apiDemand: number
    apiRateOfChange: number
    apiPrestige: number
    apiTaxGems: number
    apiTaxGold: number
    apiUpdatedAt: number
    apiId: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    rarityPct?: true
    officialTaxGems?: true
    officialTaxGold?: true
    apiValue?: true
    apiDemand?: true
    apiPrestige?: true
    apiTaxGems?: true
    apiTaxGold?: true
  }

  export type ItemSumAggregateInputType = {
    rarityPct?: true
    officialTaxGems?: true
    officialTaxGold?: true
    apiValue?: true
    apiDemand?: true
    apiPrestige?: true
    apiTaxGems?: true
    apiTaxGold?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityLabel?: true
    rarityPct?: true
    status?: true
    obtainedFrom?: true
    emoji?: true
    officialDemand?: true
    officialRate?: true
    officialTaxGems?: true
    officialTaxGold?: true
    sheet?: true
    existingAmount?: true
    apiValue?: true
    apiDemand?: true
    apiRateOfChange?: true
    apiPrestige?: true
    apiTaxGems?: true
    apiTaxGold?: true
    apiUpdatedAt?: true
    apiId?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityLabel?: true
    rarityPct?: true
    status?: true
    obtainedFrom?: true
    emoji?: true
    officialDemand?: true
    officialRate?: true
    officialTaxGems?: true
    officialTaxGold?: true
    sheet?: true
    existingAmount?: true
    apiValue?: true
    apiDemand?: true
    apiRateOfChange?: true
    apiPrestige?: true
    apiTaxGems?: true
    apiTaxGold?: true
    apiUpdatedAt?: true
    apiId?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityLabel?: true
    rarityPct?: true
    status?: true
    obtainedFrom?: true
    emoji?: true
    officialKeys?: true
    officialScrolls?: true
    officialVizards?: true
    officialDemand?: true
    officialRate?: true
    officialTaxGems?: true
    officialTaxGold?: true
    sheet?: true
    existingAmount?: true
    apiValue?: true
    apiDemand?: true
    apiRateOfChange?: true
    apiPrestige?: true
    apiTaxGems?: true
    apiTaxGold?: true
    apiUpdatedAt?: true
    apiId?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: string
    name: string
    normalized: string
    slug: string
    category: string | null
    rarityLabel: string | null
    rarityPct: number | null
    status: string | null
    obtainedFrom: string | null
    emoji: string | null
    officialKeys: JsonValue | null
    officialScrolls: JsonValue | null
    officialVizards: JsonValue | null
    officialDemand: string | null
    officialRate: string | null
    officialTaxGems: number | null
    officialTaxGold: number | null
    sheet: string | null
    existingAmount: string | null
    apiValue: number | null
    apiDemand: number | null
    apiRateOfChange: string | null
    apiPrestige: number | null
    apiTaxGems: number | null
    apiTaxGold: number | null
    apiUpdatedAt: Date | null
    apiId: string | null
    source: string
    createdAt: Date
    updatedAt: Date
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityLabel?: boolean
    rarityPct?: boolean
    status?: boolean
    obtainedFrom?: boolean
    emoji?: boolean
    officialKeys?: boolean
    officialScrolls?: boolean
    officialVizards?: boolean
    officialDemand?: boolean
    officialRate?: boolean
    officialTaxGems?: boolean
    officialTaxGold?: boolean
    sheet?: boolean
    existingAmount?: boolean
    apiValue?: boolean
    apiDemand?: boolean
    apiRateOfChange?: boolean
    apiPrestige?: boolean
    apiTaxGems?: boolean
    apiTaxGold?: boolean
    apiUpdatedAt?: boolean
    apiId?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    history?: boolean | Item$historyArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityLabel?: boolean
    rarityPct?: boolean
    status?: boolean
    obtainedFrom?: boolean
    emoji?: boolean
    officialKeys?: boolean
    officialScrolls?: boolean
    officialVizards?: boolean
    officialDemand?: boolean
    officialRate?: boolean
    officialTaxGems?: boolean
    officialTaxGold?: boolean
    sheet?: boolean
    existingAmount?: boolean
    apiValue?: boolean
    apiDemand?: boolean
    apiRateOfChange?: boolean
    apiPrestige?: boolean
    apiTaxGems?: boolean
    apiTaxGold?: boolean
    apiUpdatedAt?: boolean
    apiId?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["item"]>

  export type ItemSelectScalar = {
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityLabel?: boolean
    rarityPct?: boolean
    status?: boolean
    obtainedFrom?: boolean
    emoji?: boolean
    officialKeys?: boolean
    officialScrolls?: boolean
    officialVizards?: boolean
    officialDemand?: boolean
    officialRate?: boolean
    officialTaxGems?: boolean
    officialTaxGold?: boolean
    sheet?: boolean
    existingAmount?: boolean
    apiValue?: boolean
    apiDemand?: boolean
    apiRateOfChange?: boolean
    apiPrestige?: boolean
    apiTaxGems?: boolean
    apiTaxGold?: boolean
    apiUpdatedAt?: boolean
    apiId?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | Item$historyArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      history: Prisma.$PriceHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      normalized: string
      slug: string
      category: string | null
      rarityLabel: string | null
      rarityPct: number | null
      status: string | null
      obtainedFrom: string | null
      emoji: string | null
      officialKeys: Prisma.JsonValue | null
      officialScrolls: Prisma.JsonValue | null
      officialVizards: Prisma.JsonValue | null
      officialDemand: string | null
      officialRate: string | null
      officialTaxGems: number | null
      officialTaxGold: number | null
      sheet: string | null
      existingAmount: string | null
      apiValue: number | null
      apiDemand: number | null
      apiRateOfChange: string | null
      apiPrestige: number | null
      apiTaxGems: number | null
      apiTaxGold: number | null
      apiUpdatedAt: Date | null
      apiId: string | null
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    history<T extends Item$historyArgs<ExtArgs> = {}>(args?: Subset<T, Item$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */ 
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'String'>
    readonly name: FieldRef<"Item", 'String'>
    readonly normalized: FieldRef<"Item", 'String'>
    readonly slug: FieldRef<"Item", 'String'>
    readonly category: FieldRef<"Item", 'String'>
    readonly rarityLabel: FieldRef<"Item", 'String'>
    readonly rarityPct: FieldRef<"Item", 'Float'>
    readonly status: FieldRef<"Item", 'String'>
    readonly obtainedFrom: FieldRef<"Item", 'String'>
    readonly emoji: FieldRef<"Item", 'String'>
    readonly officialKeys: FieldRef<"Item", 'Json'>
    readonly officialScrolls: FieldRef<"Item", 'Json'>
    readonly officialVizards: FieldRef<"Item", 'Json'>
    readonly officialDemand: FieldRef<"Item", 'String'>
    readonly officialRate: FieldRef<"Item", 'String'>
    readonly officialTaxGems: FieldRef<"Item", 'Float'>
    readonly officialTaxGold: FieldRef<"Item", 'Float'>
    readonly sheet: FieldRef<"Item", 'String'>
    readonly existingAmount: FieldRef<"Item", 'String'>
    readonly apiValue: FieldRef<"Item", 'Float'>
    readonly apiDemand: FieldRef<"Item", 'Int'>
    readonly apiRateOfChange: FieldRef<"Item", 'String'>
    readonly apiPrestige: FieldRef<"Item", 'Int'>
    readonly apiTaxGems: FieldRef<"Item", 'Float'>
    readonly apiTaxGold: FieldRef<"Item", 'Float'>
    readonly apiUpdatedAt: FieldRef<"Item", 'DateTime'>
    readonly apiId: FieldRef<"Item", 'String'>
    readonly source: FieldRef<"Item", 'String'>
    readonly createdAt: FieldRef<"Item", 'DateTime'>
    readonly updatedAt: FieldRef<"Item", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item createManyAndReturn
   */
  export type ItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
  }

  /**
   * Item.history
   */
  export type Item$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    where?: PriceHistoryWhereInput
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    cursor?: PriceHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model PriceHistory
   */

  export type AggregatePriceHistory = {
    _count: PriceHistoryCountAggregateOutputType | null
    _avg: PriceHistoryAvgAggregateOutputType | null
    _sum: PriceHistorySumAggregateOutputType | null
    _min: PriceHistoryMinAggregateOutputType | null
    _max: PriceHistoryMaxAggregateOutputType | null
  }

  export type PriceHistoryAvgAggregateOutputType = {
    id: number | null
    apiValue: number | null
    officialVizards: number | null
    demand: number | null
  }

  export type PriceHistorySumAggregateOutputType = {
    id: number | null
    apiValue: number | null
    officialVizards: number | null
    demand: number | null
  }

  export type PriceHistoryMinAggregateOutputType = {
    id: number | null
    itemId: string | null
    apiValue: number | null
    officialVizards: number | null
    demand: number | null
    recordedAt: Date | null
  }

  export type PriceHistoryMaxAggregateOutputType = {
    id: number | null
    itemId: string | null
    apiValue: number | null
    officialVizards: number | null
    demand: number | null
    recordedAt: Date | null
  }

  export type PriceHistoryCountAggregateOutputType = {
    id: number
    itemId: number
    apiValue: number
    officialVizards: number
    demand: number
    recordedAt: number
    _all: number
  }


  export type PriceHistoryAvgAggregateInputType = {
    id?: true
    apiValue?: true
    officialVizards?: true
    demand?: true
  }

  export type PriceHistorySumAggregateInputType = {
    id?: true
    apiValue?: true
    officialVizards?: true
    demand?: true
  }

  export type PriceHistoryMinAggregateInputType = {
    id?: true
    itemId?: true
    apiValue?: true
    officialVizards?: true
    demand?: true
    recordedAt?: true
  }

  export type PriceHistoryMaxAggregateInputType = {
    id?: true
    itemId?: true
    apiValue?: true
    officialVizards?: true
    demand?: true
    recordedAt?: true
  }

  export type PriceHistoryCountAggregateInputType = {
    id?: true
    itemId?: true
    apiValue?: true
    officialVizards?: true
    demand?: true
    recordedAt?: true
    _all?: true
  }

  export type PriceHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceHistory to aggregate.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceHistories
    **/
    _count?: true | PriceHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceHistoryMaxAggregateInputType
  }

  export type GetPriceHistoryAggregateType<T extends PriceHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceHistory[P]>
      : GetScalarType<T[P], AggregatePriceHistory[P]>
  }




  export type PriceHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceHistoryWhereInput
    orderBy?: PriceHistoryOrderByWithAggregationInput | PriceHistoryOrderByWithAggregationInput[]
    by: PriceHistoryScalarFieldEnum[] | PriceHistoryScalarFieldEnum
    having?: PriceHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceHistoryCountAggregateInputType | true
    _avg?: PriceHistoryAvgAggregateInputType
    _sum?: PriceHistorySumAggregateInputType
    _min?: PriceHistoryMinAggregateInputType
    _max?: PriceHistoryMaxAggregateInputType
  }

  export type PriceHistoryGroupByOutputType = {
    id: number
    itemId: string
    apiValue: number | null
    officialVizards: number | null
    demand: number | null
    recordedAt: Date
    _count: PriceHistoryCountAggregateOutputType | null
    _avg: PriceHistoryAvgAggregateOutputType | null
    _sum: PriceHistorySumAggregateOutputType | null
    _min: PriceHistoryMinAggregateOutputType | null
    _max: PriceHistoryMaxAggregateOutputType | null
  }

  type GetPriceHistoryGroupByPayload<T extends PriceHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PriceHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PriceHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    apiValue?: boolean
    officialVizards?: boolean
    demand?: boolean
    recordedAt?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceHistory"]>

  export type PriceHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    apiValue?: boolean
    officialVizards?: boolean
    demand?: boolean
    recordedAt?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceHistory"]>

  export type PriceHistorySelectScalar = {
    id?: boolean
    itemId?: boolean
    apiValue?: boolean
    officialVizards?: boolean
    demand?: boolean
    recordedAt?: boolean
  }

  export type PriceHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type PriceHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $PriceHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceHistory"
    objects: {
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      itemId: string
      apiValue: number | null
      officialVizards: number | null
      demand: number | null
      recordedAt: Date
    }, ExtArgs["result"]["priceHistory"]>
    composites: {}
  }

  type PriceHistoryGetPayload<S extends boolean | null | undefined | PriceHistoryDefaultArgs> = $Result.GetResult<Prisma.$PriceHistoryPayload, S>

  type PriceHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PriceHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PriceHistoryCountAggregateInputType | true
    }

  export interface PriceHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceHistory'], meta: { name: 'PriceHistory' } }
    /**
     * Find zero or one PriceHistory that matches the filter.
     * @param {PriceHistoryFindUniqueArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceHistoryFindUniqueArgs>(args: SelectSubset<T, PriceHistoryFindUniqueArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PriceHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PriceHistoryFindUniqueOrThrowArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PriceHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryFindFirstArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceHistoryFindFirstArgs>(args?: SelectSubset<T, PriceHistoryFindFirstArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PriceHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryFindFirstOrThrowArgs} args - Arguments to find a PriceHistory
     * @example
     * // Get one PriceHistory
     * const priceHistory = await prisma.priceHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PriceHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceHistories
     * const priceHistories = await prisma.priceHistory.findMany()
     * 
     * // Get first 10 PriceHistories
     * const priceHistories = await prisma.priceHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceHistoryWithIdOnly = await prisma.priceHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceHistoryFindManyArgs>(args?: SelectSubset<T, PriceHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PriceHistory.
     * @param {PriceHistoryCreateArgs} args - Arguments to create a PriceHistory.
     * @example
     * // Create one PriceHistory
     * const PriceHistory = await prisma.priceHistory.create({
     *   data: {
     *     // ... data to create a PriceHistory
     *   }
     * })
     * 
     */
    create<T extends PriceHistoryCreateArgs>(args: SelectSubset<T, PriceHistoryCreateArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PriceHistories.
     * @param {PriceHistoryCreateManyArgs} args - Arguments to create many PriceHistories.
     * @example
     * // Create many PriceHistories
     * const priceHistory = await prisma.priceHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceHistoryCreateManyArgs>(args?: SelectSubset<T, PriceHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PriceHistories and returns the data saved in the database.
     * @param {PriceHistoryCreateManyAndReturnArgs} args - Arguments to create many PriceHistories.
     * @example
     * // Create many PriceHistories
     * const priceHistory = await prisma.priceHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PriceHistories and only return the `id`
     * const priceHistoryWithIdOnly = await prisma.priceHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PriceHistory.
     * @param {PriceHistoryDeleteArgs} args - Arguments to delete one PriceHistory.
     * @example
     * // Delete one PriceHistory
     * const PriceHistory = await prisma.priceHistory.delete({
     *   where: {
     *     // ... filter to delete one PriceHistory
     *   }
     * })
     * 
     */
    delete<T extends PriceHistoryDeleteArgs>(args: SelectSubset<T, PriceHistoryDeleteArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PriceHistory.
     * @param {PriceHistoryUpdateArgs} args - Arguments to update one PriceHistory.
     * @example
     * // Update one PriceHistory
     * const priceHistory = await prisma.priceHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceHistoryUpdateArgs>(args: SelectSubset<T, PriceHistoryUpdateArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PriceHistories.
     * @param {PriceHistoryDeleteManyArgs} args - Arguments to filter PriceHistories to delete.
     * @example
     * // Delete a few PriceHistories
     * const { count } = await prisma.priceHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceHistoryDeleteManyArgs>(args?: SelectSubset<T, PriceHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceHistories
     * const priceHistory = await prisma.priceHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceHistoryUpdateManyArgs>(args: SelectSubset<T, PriceHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PriceHistory.
     * @param {PriceHistoryUpsertArgs} args - Arguments to update or create a PriceHistory.
     * @example
     * // Update or create a PriceHistory
     * const priceHistory = await prisma.priceHistory.upsert({
     *   create: {
     *     // ... data to create a PriceHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceHistory we want to update
     *   }
     * })
     */
    upsert<T extends PriceHistoryUpsertArgs>(args: SelectSubset<T, PriceHistoryUpsertArgs<ExtArgs>>): Prisma__PriceHistoryClient<$Result.GetResult<Prisma.$PriceHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryCountArgs} args - Arguments to filter PriceHistories to count.
     * @example
     * // Count the number of PriceHistories
     * const count = await prisma.priceHistory.count({
     *   where: {
     *     // ... the filter for the PriceHistories we want to count
     *   }
     * })
    **/
    count<T extends PriceHistoryCountArgs>(
      args?: Subset<T, PriceHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceHistoryAggregateArgs>(args: Subset<T, PriceHistoryAggregateArgs>): Prisma.PrismaPromise<GetPriceHistoryAggregateType<T>>

    /**
     * Group by PriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PriceHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceHistory model
   */
  readonly fields: PriceHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceHistory model
   */ 
  interface PriceHistoryFieldRefs {
    readonly id: FieldRef<"PriceHistory", 'Int'>
    readonly itemId: FieldRef<"PriceHistory", 'String'>
    readonly apiValue: FieldRef<"PriceHistory", 'Float'>
    readonly officialVizards: FieldRef<"PriceHistory", 'Float'>
    readonly demand: FieldRef<"PriceHistory", 'Int'>
    readonly recordedAt: FieldRef<"PriceHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceHistory findUnique
   */
  export type PriceHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory findUniqueOrThrow
   */
  export type PriceHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory findFirst
   */
  export type PriceHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceHistories.
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceHistories.
     */
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * PriceHistory findFirstOrThrow
   */
  export type PriceHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistory to fetch.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceHistories.
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceHistories.
     */
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * PriceHistory findMany
   */
  export type PriceHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PriceHistories to fetch.
     */
    where?: PriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceHistories to fetch.
     */
    orderBy?: PriceHistoryOrderByWithRelationInput | PriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceHistories.
     */
    cursor?: PriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceHistories.
     */
    skip?: number
    distinct?: PriceHistoryScalarFieldEnum | PriceHistoryScalarFieldEnum[]
  }

  /**
   * PriceHistory create
   */
  export type PriceHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceHistory.
     */
    data: XOR<PriceHistoryCreateInput, PriceHistoryUncheckedCreateInput>
  }

  /**
   * PriceHistory createMany
   */
  export type PriceHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceHistories.
     */
    data: PriceHistoryCreateManyInput | PriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceHistory createManyAndReturn
   */
  export type PriceHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PriceHistories.
     */
    data: PriceHistoryCreateManyInput | PriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceHistory update
   */
  export type PriceHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceHistory.
     */
    data: XOR<PriceHistoryUpdateInput, PriceHistoryUncheckedUpdateInput>
    /**
     * Choose, which PriceHistory to update.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory updateMany
   */
  export type PriceHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceHistories.
     */
    data: XOR<PriceHistoryUpdateManyMutationInput, PriceHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PriceHistories to update
     */
    where?: PriceHistoryWhereInput
  }

  /**
   * PriceHistory upsert
   */
  export type PriceHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceHistory to update in case it exists.
     */
    where: PriceHistoryWhereUniqueInput
    /**
     * In case the PriceHistory found by the `where` argument doesn't exist, create a new PriceHistory with this data.
     */
    create: XOR<PriceHistoryCreateInput, PriceHistoryUncheckedCreateInput>
    /**
     * In case the PriceHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceHistoryUpdateInput, PriceHistoryUncheckedUpdateInput>
  }

  /**
   * PriceHistory delete
   */
  export type PriceHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
    /**
     * Filter which PriceHistory to delete.
     */
    where: PriceHistoryWhereUniqueInput
  }

  /**
   * PriceHistory deleteMany
   */
  export type PriceHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceHistories to delete
     */
    where?: PriceHistoryWhereInput
  }

  /**
   * PriceHistory without action
   */
  export type PriceHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceHistory
     */
    select?: PriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceHistoryInclude<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogAvgAggregateOutputType = {
    id: number | null
    rows: number | null
    durationMs: number | null
  }

  export type SyncLogSumAggregateOutputType = {
    id: number | null
    rows: number | null
    durationMs: number | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: number | null
    source: string | null
    status: string | null
    rows: number | null
    error: string | null
    durationMs: number | null
    startedAt: Date | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: number | null
    source: string | null
    status: string | null
    rows: number | null
    error: string | null
    durationMs: number | null
    startedAt: Date | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    source: number
    status: number
    rows: number
    error: number
    durationMs: number
    startedAt: number
    _all: number
  }


  export type SyncLogAvgAggregateInputType = {
    id?: true
    rows?: true
    durationMs?: true
  }

  export type SyncLogSumAggregateInputType = {
    id?: true
    rows?: true
    durationMs?: true
  }

  export type SyncLogMinAggregateInputType = {
    id?: true
    source?: true
    status?: true
    rows?: true
    error?: true
    durationMs?: true
    startedAt?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    source?: true
    status?: true
    rows?: true
    error?: true
    durationMs?: true
    startedAt?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    source?: true
    status?: true
    rows?: true
    error?: true
    durationMs?: true
    startedAt?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _avg?: SyncLogAvgAggregateInputType
    _sum?: SyncLogSumAggregateInputType
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: number
    source: string
    status: string
    rows: number | null
    error: string | null
    durationMs: number | null
    startedAt: Date
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    status?: boolean
    rows?: boolean
    error?: boolean
    durationMs?: boolean
    startedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    status?: boolean
    rows?: boolean
    error?: boolean
    durationMs?: boolean
    startedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    source?: boolean
    status?: boolean
    rows?: boolean
    error?: boolean
    durationMs?: boolean
    startedAt?: boolean
  }


  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      source: string
      status: string
      rows: number | null
      error: string | null
      durationMs: number | null
      startedAt: Date
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */ 
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'Int'>
    readonly source: FieldRef<"SyncLog", 'String'>
    readonly status: FieldRef<"SyncLog", 'String'>
    readonly rows: FieldRef<"SyncLog", 'Int'>
    readonly error: FieldRef<"SyncLog", 'String'>
    readonly durationMs: FieldRef<"SyncLog", 'Int'>
    readonly startedAt: FieldRef<"SyncLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
  }


  /**
   * Model RateConfig
   */

  export type AggregateRateConfig = {
    _count: RateConfigCountAggregateOutputType | null
    _avg: RateConfigAvgAggregateOutputType | null
    _sum: RateConfigSumAggregateOutputType | null
    _min: RateConfigMinAggregateOutputType | null
    _max: RateConfigMaxAggregateOutputType | null
  }

  export type RateConfigAvgAggregateOutputType = {
    keysPerVizard: number | null
    keysPerScroll: number | null
  }

  export type RateConfigSumAggregateOutputType = {
    keysPerVizard: number | null
    keysPerScroll: number | null
  }

  export type RateConfigMinAggregateOutputType = {
    id: string | null
    keysPerVizard: number | null
    keysPerScroll: number | null
    updatedAt: Date | null
  }

  export type RateConfigMaxAggregateOutputType = {
    id: string | null
    keysPerVizard: number | null
    keysPerScroll: number | null
    updatedAt: Date | null
  }

  export type RateConfigCountAggregateOutputType = {
    id: number
    keysPerVizard: number
    keysPerScroll: number
    updatedAt: number
    _all: number
  }


  export type RateConfigAvgAggregateInputType = {
    keysPerVizard?: true
    keysPerScroll?: true
  }

  export type RateConfigSumAggregateInputType = {
    keysPerVizard?: true
    keysPerScroll?: true
  }

  export type RateConfigMinAggregateInputType = {
    id?: true
    keysPerVizard?: true
    keysPerScroll?: true
    updatedAt?: true
  }

  export type RateConfigMaxAggregateInputType = {
    id?: true
    keysPerVizard?: true
    keysPerScroll?: true
    updatedAt?: true
  }

  export type RateConfigCountAggregateInputType = {
    id?: true
    keysPerVizard?: true
    keysPerScroll?: true
    updatedAt?: true
    _all?: true
  }

  export type RateConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateConfig to aggregate.
     */
    where?: RateConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateConfigs to fetch.
     */
    orderBy?: RateConfigOrderByWithRelationInput | RateConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RateConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RateConfigs
    **/
    _count?: true | RateConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RateConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RateConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RateConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RateConfigMaxAggregateInputType
  }

  export type GetRateConfigAggregateType<T extends RateConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateRateConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRateConfig[P]>
      : GetScalarType<T[P], AggregateRateConfig[P]>
  }




  export type RateConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RateConfigWhereInput
    orderBy?: RateConfigOrderByWithAggregationInput | RateConfigOrderByWithAggregationInput[]
    by: RateConfigScalarFieldEnum[] | RateConfigScalarFieldEnum
    having?: RateConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RateConfigCountAggregateInputType | true
    _avg?: RateConfigAvgAggregateInputType
    _sum?: RateConfigSumAggregateInputType
    _min?: RateConfigMinAggregateInputType
    _max?: RateConfigMaxAggregateInputType
  }

  export type RateConfigGroupByOutputType = {
    id: string
    keysPerVizard: number
    keysPerScroll: number
    updatedAt: Date
    _count: RateConfigCountAggregateOutputType | null
    _avg: RateConfigAvgAggregateOutputType | null
    _sum: RateConfigSumAggregateOutputType | null
    _min: RateConfigMinAggregateOutputType | null
    _max: RateConfigMaxAggregateOutputType | null
  }

  type GetRateConfigGroupByPayload<T extends RateConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RateConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RateConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RateConfigGroupByOutputType[P]>
            : GetScalarType<T[P], RateConfigGroupByOutputType[P]>
        }
      >
    >


  export type RateConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keysPerVizard?: boolean
    keysPerScroll?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateConfig"]>

  export type RateConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keysPerVizard?: boolean
    keysPerScroll?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateConfig"]>

  export type RateConfigSelectScalar = {
    id?: boolean
    keysPerVizard?: boolean
    keysPerScroll?: boolean
    updatedAt?: boolean
  }


  export type $RateConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RateConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      keysPerVizard: number
      keysPerScroll: number
      updatedAt: Date
    }, ExtArgs["result"]["rateConfig"]>
    composites: {}
  }

  type RateConfigGetPayload<S extends boolean | null | undefined | RateConfigDefaultArgs> = $Result.GetResult<Prisma.$RateConfigPayload, S>

  type RateConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RateConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RateConfigCountAggregateInputType | true
    }

  export interface RateConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RateConfig'], meta: { name: 'RateConfig' } }
    /**
     * Find zero or one RateConfig that matches the filter.
     * @param {RateConfigFindUniqueArgs} args - Arguments to find a RateConfig
     * @example
     * // Get one RateConfig
     * const rateConfig = await prisma.rateConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RateConfigFindUniqueArgs>(args: SelectSubset<T, RateConfigFindUniqueArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RateConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RateConfigFindUniqueOrThrowArgs} args - Arguments to find a RateConfig
     * @example
     * // Get one RateConfig
     * const rateConfig = await prisma.rateConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RateConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, RateConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RateConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateConfigFindFirstArgs} args - Arguments to find a RateConfig
     * @example
     * // Get one RateConfig
     * const rateConfig = await prisma.rateConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RateConfigFindFirstArgs>(args?: SelectSubset<T, RateConfigFindFirstArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RateConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateConfigFindFirstOrThrowArgs} args - Arguments to find a RateConfig
     * @example
     * // Get one RateConfig
     * const rateConfig = await prisma.rateConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RateConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, RateConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RateConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RateConfigs
     * const rateConfigs = await prisma.rateConfig.findMany()
     * 
     * // Get first 10 RateConfigs
     * const rateConfigs = await prisma.rateConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rateConfigWithIdOnly = await prisma.rateConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RateConfigFindManyArgs>(args?: SelectSubset<T, RateConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RateConfig.
     * @param {RateConfigCreateArgs} args - Arguments to create a RateConfig.
     * @example
     * // Create one RateConfig
     * const RateConfig = await prisma.rateConfig.create({
     *   data: {
     *     // ... data to create a RateConfig
     *   }
     * })
     * 
     */
    create<T extends RateConfigCreateArgs>(args: SelectSubset<T, RateConfigCreateArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RateConfigs.
     * @param {RateConfigCreateManyArgs} args - Arguments to create many RateConfigs.
     * @example
     * // Create many RateConfigs
     * const rateConfig = await prisma.rateConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RateConfigCreateManyArgs>(args?: SelectSubset<T, RateConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RateConfigs and returns the data saved in the database.
     * @param {RateConfigCreateManyAndReturnArgs} args - Arguments to create many RateConfigs.
     * @example
     * // Create many RateConfigs
     * const rateConfig = await prisma.rateConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RateConfigs and only return the `id`
     * const rateConfigWithIdOnly = await prisma.rateConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RateConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, RateConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RateConfig.
     * @param {RateConfigDeleteArgs} args - Arguments to delete one RateConfig.
     * @example
     * // Delete one RateConfig
     * const RateConfig = await prisma.rateConfig.delete({
     *   where: {
     *     // ... filter to delete one RateConfig
     *   }
     * })
     * 
     */
    delete<T extends RateConfigDeleteArgs>(args: SelectSubset<T, RateConfigDeleteArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RateConfig.
     * @param {RateConfigUpdateArgs} args - Arguments to update one RateConfig.
     * @example
     * // Update one RateConfig
     * const rateConfig = await prisma.rateConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RateConfigUpdateArgs>(args: SelectSubset<T, RateConfigUpdateArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RateConfigs.
     * @param {RateConfigDeleteManyArgs} args - Arguments to filter RateConfigs to delete.
     * @example
     * // Delete a few RateConfigs
     * const { count } = await prisma.rateConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RateConfigDeleteManyArgs>(args?: SelectSubset<T, RateConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RateConfigs
     * const rateConfig = await prisma.rateConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RateConfigUpdateManyArgs>(args: SelectSubset<T, RateConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RateConfig.
     * @param {RateConfigUpsertArgs} args - Arguments to update or create a RateConfig.
     * @example
     * // Update or create a RateConfig
     * const rateConfig = await prisma.rateConfig.upsert({
     *   create: {
     *     // ... data to create a RateConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RateConfig we want to update
     *   }
     * })
     */
    upsert<T extends RateConfigUpsertArgs>(args: SelectSubset<T, RateConfigUpsertArgs<ExtArgs>>): Prisma__RateConfigClient<$Result.GetResult<Prisma.$RateConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RateConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateConfigCountArgs} args - Arguments to filter RateConfigs to count.
     * @example
     * // Count the number of RateConfigs
     * const count = await prisma.rateConfig.count({
     *   where: {
     *     // ... the filter for the RateConfigs we want to count
     *   }
     * })
    **/
    count<T extends RateConfigCountArgs>(
      args?: Subset<T, RateConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RateConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RateConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RateConfigAggregateArgs>(args: Subset<T, RateConfigAggregateArgs>): Prisma.PrismaPromise<GetRateConfigAggregateType<T>>

    /**
     * Group by RateConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RateConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RateConfigGroupByArgs['orderBy'] }
        : { orderBy?: RateConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RateConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RateConfig model
   */
  readonly fields: RateConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RateConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RateConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RateConfig model
   */ 
  interface RateConfigFieldRefs {
    readonly id: FieldRef<"RateConfig", 'String'>
    readonly keysPerVizard: FieldRef<"RateConfig", 'Float'>
    readonly keysPerScroll: FieldRef<"RateConfig", 'Float'>
    readonly updatedAt: FieldRef<"RateConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RateConfig findUnique
   */
  export type RateConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * Filter, which RateConfig to fetch.
     */
    where: RateConfigWhereUniqueInput
  }

  /**
   * RateConfig findUniqueOrThrow
   */
  export type RateConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * Filter, which RateConfig to fetch.
     */
    where: RateConfigWhereUniqueInput
  }

  /**
   * RateConfig findFirst
   */
  export type RateConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * Filter, which RateConfig to fetch.
     */
    where?: RateConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateConfigs to fetch.
     */
    orderBy?: RateConfigOrderByWithRelationInput | RateConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateConfigs.
     */
    cursor?: RateConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateConfigs.
     */
    distinct?: RateConfigScalarFieldEnum | RateConfigScalarFieldEnum[]
  }

  /**
   * RateConfig findFirstOrThrow
   */
  export type RateConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * Filter, which RateConfig to fetch.
     */
    where?: RateConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateConfigs to fetch.
     */
    orderBy?: RateConfigOrderByWithRelationInput | RateConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateConfigs.
     */
    cursor?: RateConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateConfigs.
     */
    distinct?: RateConfigScalarFieldEnum | RateConfigScalarFieldEnum[]
  }

  /**
   * RateConfig findMany
   */
  export type RateConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * Filter, which RateConfigs to fetch.
     */
    where?: RateConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateConfigs to fetch.
     */
    orderBy?: RateConfigOrderByWithRelationInput | RateConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RateConfigs.
     */
    cursor?: RateConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateConfigs.
     */
    skip?: number
    distinct?: RateConfigScalarFieldEnum | RateConfigScalarFieldEnum[]
  }

  /**
   * RateConfig create
   */
  export type RateConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a RateConfig.
     */
    data: XOR<RateConfigCreateInput, RateConfigUncheckedCreateInput>
  }

  /**
   * RateConfig createMany
   */
  export type RateConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RateConfigs.
     */
    data: RateConfigCreateManyInput | RateConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateConfig createManyAndReturn
   */
  export type RateConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RateConfigs.
     */
    data: RateConfigCreateManyInput | RateConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateConfig update
   */
  export type RateConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a RateConfig.
     */
    data: XOR<RateConfigUpdateInput, RateConfigUncheckedUpdateInput>
    /**
     * Choose, which RateConfig to update.
     */
    where: RateConfigWhereUniqueInput
  }

  /**
   * RateConfig updateMany
   */
  export type RateConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RateConfigs.
     */
    data: XOR<RateConfigUpdateManyMutationInput, RateConfigUncheckedUpdateManyInput>
    /**
     * Filter which RateConfigs to update
     */
    where?: RateConfigWhereInput
  }

  /**
   * RateConfig upsert
   */
  export type RateConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the RateConfig to update in case it exists.
     */
    where: RateConfigWhereUniqueInput
    /**
     * In case the RateConfig found by the `where` argument doesn't exist, create a new RateConfig with this data.
     */
    create: XOR<RateConfigCreateInput, RateConfigUncheckedCreateInput>
    /**
     * In case the RateConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RateConfigUpdateInput, RateConfigUncheckedUpdateInput>
  }

  /**
   * RateConfig delete
   */
  export type RateConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
    /**
     * Filter which RateConfig to delete.
     */
    where: RateConfigWhereUniqueInput
  }

  /**
   * RateConfig deleteMany
   */
  export type RateConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateConfigs to delete
     */
    where?: RateConfigWhereInput
  }

  /**
   * RateConfig without action
   */
  export type RateConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateConfig
     */
    select?: RateConfigSelect<ExtArgs> | null
  }


  /**
   * Model GuildConfig
   */

  export type AggregateGuildConfig = {
    _count: GuildConfigCountAggregateOutputType | null
    _min: GuildConfigMinAggregateOutputType | null
    _max: GuildConfigMaxAggregateOutputType | null
  }

  export type GuildConfigMinAggregateOutputType = {
    id: string | null
    guildId: string | null
    defaultPrefix: string | null
    officialChannelId: string | null
    tradeChannelId: string | null
    updatedAt: Date | null
  }

  export type GuildConfigMaxAggregateOutputType = {
    id: string | null
    guildId: string | null
    defaultPrefix: string | null
    officialChannelId: string | null
    tradeChannelId: string | null
    updatedAt: Date | null
  }

  export type GuildConfigCountAggregateOutputType = {
    id: number
    guildId: number
    defaultPrefix: number
    officialChannelId: number
    tradeChannelId: number
    updatedAt: number
    _all: number
  }


  export type GuildConfigMinAggregateInputType = {
    id?: true
    guildId?: true
    defaultPrefix?: true
    officialChannelId?: true
    tradeChannelId?: true
    updatedAt?: true
  }

  export type GuildConfigMaxAggregateInputType = {
    id?: true
    guildId?: true
    defaultPrefix?: true
    officialChannelId?: true
    tradeChannelId?: true
    updatedAt?: true
  }

  export type GuildConfigCountAggregateInputType = {
    id?: true
    guildId?: true
    defaultPrefix?: true
    officialChannelId?: true
    tradeChannelId?: true
    updatedAt?: true
    _all?: true
  }

  export type GuildConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildConfig to aggregate.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuildConfigs
    **/
    _count?: true | GuildConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildConfigMaxAggregateInputType
  }

  export type GetGuildConfigAggregateType<T extends GuildConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateGuildConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuildConfig[P]>
      : GetScalarType<T[P], AggregateGuildConfig[P]>
  }




  export type GuildConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildConfigWhereInput
    orderBy?: GuildConfigOrderByWithAggregationInput | GuildConfigOrderByWithAggregationInput[]
    by: GuildConfigScalarFieldEnum[] | GuildConfigScalarFieldEnum
    having?: GuildConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildConfigCountAggregateInputType | true
    _min?: GuildConfigMinAggregateInputType
    _max?: GuildConfigMaxAggregateInputType
  }

  export type GuildConfigGroupByOutputType = {
    id: string
    guildId: string
    defaultPrefix: string
    officialChannelId: string | null
    tradeChannelId: string | null
    updatedAt: Date
    _count: GuildConfigCountAggregateOutputType | null
    _min: GuildConfigMinAggregateOutputType | null
    _max: GuildConfigMaxAggregateOutputType | null
  }

  type GetGuildConfigGroupByPayload<T extends GuildConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildConfigGroupByOutputType[P]>
            : GetScalarType<T[P], GuildConfigGroupByOutputType[P]>
        }
      >
    >


  export type GuildConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    defaultPrefix?: boolean
    officialChannelId?: boolean
    tradeChannelId?: boolean
    updatedAt?: boolean
    channels?: boolean | GuildConfig$channelsArgs<ExtArgs>
    _count?: boolean | GuildConfigCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildConfig"]>

  export type GuildConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    defaultPrefix?: boolean
    officialChannelId?: boolean
    tradeChannelId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guildConfig"]>

  export type GuildConfigSelectScalar = {
    id?: boolean
    guildId?: boolean
    defaultPrefix?: boolean
    officialChannelId?: boolean
    tradeChannelId?: boolean
    updatedAt?: boolean
  }

  export type GuildConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    channels?: boolean | GuildConfig$channelsArgs<ExtArgs>
    _count?: boolean | GuildConfigCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GuildConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GuildConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuildConfig"
    objects: {
      channels: Prisma.$ChannelConfigPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      guildId: string
      defaultPrefix: string
      officialChannelId: string | null
      tradeChannelId: string | null
      updatedAt: Date
    }, ExtArgs["result"]["guildConfig"]>
    composites: {}
  }

  type GuildConfigGetPayload<S extends boolean | null | undefined | GuildConfigDefaultArgs> = $Result.GetResult<Prisma.$GuildConfigPayload, S>

  type GuildConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GuildConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GuildConfigCountAggregateInputType | true
    }

  export interface GuildConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuildConfig'], meta: { name: 'GuildConfig' } }
    /**
     * Find zero or one GuildConfig that matches the filter.
     * @param {GuildConfigFindUniqueArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildConfigFindUniqueArgs>(args: SelectSubset<T, GuildConfigFindUniqueArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GuildConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GuildConfigFindUniqueOrThrowArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GuildConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigFindFirstArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildConfigFindFirstArgs>(args?: SelectSubset<T, GuildConfigFindFirstArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GuildConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigFindFirstOrThrowArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GuildConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuildConfigs
     * const guildConfigs = await prisma.guildConfig.findMany()
     * 
     * // Get first 10 GuildConfigs
     * const guildConfigs = await prisma.guildConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guildConfigWithIdOnly = await prisma.guildConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuildConfigFindManyArgs>(args?: SelectSubset<T, GuildConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GuildConfig.
     * @param {GuildConfigCreateArgs} args - Arguments to create a GuildConfig.
     * @example
     * // Create one GuildConfig
     * const GuildConfig = await prisma.guildConfig.create({
     *   data: {
     *     // ... data to create a GuildConfig
     *   }
     * })
     * 
     */
    create<T extends GuildConfigCreateArgs>(args: SelectSubset<T, GuildConfigCreateArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GuildConfigs.
     * @param {GuildConfigCreateManyArgs} args - Arguments to create many GuildConfigs.
     * @example
     * // Create many GuildConfigs
     * const guildConfig = await prisma.guildConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildConfigCreateManyArgs>(args?: SelectSubset<T, GuildConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuildConfigs and returns the data saved in the database.
     * @param {GuildConfigCreateManyAndReturnArgs} args - Arguments to create many GuildConfigs.
     * @example
     * // Create many GuildConfigs
     * const guildConfig = await prisma.guildConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuildConfigs and only return the `id`
     * const guildConfigWithIdOnly = await prisma.guildConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuildConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, GuildConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GuildConfig.
     * @param {GuildConfigDeleteArgs} args - Arguments to delete one GuildConfig.
     * @example
     * // Delete one GuildConfig
     * const GuildConfig = await prisma.guildConfig.delete({
     *   where: {
     *     // ... filter to delete one GuildConfig
     *   }
     * })
     * 
     */
    delete<T extends GuildConfigDeleteArgs>(args: SelectSubset<T, GuildConfigDeleteArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GuildConfig.
     * @param {GuildConfigUpdateArgs} args - Arguments to update one GuildConfig.
     * @example
     * // Update one GuildConfig
     * const guildConfig = await prisma.guildConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildConfigUpdateArgs>(args: SelectSubset<T, GuildConfigUpdateArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GuildConfigs.
     * @param {GuildConfigDeleteManyArgs} args - Arguments to filter GuildConfigs to delete.
     * @example
     * // Delete a few GuildConfigs
     * const { count } = await prisma.guildConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildConfigDeleteManyArgs>(args?: SelectSubset<T, GuildConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuildConfigs
     * const guildConfig = await prisma.guildConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildConfigUpdateManyArgs>(args: SelectSubset<T, GuildConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GuildConfig.
     * @param {GuildConfigUpsertArgs} args - Arguments to update or create a GuildConfig.
     * @example
     * // Update or create a GuildConfig
     * const guildConfig = await prisma.guildConfig.upsert({
     *   create: {
     *     // ... data to create a GuildConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuildConfig we want to update
     *   }
     * })
     */
    upsert<T extends GuildConfigUpsertArgs>(args: SelectSubset<T, GuildConfigUpsertArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigCountArgs} args - Arguments to filter GuildConfigs to count.
     * @example
     * // Count the number of GuildConfigs
     * const count = await prisma.guildConfig.count({
     *   where: {
     *     // ... the filter for the GuildConfigs we want to count
     *   }
     * })
    **/
    count<T extends GuildConfigCountArgs>(
      args?: Subset<T, GuildConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuildConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildConfigAggregateArgs>(args: Subset<T, GuildConfigAggregateArgs>): Prisma.PrismaPromise<GetGuildConfigAggregateType<T>>

    /**
     * Group by GuildConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildConfigGroupByArgs['orderBy'] }
        : { orderBy?: GuildConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuildConfig model
   */
  readonly fields: GuildConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuildConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    channels<T extends GuildConfig$channelsArgs<ExtArgs> = {}>(args?: Subset<T, GuildConfig$channelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuildConfig model
   */ 
  interface GuildConfigFieldRefs {
    readonly id: FieldRef<"GuildConfig", 'String'>
    readonly guildId: FieldRef<"GuildConfig", 'String'>
    readonly defaultPrefix: FieldRef<"GuildConfig", 'String'>
    readonly officialChannelId: FieldRef<"GuildConfig", 'String'>
    readonly tradeChannelId: FieldRef<"GuildConfig", 'String'>
    readonly updatedAt: FieldRef<"GuildConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GuildConfig findUnique
   */
  export type GuildConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig findUniqueOrThrow
   */
  export type GuildConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig findFirst
   */
  export type GuildConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildConfigs.
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildConfigs.
     */
    distinct?: GuildConfigScalarFieldEnum | GuildConfigScalarFieldEnum[]
  }

  /**
   * GuildConfig findFirstOrThrow
   */
  export type GuildConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildConfigs.
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildConfigs.
     */
    distinct?: GuildConfigScalarFieldEnum | GuildConfigScalarFieldEnum[]
  }

  /**
   * GuildConfig findMany
   */
  export type GuildConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * Filter, which GuildConfigs to fetch.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuildConfigs.
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    distinct?: GuildConfigScalarFieldEnum | GuildConfigScalarFieldEnum[]
  }

  /**
   * GuildConfig create
   */
  export type GuildConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a GuildConfig.
     */
    data: XOR<GuildConfigCreateInput, GuildConfigUncheckedCreateInput>
  }

  /**
   * GuildConfig createMany
   */
  export type GuildConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuildConfigs.
     */
    data: GuildConfigCreateManyInput | GuildConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuildConfig createManyAndReturn
   */
  export type GuildConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GuildConfigs.
     */
    data: GuildConfigCreateManyInput | GuildConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuildConfig update
   */
  export type GuildConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a GuildConfig.
     */
    data: XOR<GuildConfigUpdateInput, GuildConfigUncheckedUpdateInput>
    /**
     * Choose, which GuildConfig to update.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig updateMany
   */
  export type GuildConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuildConfigs.
     */
    data: XOR<GuildConfigUpdateManyMutationInput, GuildConfigUncheckedUpdateManyInput>
    /**
     * Filter which GuildConfigs to update
     */
    where?: GuildConfigWhereInput
  }

  /**
   * GuildConfig upsert
   */
  export type GuildConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the GuildConfig to update in case it exists.
     */
    where: GuildConfigWhereUniqueInput
    /**
     * In case the GuildConfig found by the `where` argument doesn't exist, create a new GuildConfig with this data.
     */
    create: XOR<GuildConfigCreateInput, GuildConfigUncheckedCreateInput>
    /**
     * In case the GuildConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildConfigUpdateInput, GuildConfigUncheckedUpdateInput>
  }

  /**
   * GuildConfig delete
   */
  export type GuildConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
    /**
     * Filter which GuildConfig to delete.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig deleteMany
   */
  export type GuildConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildConfigs to delete
     */
    where?: GuildConfigWhereInput
  }

  /**
   * GuildConfig.channels
   */
  export type GuildConfig$channelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    where?: ChannelConfigWhereInput
    orderBy?: ChannelConfigOrderByWithRelationInput | ChannelConfigOrderByWithRelationInput[]
    cursor?: ChannelConfigWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChannelConfigScalarFieldEnum | ChannelConfigScalarFieldEnum[]
  }

  /**
   * GuildConfig without action
   */
  export type GuildConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildConfigInclude<ExtArgs> | null
  }


  /**
   * Model ChannelConfig
   */

  export type AggregateChannelConfig = {
    _count: ChannelConfigCountAggregateOutputType | null
    _min: ChannelConfigMinAggregateOutputType | null
    _max: ChannelConfigMaxAggregateOutputType | null
  }

  export type ChannelConfigMinAggregateOutputType = {
    id: string | null
    guildId: string | null
    channelId: string | null
    role: string | null
    prefix: string | null
  }

  export type ChannelConfigMaxAggregateOutputType = {
    id: string | null
    guildId: string | null
    channelId: string | null
    role: string | null
    prefix: string | null
  }

  export type ChannelConfigCountAggregateOutputType = {
    id: number
    guildId: number
    channelId: number
    role: number
    prefix: number
    _all: number
  }


  export type ChannelConfigMinAggregateInputType = {
    id?: true
    guildId?: true
    channelId?: true
    role?: true
    prefix?: true
  }

  export type ChannelConfigMaxAggregateInputType = {
    id?: true
    guildId?: true
    channelId?: true
    role?: true
    prefix?: true
  }

  export type ChannelConfigCountAggregateInputType = {
    id?: true
    guildId?: true
    channelId?: true
    role?: true
    prefix?: true
    _all?: true
  }

  export type ChannelConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChannelConfig to aggregate.
     */
    where?: ChannelConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelConfigs to fetch.
     */
    orderBy?: ChannelConfigOrderByWithRelationInput | ChannelConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChannelConfigs
    **/
    _count?: true | ChannelConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelConfigMaxAggregateInputType
  }

  export type GetChannelConfigAggregateType<T extends ChannelConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateChannelConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannelConfig[P]>
      : GetScalarType<T[P], AggregateChannelConfig[P]>
  }




  export type ChannelConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChannelConfigWhereInput
    orderBy?: ChannelConfigOrderByWithAggregationInput | ChannelConfigOrderByWithAggregationInput[]
    by: ChannelConfigScalarFieldEnum[] | ChannelConfigScalarFieldEnum
    having?: ChannelConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelConfigCountAggregateInputType | true
    _min?: ChannelConfigMinAggregateInputType
    _max?: ChannelConfigMaxAggregateInputType
  }

  export type ChannelConfigGroupByOutputType = {
    id: string
    guildId: string
    channelId: string
    role: string | null
    prefix: string | null
    _count: ChannelConfigCountAggregateOutputType | null
    _min: ChannelConfigMinAggregateOutputType | null
    _max: ChannelConfigMaxAggregateOutputType | null
  }

  type GetChannelConfigGroupByPayload<T extends ChannelConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChannelConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelConfigGroupByOutputType[P]>
        }
      >
    >


  export type ChannelConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    channelId?: boolean
    role?: boolean
    prefix?: boolean
    guild?: boolean | GuildConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channelConfig"]>

  export type ChannelConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    channelId?: boolean
    role?: boolean
    prefix?: boolean
    guild?: boolean | GuildConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["channelConfig"]>

  export type ChannelConfigSelectScalar = {
    id?: boolean
    guildId?: boolean
    channelId?: boolean
    role?: boolean
    prefix?: boolean
  }

  export type ChannelConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildConfigDefaultArgs<ExtArgs>
  }
  export type ChannelConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildConfigDefaultArgs<ExtArgs>
  }

  export type $ChannelConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChannelConfig"
    objects: {
      guild: Prisma.$GuildConfigPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      guildId: string
      channelId: string
      role: string | null
      prefix: string | null
    }, ExtArgs["result"]["channelConfig"]>
    composites: {}
  }

  type ChannelConfigGetPayload<S extends boolean | null | undefined | ChannelConfigDefaultArgs> = $Result.GetResult<Prisma.$ChannelConfigPayload, S>

  type ChannelConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChannelConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChannelConfigCountAggregateInputType | true
    }

  export interface ChannelConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChannelConfig'], meta: { name: 'ChannelConfig' } }
    /**
     * Find zero or one ChannelConfig that matches the filter.
     * @param {ChannelConfigFindUniqueArgs} args - Arguments to find a ChannelConfig
     * @example
     * // Get one ChannelConfig
     * const channelConfig = await prisma.channelConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChannelConfigFindUniqueArgs>(args: SelectSubset<T, ChannelConfigFindUniqueArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ChannelConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ChannelConfigFindUniqueOrThrowArgs} args - Arguments to find a ChannelConfig
     * @example
     * // Get one ChannelConfig
     * const channelConfig = await prisma.channelConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChannelConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, ChannelConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ChannelConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelConfigFindFirstArgs} args - Arguments to find a ChannelConfig
     * @example
     * // Get one ChannelConfig
     * const channelConfig = await prisma.channelConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChannelConfigFindFirstArgs>(args?: SelectSubset<T, ChannelConfigFindFirstArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ChannelConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelConfigFindFirstOrThrowArgs} args - Arguments to find a ChannelConfig
     * @example
     * // Get one ChannelConfig
     * const channelConfig = await prisma.channelConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChannelConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, ChannelConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ChannelConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChannelConfigs
     * const channelConfigs = await prisma.channelConfig.findMany()
     * 
     * // Get first 10 ChannelConfigs
     * const channelConfigs = await prisma.channelConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channelConfigWithIdOnly = await prisma.channelConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChannelConfigFindManyArgs>(args?: SelectSubset<T, ChannelConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ChannelConfig.
     * @param {ChannelConfigCreateArgs} args - Arguments to create a ChannelConfig.
     * @example
     * // Create one ChannelConfig
     * const ChannelConfig = await prisma.channelConfig.create({
     *   data: {
     *     // ... data to create a ChannelConfig
     *   }
     * })
     * 
     */
    create<T extends ChannelConfigCreateArgs>(args: SelectSubset<T, ChannelConfigCreateArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ChannelConfigs.
     * @param {ChannelConfigCreateManyArgs} args - Arguments to create many ChannelConfigs.
     * @example
     * // Create many ChannelConfigs
     * const channelConfig = await prisma.channelConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChannelConfigCreateManyArgs>(args?: SelectSubset<T, ChannelConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChannelConfigs and returns the data saved in the database.
     * @param {ChannelConfigCreateManyAndReturnArgs} args - Arguments to create many ChannelConfigs.
     * @example
     * // Create many ChannelConfigs
     * const channelConfig = await prisma.channelConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChannelConfigs and only return the `id`
     * const channelConfigWithIdOnly = await prisma.channelConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChannelConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, ChannelConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ChannelConfig.
     * @param {ChannelConfigDeleteArgs} args - Arguments to delete one ChannelConfig.
     * @example
     * // Delete one ChannelConfig
     * const ChannelConfig = await prisma.channelConfig.delete({
     *   where: {
     *     // ... filter to delete one ChannelConfig
     *   }
     * })
     * 
     */
    delete<T extends ChannelConfigDeleteArgs>(args: SelectSubset<T, ChannelConfigDeleteArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ChannelConfig.
     * @param {ChannelConfigUpdateArgs} args - Arguments to update one ChannelConfig.
     * @example
     * // Update one ChannelConfig
     * const channelConfig = await prisma.channelConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChannelConfigUpdateArgs>(args: SelectSubset<T, ChannelConfigUpdateArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ChannelConfigs.
     * @param {ChannelConfigDeleteManyArgs} args - Arguments to filter ChannelConfigs to delete.
     * @example
     * // Delete a few ChannelConfigs
     * const { count } = await prisma.channelConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChannelConfigDeleteManyArgs>(args?: SelectSubset<T, ChannelConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChannelConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChannelConfigs
     * const channelConfig = await prisma.channelConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChannelConfigUpdateManyArgs>(args: SelectSubset<T, ChannelConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChannelConfig.
     * @param {ChannelConfigUpsertArgs} args - Arguments to update or create a ChannelConfig.
     * @example
     * // Update or create a ChannelConfig
     * const channelConfig = await prisma.channelConfig.upsert({
     *   create: {
     *     // ... data to create a ChannelConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChannelConfig we want to update
     *   }
     * })
     */
    upsert<T extends ChannelConfigUpsertArgs>(args: SelectSubset<T, ChannelConfigUpsertArgs<ExtArgs>>): Prisma__ChannelConfigClient<$Result.GetResult<Prisma.$ChannelConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ChannelConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelConfigCountArgs} args - Arguments to filter ChannelConfigs to count.
     * @example
     * // Count the number of ChannelConfigs
     * const count = await prisma.channelConfig.count({
     *   where: {
     *     // ... the filter for the ChannelConfigs we want to count
     *   }
     * })
    **/
    count<T extends ChannelConfigCountArgs>(
      args?: Subset<T, ChannelConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChannelConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelConfigAggregateArgs>(args: Subset<T, ChannelConfigAggregateArgs>): Prisma.PrismaPromise<GetChannelConfigAggregateType<T>>

    /**
     * Group by ChannelConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelConfigGroupByArgs['orderBy'] }
        : { orderBy?: ChannelConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChannelConfig model
   */
  readonly fields: ChannelConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChannelConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChannelConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guild<T extends GuildConfigDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuildConfigDefaultArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChannelConfig model
   */ 
  interface ChannelConfigFieldRefs {
    readonly id: FieldRef<"ChannelConfig", 'String'>
    readonly guildId: FieldRef<"ChannelConfig", 'String'>
    readonly channelId: FieldRef<"ChannelConfig", 'String'>
    readonly role: FieldRef<"ChannelConfig", 'String'>
    readonly prefix: FieldRef<"ChannelConfig", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ChannelConfig findUnique
   */
  export type ChannelConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * Filter, which ChannelConfig to fetch.
     */
    where: ChannelConfigWhereUniqueInput
  }

  /**
   * ChannelConfig findUniqueOrThrow
   */
  export type ChannelConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * Filter, which ChannelConfig to fetch.
     */
    where: ChannelConfigWhereUniqueInput
  }

  /**
   * ChannelConfig findFirst
   */
  export type ChannelConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * Filter, which ChannelConfig to fetch.
     */
    where?: ChannelConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelConfigs to fetch.
     */
    orderBy?: ChannelConfigOrderByWithRelationInput | ChannelConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChannelConfigs.
     */
    cursor?: ChannelConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChannelConfigs.
     */
    distinct?: ChannelConfigScalarFieldEnum | ChannelConfigScalarFieldEnum[]
  }

  /**
   * ChannelConfig findFirstOrThrow
   */
  export type ChannelConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * Filter, which ChannelConfig to fetch.
     */
    where?: ChannelConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelConfigs to fetch.
     */
    orderBy?: ChannelConfigOrderByWithRelationInput | ChannelConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChannelConfigs.
     */
    cursor?: ChannelConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChannelConfigs.
     */
    distinct?: ChannelConfigScalarFieldEnum | ChannelConfigScalarFieldEnum[]
  }

  /**
   * ChannelConfig findMany
   */
  export type ChannelConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * Filter, which ChannelConfigs to fetch.
     */
    where?: ChannelConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChannelConfigs to fetch.
     */
    orderBy?: ChannelConfigOrderByWithRelationInput | ChannelConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChannelConfigs.
     */
    cursor?: ChannelConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChannelConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChannelConfigs.
     */
    skip?: number
    distinct?: ChannelConfigScalarFieldEnum | ChannelConfigScalarFieldEnum[]
  }

  /**
   * ChannelConfig create
   */
  export type ChannelConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a ChannelConfig.
     */
    data: XOR<ChannelConfigCreateInput, ChannelConfigUncheckedCreateInput>
  }

  /**
   * ChannelConfig createMany
   */
  export type ChannelConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChannelConfigs.
     */
    data: ChannelConfigCreateManyInput | ChannelConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChannelConfig createManyAndReturn
   */
  export type ChannelConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ChannelConfigs.
     */
    data: ChannelConfigCreateManyInput | ChannelConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChannelConfig update
   */
  export type ChannelConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a ChannelConfig.
     */
    data: XOR<ChannelConfigUpdateInput, ChannelConfigUncheckedUpdateInput>
    /**
     * Choose, which ChannelConfig to update.
     */
    where: ChannelConfigWhereUniqueInput
  }

  /**
   * ChannelConfig updateMany
   */
  export type ChannelConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChannelConfigs.
     */
    data: XOR<ChannelConfigUpdateManyMutationInput, ChannelConfigUncheckedUpdateManyInput>
    /**
     * Filter which ChannelConfigs to update
     */
    where?: ChannelConfigWhereInput
  }

  /**
   * ChannelConfig upsert
   */
  export type ChannelConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the ChannelConfig to update in case it exists.
     */
    where: ChannelConfigWhereUniqueInput
    /**
     * In case the ChannelConfig found by the `where` argument doesn't exist, create a new ChannelConfig with this data.
     */
    create: XOR<ChannelConfigCreateInput, ChannelConfigUncheckedCreateInput>
    /**
     * In case the ChannelConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelConfigUpdateInput, ChannelConfigUncheckedUpdateInput>
  }

  /**
   * ChannelConfig delete
   */
  export type ChannelConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
    /**
     * Filter which ChannelConfig to delete.
     */
    where: ChannelConfigWhereUniqueInput
  }

  /**
   * ChannelConfig deleteMany
   */
  export type ChannelConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChannelConfigs to delete
     */
    where?: ChannelConfigWhereInput
  }

  /**
   * ChannelConfig without action
   */
  export type ChannelConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChannelConfig
     */
    select?: ChannelConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChannelConfigInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    normalized: 'normalized',
    slug: 'slug',
    category: 'category',
    rarityLabel: 'rarityLabel',
    rarityPct: 'rarityPct',
    status: 'status',
    obtainedFrom: 'obtainedFrom',
    emoji: 'emoji',
    officialKeys: 'officialKeys',
    officialScrolls: 'officialScrolls',
    officialVizards: 'officialVizards',
    officialDemand: 'officialDemand',
    officialRate: 'officialRate',
    officialTaxGems: 'officialTaxGems',
    officialTaxGold: 'officialTaxGold',
    sheet: 'sheet',
    existingAmount: 'existingAmount',
    apiValue: 'apiValue',
    apiDemand: 'apiDemand',
    apiRateOfChange: 'apiRateOfChange',
    apiPrestige: 'apiPrestige',
    apiTaxGems: 'apiTaxGems',
    apiTaxGold: 'apiTaxGold',
    apiUpdatedAt: 'apiUpdatedAt',
    apiId: 'apiId',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const PriceHistoryScalarFieldEnum: {
    id: 'id',
    itemId: 'itemId',
    apiValue: 'apiValue',
    officialVizards: 'officialVizards',
    demand: 'demand',
    recordedAt: 'recordedAt'
  };

  export type PriceHistoryScalarFieldEnum = (typeof PriceHistoryScalarFieldEnum)[keyof typeof PriceHistoryScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    source: 'source',
    status: 'status',
    rows: 'rows',
    error: 'error',
    durationMs: 'durationMs',
    startedAt: 'startedAt'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const RateConfigScalarFieldEnum: {
    id: 'id',
    keysPerVizard: 'keysPerVizard',
    keysPerScroll: 'keysPerScroll',
    updatedAt: 'updatedAt'
  };

  export type RateConfigScalarFieldEnum = (typeof RateConfigScalarFieldEnum)[keyof typeof RateConfigScalarFieldEnum]


  export const GuildConfigScalarFieldEnum: {
    id: 'id',
    guildId: 'guildId',
    defaultPrefix: 'defaultPrefix',
    officialChannelId: 'officialChannelId',
    tradeChannelId: 'tradeChannelId',
    updatedAt: 'updatedAt'
  };

  export type GuildConfigScalarFieldEnum = (typeof GuildConfigScalarFieldEnum)[keyof typeof GuildConfigScalarFieldEnum]


  export const ChannelConfigScalarFieldEnum: {
    id: 'id',
    guildId: 'guildId',
    channelId: 'channelId',
    role: 'role',
    prefix: 'prefix'
  };

  export type ChannelConfigScalarFieldEnum = (typeof ChannelConfigScalarFieldEnum)[keyof typeof ChannelConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: StringFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    normalized?: StringFilter<"Item"> | string
    slug?: StringFilter<"Item"> | string
    category?: StringNullableFilter<"Item"> | string | null
    rarityLabel?: StringNullableFilter<"Item"> | string | null
    rarityPct?: FloatNullableFilter<"Item"> | number | null
    status?: StringNullableFilter<"Item"> | string | null
    obtainedFrom?: StringNullableFilter<"Item"> | string | null
    emoji?: StringNullableFilter<"Item"> | string | null
    officialKeys?: JsonNullableFilter<"Item">
    officialScrolls?: JsonNullableFilter<"Item">
    officialVizards?: JsonNullableFilter<"Item">
    officialDemand?: StringNullableFilter<"Item"> | string | null
    officialRate?: StringNullableFilter<"Item"> | string | null
    officialTaxGems?: FloatNullableFilter<"Item"> | number | null
    officialTaxGold?: FloatNullableFilter<"Item"> | number | null
    sheet?: StringNullableFilter<"Item"> | string | null
    existingAmount?: StringNullableFilter<"Item"> | string | null
    apiValue?: FloatNullableFilter<"Item"> | number | null
    apiDemand?: IntNullableFilter<"Item"> | number | null
    apiRateOfChange?: StringNullableFilter<"Item"> | string | null
    apiPrestige?: IntNullableFilter<"Item"> | number | null
    apiTaxGems?: FloatNullableFilter<"Item"> | number | null
    apiTaxGold?: FloatNullableFilter<"Item"> | number | null
    apiUpdatedAt?: DateTimeNullableFilter<"Item"> | Date | string | null
    apiId?: StringNullableFilter<"Item"> | string | null
    source?: StringFilter<"Item"> | string
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    history?: PriceHistoryListRelationFilter
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    rarityLabel?: SortOrderInput | SortOrder
    rarityPct?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    obtainedFrom?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    officialKeys?: SortOrderInput | SortOrder
    officialScrolls?: SortOrderInput | SortOrder
    officialVizards?: SortOrderInput | SortOrder
    officialDemand?: SortOrderInput | SortOrder
    officialRate?: SortOrderInput | SortOrder
    officialTaxGems?: SortOrderInput | SortOrder
    officialTaxGold?: SortOrderInput | SortOrder
    sheet?: SortOrderInput | SortOrder
    existingAmount?: SortOrderInput | SortOrder
    apiValue?: SortOrderInput | SortOrder
    apiDemand?: SortOrderInput | SortOrder
    apiRateOfChange?: SortOrderInput | SortOrder
    apiPrestige?: SortOrderInput | SortOrder
    apiTaxGems?: SortOrderInput | SortOrder
    apiTaxGold?: SortOrderInput | SortOrder
    apiUpdatedAt?: SortOrderInput | SortOrder
    apiId?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    history?: PriceHistoryOrderByRelationAggregateInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    normalized?: string
    slug?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    name?: StringFilter<"Item"> | string
    category?: StringNullableFilter<"Item"> | string | null
    rarityLabel?: StringNullableFilter<"Item"> | string | null
    rarityPct?: FloatNullableFilter<"Item"> | number | null
    status?: StringNullableFilter<"Item"> | string | null
    obtainedFrom?: StringNullableFilter<"Item"> | string | null
    emoji?: StringNullableFilter<"Item"> | string | null
    officialKeys?: JsonNullableFilter<"Item">
    officialScrolls?: JsonNullableFilter<"Item">
    officialVizards?: JsonNullableFilter<"Item">
    officialDemand?: StringNullableFilter<"Item"> | string | null
    officialRate?: StringNullableFilter<"Item"> | string | null
    officialTaxGems?: FloatNullableFilter<"Item"> | number | null
    officialTaxGold?: FloatNullableFilter<"Item"> | number | null
    sheet?: StringNullableFilter<"Item"> | string | null
    existingAmount?: StringNullableFilter<"Item"> | string | null
    apiValue?: FloatNullableFilter<"Item"> | number | null
    apiDemand?: IntNullableFilter<"Item"> | number | null
    apiRateOfChange?: StringNullableFilter<"Item"> | string | null
    apiPrestige?: IntNullableFilter<"Item"> | number | null
    apiTaxGems?: FloatNullableFilter<"Item"> | number | null
    apiTaxGold?: FloatNullableFilter<"Item"> | number | null
    apiUpdatedAt?: DateTimeNullableFilter<"Item"> | Date | string | null
    apiId?: StringNullableFilter<"Item"> | string | null
    source?: StringFilter<"Item"> | string
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    history?: PriceHistoryListRelationFilter
  }, "id" | "normalized" | "slug">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    rarityLabel?: SortOrderInput | SortOrder
    rarityPct?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    obtainedFrom?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    officialKeys?: SortOrderInput | SortOrder
    officialScrolls?: SortOrderInput | SortOrder
    officialVizards?: SortOrderInput | SortOrder
    officialDemand?: SortOrderInput | SortOrder
    officialRate?: SortOrderInput | SortOrder
    officialTaxGems?: SortOrderInput | SortOrder
    officialTaxGold?: SortOrderInput | SortOrder
    sheet?: SortOrderInput | SortOrder
    existingAmount?: SortOrderInput | SortOrder
    apiValue?: SortOrderInput | SortOrder
    apiDemand?: SortOrderInput | SortOrder
    apiRateOfChange?: SortOrderInput | SortOrder
    apiPrestige?: SortOrderInput | SortOrder
    apiTaxGems?: SortOrderInput | SortOrder
    apiTaxGold?: SortOrderInput | SortOrder
    apiUpdatedAt?: SortOrderInput | SortOrder
    apiId?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Item"> | string
    name?: StringWithAggregatesFilter<"Item"> | string
    normalized?: StringWithAggregatesFilter<"Item"> | string
    slug?: StringWithAggregatesFilter<"Item"> | string
    category?: StringNullableWithAggregatesFilter<"Item"> | string | null
    rarityLabel?: StringNullableWithAggregatesFilter<"Item"> | string | null
    rarityPct?: FloatNullableWithAggregatesFilter<"Item"> | number | null
    status?: StringNullableWithAggregatesFilter<"Item"> | string | null
    obtainedFrom?: StringNullableWithAggregatesFilter<"Item"> | string | null
    emoji?: StringNullableWithAggregatesFilter<"Item"> | string | null
    officialKeys?: JsonNullableWithAggregatesFilter<"Item">
    officialScrolls?: JsonNullableWithAggregatesFilter<"Item">
    officialVizards?: JsonNullableWithAggregatesFilter<"Item">
    officialDemand?: StringNullableWithAggregatesFilter<"Item"> | string | null
    officialRate?: StringNullableWithAggregatesFilter<"Item"> | string | null
    officialTaxGems?: FloatNullableWithAggregatesFilter<"Item"> | number | null
    officialTaxGold?: FloatNullableWithAggregatesFilter<"Item"> | number | null
    sheet?: StringNullableWithAggregatesFilter<"Item"> | string | null
    existingAmount?: StringNullableWithAggregatesFilter<"Item"> | string | null
    apiValue?: FloatNullableWithAggregatesFilter<"Item"> | number | null
    apiDemand?: IntNullableWithAggregatesFilter<"Item"> | number | null
    apiRateOfChange?: StringNullableWithAggregatesFilter<"Item"> | string | null
    apiPrestige?: IntNullableWithAggregatesFilter<"Item"> | number | null
    apiTaxGems?: FloatNullableWithAggregatesFilter<"Item"> | number | null
    apiTaxGold?: FloatNullableWithAggregatesFilter<"Item"> | number | null
    apiUpdatedAt?: DateTimeNullableWithAggregatesFilter<"Item"> | Date | string | null
    apiId?: StringNullableWithAggregatesFilter<"Item"> | string | null
    source?: StringWithAggregatesFilter<"Item"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
  }

  export type PriceHistoryWhereInput = {
    AND?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    OR?: PriceHistoryWhereInput[]
    NOT?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    id?: IntFilter<"PriceHistory"> | number
    itemId?: StringFilter<"PriceHistory"> | string
    apiValue?: FloatNullableFilter<"PriceHistory"> | number | null
    officialVizards?: FloatNullableFilter<"PriceHistory"> | number | null
    demand?: IntNullableFilter<"PriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"PriceHistory"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }

  export type PriceHistoryOrderByWithRelationInput = {
    id?: SortOrder
    itemId?: SortOrder
    apiValue?: SortOrderInput | SortOrder
    officialVizards?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    item?: ItemOrderByWithRelationInput
  }

  export type PriceHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    itemId_recordedAt?: PriceHistoryItemIdRecordedAtCompoundUniqueInput
    AND?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    OR?: PriceHistoryWhereInput[]
    NOT?: PriceHistoryWhereInput | PriceHistoryWhereInput[]
    itemId?: StringFilter<"PriceHistory"> | string
    apiValue?: FloatNullableFilter<"PriceHistory"> | number | null
    officialVizards?: FloatNullableFilter<"PriceHistory"> | number | null
    demand?: IntNullableFilter<"PriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"PriceHistory"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }, "id" | "itemId_recordedAt">

  export type PriceHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    itemId?: SortOrder
    apiValue?: SortOrderInput | SortOrder
    officialVizards?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    _count?: PriceHistoryCountOrderByAggregateInput
    _avg?: PriceHistoryAvgOrderByAggregateInput
    _max?: PriceHistoryMaxOrderByAggregateInput
    _min?: PriceHistoryMinOrderByAggregateInput
    _sum?: PriceHistorySumOrderByAggregateInput
  }

  export type PriceHistoryScalarWhereWithAggregatesInput = {
    AND?: PriceHistoryScalarWhereWithAggregatesInput | PriceHistoryScalarWhereWithAggregatesInput[]
    OR?: PriceHistoryScalarWhereWithAggregatesInput[]
    NOT?: PriceHistoryScalarWhereWithAggregatesInput | PriceHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PriceHistory"> | number
    itemId?: StringWithAggregatesFilter<"PriceHistory"> | string
    apiValue?: FloatNullableWithAggregatesFilter<"PriceHistory"> | number | null
    officialVizards?: FloatNullableWithAggregatesFilter<"PriceHistory"> | number | null
    demand?: IntNullableWithAggregatesFilter<"PriceHistory"> | number | null
    recordedAt?: DateTimeWithAggregatesFilter<"PriceHistory"> | Date | string
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: IntFilter<"SyncLog"> | number
    source?: StringFilter<"SyncLog"> | string
    status?: StringFilter<"SyncLog"> | string
    rows?: IntNullableFilter<"SyncLog"> | number | null
    error?: StringNullableFilter<"SyncLog"> | string | null
    durationMs?: IntNullableFilter<"SyncLog"> | number | null
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    status?: SortOrder
    rows?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    startedAt?: SortOrder
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    source?: StringFilter<"SyncLog"> | string
    status?: StringFilter<"SyncLog"> | string
    rows?: IntNullableFilter<"SyncLog"> | number | null
    error?: StringNullableFilter<"SyncLog"> | string | null
    durationMs?: IntNullableFilter<"SyncLog"> | number | null
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
  }, "id">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    status?: SortOrder
    rows?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _avg?: SyncLogAvgOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
    _sum?: SyncLogSumOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SyncLog"> | number
    source?: StringWithAggregatesFilter<"SyncLog"> | string
    status?: StringWithAggregatesFilter<"SyncLog"> | string
    rows?: IntNullableWithAggregatesFilter<"SyncLog"> | number | null
    error?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    durationMs?: IntNullableWithAggregatesFilter<"SyncLog"> | number | null
    startedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
  }

  export type RateConfigWhereInput = {
    AND?: RateConfigWhereInput | RateConfigWhereInput[]
    OR?: RateConfigWhereInput[]
    NOT?: RateConfigWhereInput | RateConfigWhereInput[]
    id?: StringFilter<"RateConfig"> | string
    keysPerVizard?: FloatFilter<"RateConfig"> | number
    keysPerScroll?: FloatFilter<"RateConfig"> | number
    updatedAt?: DateTimeFilter<"RateConfig"> | Date | string
  }

  export type RateConfigOrderByWithRelationInput = {
    id?: SortOrder
    keysPerVizard?: SortOrder
    keysPerScroll?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RateConfigWhereInput | RateConfigWhereInput[]
    OR?: RateConfigWhereInput[]
    NOT?: RateConfigWhereInput | RateConfigWhereInput[]
    keysPerVizard?: FloatFilter<"RateConfig"> | number
    keysPerScroll?: FloatFilter<"RateConfig"> | number
    updatedAt?: DateTimeFilter<"RateConfig"> | Date | string
  }, "id">

  export type RateConfigOrderByWithAggregationInput = {
    id?: SortOrder
    keysPerVizard?: SortOrder
    keysPerScroll?: SortOrder
    updatedAt?: SortOrder
    _count?: RateConfigCountOrderByAggregateInput
    _avg?: RateConfigAvgOrderByAggregateInput
    _max?: RateConfigMaxOrderByAggregateInput
    _min?: RateConfigMinOrderByAggregateInput
    _sum?: RateConfigSumOrderByAggregateInput
  }

  export type RateConfigScalarWhereWithAggregatesInput = {
    AND?: RateConfigScalarWhereWithAggregatesInput | RateConfigScalarWhereWithAggregatesInput[]
    OR?: RateConfigScalarWhereWithAggregatesInput[]
    NOT?: RateConfigScalarWhereWithAggregatesInput | RateConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RateConfig"> | string
    keysPerVizard?: FloatWithAggregatesFilter<"RateConfig"> | number
    keysPerScroll?: FloatWithAggregatesFilter<"RateConfig"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"RateConfig"> | Date | string
  }

  export type GuildConfigWhereInput = {
    AND?: GuildConfigWhereInput | GuildConfigWhereInput[]
    OR?: GuildConfigWhereInput[]
    NOT?: GuildConfigWhereInput | GuildConfigWhereInput[]
    id?: StringFilter<"GuildConfig"> | string
    guildId?: StringFilter<"GuildConfig"> | string
    defaultPrefix?: StringFilter<"GuildConfig"> | string
    officialChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    tradeChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    updatedAt?: DateTimeFilter<"GuildConfig"> | Date | string
    channels?: ChannelConfigListRelationFilter
  }

  export type GuildConfigOrderByWithRelationInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrderInput | SortOrder
    tradeChannelId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    channels?: ChannelConfigOrderByRelationAggregateInput
  }

  export type GuildConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    guildId?: string
    AND?: GuildConfigWhereInput | GuildConfigWhereInput[]
    OR?: GuildConfigWhereInput[]
    NOT?: GuildConfigWhereInput | GuildConfigWhereInput[]
    defaultPrefix?: StringFilter<"GuildConfig"> | string
    officialChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    tradeChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    updatedAt?: DateTimeFilter<"GuildConfig"> | Date | string
    channels?: ChannelConfigListRelationFilter
  }, "id" | "guildId">

  export type GuildConfigOrderByWithAggregationInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrderInput | SortOrder
    tradeChannelId?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: GuildConfigCountOrderByAggregateInput
    _max?: GuildConfigMaxOrderByAggregateInput
    _min?: GuildConfigMinOrderByAggregateInput
  }

  export type GuildConfigScalarWhereWithAggregatesInput = {
    AND?: GuildConfigScalarWhereWithAggregatesInput | GuildConfigScalarWhereWithAggregatesInput[]
    OR?: GuildConfigScalarWhereWithAggregatesInput[]
    NOT?: GuildConfigScalarWhereWithAggregatesInput | GuildConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GuildConfig"> | string
    guildId?: StringWithAggregatesFilter<"GuildConfig"> | string
    defaultPrefix?: StringWithAggregatesFilter<"GuildConfig"> | string
    officialChannelId?: StringNullableWithAggregatesFilter<"GuildConfig"> | string | null
    tradeChannelId?: StringNullableWithAggregatesFilter<"GuildConfig"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"GuildConfig"> | Date | string
  }

  export type ChannelConfigWhereInput = {
    AND?: ChannelConfigWhereInput | ChannelConfigWhereInput[]
    OR?: ChannelConfigWhereInput[]
    NOT?: ChannelConfigWhereInput | ChannelConfigWhereInput[]
    id?: StringFilter<"ChannelConfig"> | string
    guildId?: StringFilter<"ChannelConfig"> | string
    channelId?: StringFilter<"ChannelConfig"> | string
    role?: StringNullableFilter<"ChannelConfig"> | string | null
    prefix?: StringNullableFilter<"ChannelConfig"> | string | null
    guild?: XOR<GuildConfigRelationFilter, GuildConfigWhereInput>
  }

  export type ChannelConfigOrderByWithRelationInput = {
    id?: SortOrder
    guildId?: SortOrder
    channelId?: SortOrder
    role?: SortOrderInput | SortOrder
    prefix?: SortOrderInput | SortOrder
    guild?: GuildConfigOrderByWithRelationInput
  }

  export type ChannelConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    guildId_channelId?: ChannelConfigGuildIdChannelIdCompoundUniqueInput
    AND?: ChannelConfigWhereInput | ChannelConfigWhereInput[]
    OR?: ChannelConfigWhereInput[]
    NOT?: ChannelConfigWhereInput | ChannelConfigWhereInput[]
    guildId?: StringFilter<"ChannelConfig"> | string
    channelId?: StringFilter<"ChannelConfig"> | string
    role?: StringNullableFilter<"ChannelConfig"> | string | null
    prefix?: StringNullableFilter<"ChannelConfig"> | string | null
    guild?: XOR<GuildConfigRelationFilter, GuildConfigWhereInput>
  }, "id" | "guildId_channelId">

  export type ChannelConfigOrderByWithAggregationInput = {
    id?: SortOrder
    guildId?: SortOrder
    channelId?: SortOrder
    role?: SortOrderInput | SortOrder
    prefix?: SortOrderInput | SortOrder
    _count?: ChannelConfigCountOrderByAggregateInput
    _max?: ChannelConfigMaxOrderByAggregateInput
    _min?: ChannelConfigMinOrderByAggregateInput
  }

  export type ChannelConfigScalarWhereWithAggregatesInput = {
    AND?: ChannelConfigScalarWhereWithAggregatesInput | ChannelConfigScalarWhereWithAggregatesInput[]
    OR?: ChannelConfigScalarWhereWithAggregatesInput[]
    NOT?: ChannelConfigScalarWhereWithAggregatesInput | ChannelConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChannelConfig"> | string
    guildId?: StringWithAggregatesFilter<"ChannelConfig"> | string
    channelId?: StringWithAggregatesFilter<"ChannelConfig"> | string
    role?: StringNullableWithAggregatesFilter<"ChannelConfig"> | string | null
    prefix?: StringNullableWithAggregatesFilter<"ChannelConfig"> | string | null
  }

  export type ItemCreateInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    rarityPct?: number | null
    status?: string | null
    obtainedFrom?: string | null
    emoji?: string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: string | null
    officialRate?: string | null
    officialTaxGems?: number | null
    officialTaxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    apiValue?: number | null
    apiDemand?: number | null
    apiRateOfChange?: string | null
    apiPrestige?: number | null
    apiTaxGems?: number | null
    apiTaxGold?: number | null
    apiUpdatedAt?: Date | string | null
    apiId?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    history?: PriceHistoryCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    rarityPct?: number | null
    status?: string | null
    obtainedFrom?: string | null
    emoji?: string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: string | null
    officialRate?: string | null
    officialTaxGems?: number | null
    officialTaxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    apiValue?: number | null
    apiDemand?: number | null
    apiRateOfChange?: string | null
    apiPrestige?: number | null
    apiTaxGems?: number | null
    apiTaxGold?: number | null
    apiUpdatedAt?: Date | string | null
    apiId?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    history?: PriceHistoryUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: NullableStringFieldUpdateOperationsInput | string | null
    officialRate?: NullableStringFieldUpdateOperationsInput | string | null
    officialTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    officialTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    apiDemand?: NullableIntFieldUpdateOperationsInput | number | null
    apiRateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    apiPrestige?: NullableIntFieldUpdateOperationsInput | number | null
    apiTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    apiTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: PriceHistoryUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: NullableStringFieldUpdateOperationsInput | string | null
    officialRate?: NullableStringFieldUpdateOperationsInput | string | null
    officialTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    officialTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    apiDemand?: NullableIntFieldUpdateOperationsInput | number | null
    apiRateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    apiPrestige?: NullableIntFieldUpdateOperationsInput | number | null
    apiTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    apiTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: PriceHistoryUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    rarityPct?: number | null
    status?: string | null
    obtainedFrom?: string | null
    emoji?: string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: string | null
    officialRate?: string | null
    officialTaxGems?: number | null
    officialTaxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    apiValue?: number | null
    apiDemand?: number | null
    apiRateOfChange?: string | null
    apiPrestige?: number | null
    apiTaxGems?: number | null
    apiTaxGold?: number | null
    apiUpdatedAt?: Date | string | null
    apiId?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: NullableStringFieldUpdateOperationsInput | string | null
    officialRate?: NullableStringFieldUpdateOperationsInput | string | null
    officialTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    officialTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    apiDemand?: NullableIntFieldUpdateOperationsInput | number | null
    apiRateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    apiPrestige?: NullableIntFieldUpdateOperationsInput | number | null
    apiTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    apiTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: NullableStringFieldUpdateOperationsInput | string | null
    officialRate?: NullableStringFieldUpdateOperationsInput | string | null
    officialTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    officialTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    apiDemand?: NullableIntFieldUpdateOperationsInput | number | null
    apiRateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    apiPrestige?: NullableIntFieldUpdateOperationsInput | number | null
    apiTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    apiTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryCreateInput = {
    apiValue?: number | null
    officialVizards?: number | null
    demand?: number | null
    recordedAt?: Date | string
    item: ItemCreateNestedOneWithoutHistoryInput
  }

  export type PriceHistoryUncheckedCreateInput = {
    id?: number
    itemId: string
    apiValue?: number | null
    officialVizards?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type PriceHistoryUpdateInput = {
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    officialVizards?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type PriceHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: StringFieldUpdateOperationsInput | string
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    officialVizards?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryCreateManyInput = {
    id?: number
    itemId: string
    apiValue?: number | null
    officialVizards?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type PriceHistoryUpdateManyMutationInput = {
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    officialVizards?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: StringFieldUpdateOperationsInput | string
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    officialVizards?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateInput = {
    source: string
    status: string
    rows?: number | null
    error?: string | null
    durationMs?: number | null
    startedAt?: Date | string
  }

  export type SyncLogUncheckedCreateInput = {
    id?: number
    source: string
    status: string
    rows?: number | null
    error?: string | null
    durationMs?: number | null
    startedAt?: Date | string
  }

  export type SyncLogUpdateInput = {
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateManyInput = {
    id?: number
    source: string
    status: string
    rows?: number | null
    error?: string | null
    durationMs?: number | null
    startedAt?: Date | string
  }

  export type SyncLogUpdateManyMutationInput = {
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateConfigCreateInput = {
    id?: string
    keysPerVizard?: number
    keysPerScroll?: number
    updatedAt?: Date | string
  }

  export type RateConfigUncheckedCreateInput = {
    id?: string
    keysPerVizard?: number
    keysPerScroll?: number
    updatedAt?: Date | string
  }

  export type RateConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keysPerVizard?: FloatFieldUpdateOperationsInput | number
    keysPerScroll?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keysPerVizard?: FloatFieldUpdateOperationsInput | number
    keysPerScroll?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateConfigCreateManyInput = {
    id?: string
    keysPerVizard?: number
    keysPerScroll?: number
    updatedAt?: Date | string
  }

  export type RateConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    keysPerVizard?: FloatFieldUpdateOperationsInput | number
    keysPerScroll?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    keysPerVizard?: FloatFieldUpdateOperationsInput | number
    keysPerScroll?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildConfigCreateInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    updatedAt?: Date | string
    channels?: ChannelConfigCreateNestedManyWithoutGuildInput
  }

  export type GuildConfigUncheckedCreateInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    updatedAt?: Date | string
    channels?: ChannelConfigUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelConfigUpdateManyWithoutGuildNestedInput
  }

  export type GuildConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelConfigUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type GuildConfigCreateManyInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    updatedAt?: Date | string
  }

  export type GuildConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelConfigCreateInput = {
    id?: string
    channelId: string
    role?: string | null
    prefix?: string | null
    guild: GuildConfigCreateNestedOneWithoutChannelsInput
  }

  export type ChannelConfigUncheckedCreateInput = {
    id?: string
    guildId: string
    channelId: string
    role?: string | null
    prefix?: string | null
  }

  export type ChannelConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
    guild?: GuildConfigUpdateOneRequiredWithoutChannelsNestedInput
  }

  export type ChannelConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChannelConfigCreateManyInput = {
    id?: string
    guildId: string
    channelId: string
    role?: string | null
    prefix?: string | null
  }

  export type ChannelConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChannelConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PriceHistoryListRelationFilter = {
    every?: PriceHistoryWhereInput
    some?: PriceHistoryWhereInput
    none?: PriceHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PriceHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityLabel?: SortOrder
    rarityPct?: SortOrder
    status?: SortOrder
    obtainedFrom?: SortOrder
    emoji?: SortOrder
    officialKeys?: SortOrder
    officialScrolls?: SortOrder
    officialVizards?: SortOrder
    officialDemand?: SortOrder
    officialRate?: SortOrder
    officialTaxGems?: SortOrder
    officialTaxGold?: SortOrder
    sheet?: SortOrder
    existingAmount?: SortOrder
    apiValue?: SortOrder
    apiDemand?: SortOrder
    apiRateOfChange?: SortOrder
    apiPrestige?: SortOrder
    apiTaxGems?: SortOrder
    apiTaxGold?: SortOrder
    apiUpdatedAt?: SortOrder
    apiId?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    rarityPct?: SortOrder
    officialTaxGems?: SortOrder
    officialTaxGold?: SortOrder
    apiValue?: SortOrder
    apiDemand?: SortOrder
    apiPrestige?: SortOrder
    apiTaxGems?: SortOrder
    apiTaxGold?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityLabel?: SortOrder
    rarityPct?: SortOrder
    status?: SortOrder
    obtainedFrom?: SortOrder
    emoji?: SortOrder
    officialDemand?: SortOrder
    officialRate?: SortOrder
    officialTaxGems?: SortOrder
    officialTaxGold?: SortOrder
    sheet?: SortOrder
    existingAmount?: SortOrder
    apiValue?: SortOrder
    apiDemand?: SortOrder
    apiRateOfChange?: SortOrder
    apiPrestige?: SortOrder
    apiTaxGems?: SortOrder
    apiTaxGold?: SortOrder
    apiUpdatedAt?: SortOrder
    apiId?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityLabel?: SortOrder
    rarityPct?: SortOrder
    status?: SortOrder
    obtainedFrom?: SortOrder
    emoji?: SortOrder
    officialDemand?: SortOrder
    officialRate?: SortOrder
    officialTaxGems?: SortOrder
    officialTaxGold?: SortOrder
    sheet?: SortOrder
    existingAmount?: SortOrder
    apiValue?: SortOrder
    apiDemand?: SortOrder
    apiRateOfChange?: SortOrder
    apiPrestige?: SortOrder
    apiTaxGems?: SortOrder
    apiTaxGold?: SortOrder
    apiUpdatedAt?: SortOrder
    apiId?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    rarityPct?: SortOrder
    officialTaxGems?: SortOrder
    officialTaxGold?: SortOrder
    apiValue?: SortOrder
    apiDemand?: SortOrder
    apiPrestige?: SortOrder
    apiTaxGems?: SortOrder
    apiTaxGold?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ItemRelationFilter = {
    is?: ItemWhereInput
    isNot?: ItemWhereInput
  }

  export type PriceHistoryItemIdRecordedAtCompoundUniqueInput = {
    itemId: string
    recordedAt: Date | string
  }

  export type PriceHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    apiValue?: SortOrder
    officialVizards?: SortOrder
    demand?: SortOrder
    recordedAt?: SortOrder
  }

  export type PriceHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    apiValue?: SortOrder
    officialVizards?: SortOrder
    demand?: SortOrder
  }

  export type PriceHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    apiValue?: SortOrder
    officialVizards?: SortOrder
    demand?: SortOrder
    recordedAt?: SortOrder
  }

  export type PriceHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    apiValue?: SortOrder
    officialVizards?: SortOrder
    demand?: SortOrder
    recordedAt?: SortOrder
  }

  export type PriceHistorySumOrderByAggregateInput = {
    id?: SortOrder
    apiValue?: SortOrder
    officialVizards?: SortOrder
    demand?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    status?: SortOrder
    rows?: SortOrder
    error?: SortOrder
    durationMs?: SortOrder
    startedAt?: SortOrder
  }

  export type SyncLogAvgOrderByAggregateInput = {
    id?: SortOrder
    rows?: SortOrder
    durationMs?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    status?: SortOrder
    rows?: SortOrder
    error?: SortOrder
    durationMs?: SortOrder
    startedAt?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    status?: SortOrder
    rows?: SortOrder
    error?: SortOrder
    durationMs?: SortOrder
    startedAt?: SortOrder
  }

  export type SyncLogSumOrderByAggregateInput = {
    id?: SortOrder
    rows?: SortOrder
    durationMs?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RateConfigCountOrderByAggregateInput = {
    id?: SortOrder
    keysPerVizard?: SortOrder
    keysPerScroll?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateConfigAvgOrderByAggregateInput = {
    keysPerVizard?: SortOrder
    keysPerScroll?: SortOrder
  }

  export type RateConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    keysPerVizard?: SortOrder
    keysPerScroll?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateConfigMinOrderByAggregateInput = {
    id?: SortOrder
    keysPerVizard?: SortOrder
    keysPerScroll?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateConfigSumOrderByAggregateInput = {
    keysPerVizard?: SortOrder
    keysPerScroll?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ChannelConfigListRelationFilter = {
    every?: ChannelConfigWhereInput
    some?: ChannelConfigWhereInput
    none?: ChannelConfigWhereInput
  }

  export type ChannelConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GuildConfigCountOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrder
    tradeChannelId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuildConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrder
    tradeChannelId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuildConfigMinOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrder
    tradeChannelId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuildConfigRelationFilter = {
    is?: GuildConfigWhereInput
    isNot?: GuildConfigWhereInput
  }

  export type ChannelConfigGuildIdChannelIdCompoundUniqueInput = {
    guildId: string
    channelId: string
  }

  export type ChannelConfigCountOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    channelId?: SortOrder
    role?: SortOrder
    prefix?: SortOrder
  }

  export type ChannelConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    channelId?: SortOrder
    role?: SortOrder
    prefix?: SortOrder
  }

  export type ChannelConfigMinOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    channelId?: SortOrder
    role?: SortOrder
    prefix?: SortOrder
  }

  export type PriceHistoryCreateNestedManyWithoutItemInput = {
    create?: XOR<PriceHistoryCreateWithoutItemInput, PriceHistoryUncheckedCreateWithoutItemInput> | PriceHistoryCreateWithoutItemInput[] | PriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutItemInput | PriceHistoryCreateOrConnectWithoutItemInput[]
    createMany?: PriceHistoryCreateManyItemInputEnvelope
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
  }

  export type PriceHistoryUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<PriceHistoryCreateWithoutItemInput, PriceHistoryUncheckedCreateWithoutItemInput> | PriceHistoryCreateWithoutItemInput[] | PriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutItemInput | PriceHistoryCreateOrConnectWithoutItemInput[]
    createMany?: PriceHistoryCreateManyItemInputEnvelope
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PriceHistoryUpdateManyWithoutItemNestedInput = {
    create?: XOR<PriceHistoryCreateWithoutItemInput, PriceHistoryUncheckedCreateWithoutItemInput> | PriceHistoryCreateWithoutItemInput[] | PriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutItemInput | PriceHistoryCreateOrConnectWithoutItemInput[]
    upsert?: PriceHistoryUpsertWithWhereUniqueWithoutItemInput | PriceHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: PriceHistoryCreateManyItemInputEnvelope
    set?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    disconnect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    delete?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    update?: PriceHistoryUpdateWithWhereUniqueWithoutItemInput | PriceHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: PriceHistoryUpdateManyWithWhereWithoutItemInput | PriceHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
  }

  export type PriceHistoryUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<PriceHistoryCreateWithoutItemInput, PriceHistoryUncheckedCreateWithoutItemInput> | PriceHistoryCreateWithoutItemInput[] | PriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: PriceHistoryCreateOrConnectWithoutItemInput | PriceHistoryCreateOrConnectWithoutItemInput[]
    upsert?: PriceHistoryUpsertWithWhereUniqueWithoutItemInput | PriceHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: PriceHistoryCreateManyItemInputEnvelope
    set?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    disconnect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    delete?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    connect?: PriceHistoryWhereUniqueInput | PriceHistoryWhereUniqueInput[]
    update?: PriceHistoryUpdateWithWhereUniqueWithoutItemInput | PriceHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: PriceHistoryUpdateManyWithWhereWithoutItemInput | PriceHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
  }

  export type ItemCreateNestedOneWithoutHistoryInput = {
    create?: XOR<ItemCreateWithoutHistoryInput, ItemUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: ItemCreateOrConnectWithoutHistoryInput
    connect?: ItemWhereUniqueInput
  }

  export type ItemUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<ItemCreateWithoutHistoryInput, ItemUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: ItemCreateOrConnectWithoutHistoryInput
    upsert?: ItemUpsertWithoutHistoryInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutHistoryInput, ItemUpdateWithoutHistoryInput>, ItemUncheckedUpdateWithoutHistoryInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChannelConfigCreateNestedManyWithoutGuildInput = {
    create?: XOR<ChannelConfigCreateWithoutGuildInput, ChannelConfigUncheckedCreateWithoutGuildInput> | ChannelConfigCreateWithoutGuildInput[] | ChannelConfigUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: ChannelConfigCreateOrConnectWithoutGuildInput | ChannelConfigCreateOrConnectWithoutGuildInput[]
    createMany?: ChannelConfigCreateManyGuildInputEnvelope
    connect?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
  }

  export type ChannelConfigUncheckedCreateNestedManyWithoutGuildInput = {
    create?: XOR<ChannelConfigCreateWithoutGuildInput, ChannelConfigUncheckedCreateWithoutGuildInput> | ChannelConfigCreateWithoutGuildInput[] | ChannelConfigUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: ChannelConfigCreateOrConnectWithoutGuildInput | ChannelConfigCreateOrConnectWithoutGuildInput[]
    createMany?: ChannelConfigCreateManyGuildInputEnvelope
    connect?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
  }

  export type ChannelConfigUpdateManyWithoutGuildNestedInput = {
    create?: XOR<ChannelConfigCreateWithoutGuildInput, ChannelConfigUncheckedCreateWithoutGuildInput> | ChannelConfigCreateWithoutGuildInput[] | ChannelConfigUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: ChannelConfigCreateOrConnectWithoutGuildInput | ChannelConfigCreateOrConnectWithoutGuildInput[]
    upsert?: ChannelConfigUpsertWithWhereUniqueWithoutGuildInput | ChannelConfigUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: ChannelConfigCreateManyGuildInputEnvelope
    set?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    disconnect?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    delete?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    connect?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    update?: ChannelConfigUpdateWithWhereUniqueWithoutGuildInput | ChannelConfigUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: ChannelConfigUpdateManyWithWhereWithoutGuildInput | ChannelConfigUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: ChannelConfigScalarWhereInput | ChannelConfigScalarWhereInput[]
  }

  export type ChannelConfigUncheckedUpdateManyWithoutGuildNestedInput = {
    create?: XOR<ChannelConfigCreateWithoutGuildInput, ChannelConfigUncheckedCreateWithoutGuildInput> | ChannelConfigCreateWithoutGuildInput[] | ChannelConfigUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: ChannelConfigCreateOrConnectWithoutGuildInput | ChannelConfigCreateOrConnectWithoutGuildInput[]
    upsert?: ChannelConfigUpsertWithWhereUniqueWithoutGuildInput | ChannelConfigUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: ChannelConfigCreateManyGuildInputEnvelope
    set?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    disconnect?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    delete?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    connect?: ChannelConfigWhereUniqueInput | ChannelConfigWhereUniqueInput[]
    update?: ChannelConfigUpdateWithWhereUniqueWithoutGuildInput | ChannelConfigUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: ChannelConfigUpdateManyWithWhereWithoutGuildInput | ChannelConfigUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: ChannelConfigScalarWhereInput | ChannelConfigScalarWhereInput[]
  }

  export type GuildConfigCreateNestedOneWithoutChannelsInput = {
    create?: XOR<GuildConfigCreateWithoutChannelsInput, GuildConfigUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: GuildConfigCreateOrConnectWithoutChannelsInput
    connect?: GuildConfigWhereUniqueInput
  }

  export type GuildConfigUpdateOneRequiredWithoutChannelsNestedInput = {
    create?: XOR<GuildConfigCreateWithoutChannelsInput, GuildConfigUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: GuildConfigCreateOrConnectWithoutChannelsInput
    upsert?: GuildConfigUpsertWithoutChannelsInput
    connect?: GuildConfigWhereUniqueInput
    update?: XOR<XOR<GuildConfigUpdateToOneWithWhereWithoutChannelsInput, GuildConfigUpdateWithoutChannelsInput>, GuildConfigUncheckedUpdateWithoutChannelsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PriceHistoryCreateWithoutItemInput = {
    apiValue?: number | null
    officialVizards?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type PriceHistoryUncheckedCreateWithoutItemInput = {
    id?: number
    apiValue?: number | null
    officialVizards?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type PriceHistoryCreateOrConnectWithoutItemInput = {
    where: PriceHistoryWhereUniqueInput
    create: XOR<PriceHistoryCreateWithoutItemInput, PriceHistoryUncheckedCreateWithoutItemInput>
  }

  export type PriceHistoryCreateManyItemInputEnvelope = {
    data: PriceHistoryCreateManyItemInput | PriceHistoryCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type PriceHistoryUpsertWithWhereUniqueWithoutItemInput = {
    where: PriceHistoryWhereUniqueInput
    update: XOR<PriceHistoryUpdateWithoutItemInput, PriceHistoryUncheckedUpdateWithoutItemInput>
    create: XOR<PriceHistoryCreateWithoutItemInput, PriceHistoryUncheckedCreateWithoutItemInput>
  }

  export type PriceHistoryUpdateWithWhereUniqueWithoutItemInput = {
    where: PriceHistoryWhereUniqueInput
    data: XOR<PriceHistoryUpdateWithoutItemInput, PriceHistoryUncheckedUpdateWithoutItemInput>
  }

  export type PriceHistoryUpdateManyWithWhereWithoutItemInput = {
    where: PriceHistoryScalarWhereInput
    data: XOR<PriceHistoryUpdateManyMutationInput, PriceHistoryUncheckedUpdateManyWithoutItemInput>
  }

  export type PriceHistoryScalarWhereInput = {
    AND?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
    OR?: PriceHistoryScalarWhereInput[]
    NOT?: PriceHistoryScalarWhereInput | PriceHistoryScalarWhereInput[]
    id?: IntFilter<"PriceHistory"> | number
    itemId?: StringFilter<"PriceHistory"> | string
    apiValue?: FloatNullableFilter<"PriceHistory"> | number | null
    officialVizards?: FloatNullableFilter<"PriceHistory"> | number | null
    demand?: IntNullableFilter<"PriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"PriceHistory"> | Date | string
  }

  export type ItemCreateWithoutHistoryInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    rarityPct?: number | null
    status?: string | null
    obtainedFrom?: string | null
    emoji?: string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: string | null
    officialRate?: string | null
    officialTaxGems?: number | null
    officialTaxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    apiValue?: number | null
    apiDemand?: number | null
    apiRateOfChange?: string | null
    apiPrestige?: number | null
    apiTaxGems?: number | null
    apiTaxGold?: number | null
    apiUpdatedAt?: Date | string | null
    apiId?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUncheckedCreateWithoutHistoryInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    rarityPct?: number | null
    status?: string | null
    obtainedFrom?: string | null
    emoji?: string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: string | null
    officialRate?: string | null
    officialTaxGems?: number | null
    officialTaxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    apiValue?: number | null
    apiDemand?: number | null
    apiRateOfChange?: string | null
    apiPrestige?: number | null
    apiTaxGems?: number | null
    apiTaxGold?: number | null
    apiUpdatedAt?: Date | string | null
    apiId?: string | null
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateOrConnectWithoutHistoryInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutHistoryInput, ItemUncheckedCreateWithoutHistoryInput>
  }

  export type ItemUpsertWithoutHistoryInput = {
    update: XOR<ItemUpdateWithoutHistoryInput, ItemUncheckedUpdateWithoutHistoryInput>
    create: XOR<ItemCreateWithoutHistoryInput, ItemUncheckedCreateWithoutHistoryInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutHistoryInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutHistoryInput, ItemUncheckedUpdateWithoutHistoryInput>
  }

  export type ItemUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: NullableStringFieldUpdateOperationsInput | string | null
    officialRate?: NullableStringFieldUpdateOperationsInput | string | null
    officialTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    officialTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    apiDemand?: NullableIntFieldUpdateOperationsInput | number | null
    apiRateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    apiPrestige?: NullableIntFieldUpdateOperationsInput | number | null
    apiTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    apiTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    officialKeys?: NullableJsonNullValueInput | InputJsonValue
    officialScrolls?: NullableJsonNullValueInput | InputJsonValue
    officialVizards?: NullableJsonNullValueInput | InputJsonValue
    officialDemand?: NullableStringFieldUpdateOperationsInput | string | null
    officialRate?: NullableStringFieldUpdateOperationsInput | string | null
    officialTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    officialTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    apiDemand?: NullableIntFieldUpdateOperationsInput | number | null
    apiRateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    apiPrestige?: NullableIntFieldUpdateOperationsInput | number | null
    apiTaxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    apiTaxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelConfigCreateWithoutGuildInput = {
    id?: string
    channelId: string
    role?: string | null
    prefix?: string | null
  }

  export type ChannelConfigUncheckedCreateWithoutGuildInput = {
    id?: string
    channelId: string
    role?: string | null
    prefix?: string | null
  }

  export type ChannelConfigCreateOrConnectWithoutGuildInput = {
    where: ChannelConfigWhereUniqueInput
    create: XOR<ChannelConfigCreateWithoutGuildInput, ChannelConfigUncheckedCreateWithoutGuildInput>
  }

  export type ChannelConfigCreateManyGuildInputEnvelope = {
    data: ChannelConfigCreateManyGuildInput | ChannelConfigCreateManyGuildInput[]
    skipDuplicates?: boolean
  }

  export type ChannelConfigUpsertWithWhereUniqueWithoutGuildInput = {
    where: ChannelConfigWhereUniqueInput
    update: XOR<ChannelConfigUpdateWithoutGuildInput, ChannelConfigUncheckedUpdateWithoutGuildInput>
    create: XOR<ChannelConfigCreateWithoutGuildInput, ChannelConfigUncheckedCreateWithoutGuildInput>
  }

  export type ChannelConfigUpdateWithWhereUniqueWithoutGuildInput = {
    where: ChannelConfigWhereUniqueInput
    data: XOR<ChannelConfigUpdateWithoutGuildInput, ChannelConfigUncheckedUpdateWithoutGuildInput>
  }

  export type ChannelConfigUpdateManyWithWhereWithoutGuildInput = {
    where: ChannelConfigScalarWhereInput
    data: XOR<ChannelConfigUpdateManyMutationInput, ChannelConfigUncheckedUpdateManyWithoutGuildInput>
  }

  export type ChannelConfigScalarWhereInput = {
    AND?: ChannelConfigScalarWhereInput | ChannelConfigScalarWhereInput[]
    OR?: ChannelConfigScalarWhereInput[]
    NOT?: ChannelConfigScalarWhereInput | ChannelConfigScalarWhereInput[]
    id?: StringFilter<"ChannelConfig"> | string
    guildId?: StringFilter<"ChannelConfig"> | string
    channelId?: StringFilter<"ChannelConfig"> | string
    role?: StringNullableFilter<"ChannelConfig"> | string | null
    prefix?: StringNullableFilter<"ChannelConfig"> | string | null
  }

  export type GuildConfigCreateWithoutChannelsInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    updatedAt?: Date | string
  }

  export type GuildConfigUncheckedCreateWithoutChannelsInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    updatedAt?: Date | string
  }

  export type GuildConfigCreateOrConnectWithoutChannelsInput = {
    where: GuildConfigWhereUniqueInput
    create: XOR<GuildConfigCreateWithoutChannelsInput, GuildConfigUncheckedCreateWithoutChannelsInput>
  }

  export type GuildConfigUpsertWithoutChannelsInput = {
    update: XOR<GuildConfigUpdateWithoutChannelsInput, GuildConfigUncheckedUpdateWithoutChannelsInput>
    create: XOR<GuildConfigCreateWithoutChannelsInput, GuildConfigUncheckedCreateWithoutChannelsInput>
    where?: GuildConfigWhereInput
  }

  export type GuildConfigUpdateToOneWithWhereWithoutChannelsInput = {
    where?: GuildConfigWhereInput
    data: XOR<GuildConfigUpdateWithoutChannelsInput, GuildConfigUncheckedUpdateWithoutChannelsInput>
  }

  export type GuildConfigUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildConfigUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryCreateManyItemInput = {
    id?: number
    apiValue?: number | null
    officialVizards?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type PriceHistoryUpdateWithoutItemInput = {
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    officialVizards?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    officialVizards?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceHistoryUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    apiValue?: NullableFloatFieldUpdateOperationsInput | number | null
    officialVizards?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelConfigCreateManyGuildInput = {
    id?: string
    channelId: string
    role?: string | null
    prefix?: string | null
  }

  export type ChannelConfigUpdateWithoutGuildInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChannelConfigUncheckedUpdateWithoutGuildInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChannelConfigUncheckedUpdateManyWithoutGuildInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    prefix?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ItemCountOutputTypeDefaultArgs instead
     */
    export type ItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GuildConfigCountOutputTypeDefaultArgs instead
     */
    export type GuildConfigCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GuildConfigCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ItemDefaultArgs instead
     */
    export type ItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PriceHistoryDefaultArgs instead
     */
    export type PriceHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PriceHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SyncLogDefaultArgs instead
     */
    export type SyncLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SyncLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RateConfigDefaultArgs instead
     */
    export type RateConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RateConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GuildConfigDefaultArgs instead
     */
    export type GuildConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GuildConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChannelConfigDefaultArgs instead
     */
    export type ChannelConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChannelConfigDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}