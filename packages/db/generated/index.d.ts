
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
 * Model OfficialPrice
 * 
 */
export type OfficialPrice = $Result.DefaultSelection<Prisma.$OfficialPricePayload>
/**
 * Model OfficialPriceHistory
 * 
 */
export type OfficialPriceHistory = $Result.DefaultSelection<Prisma.$OfficialPriceHistoryPayload>
/**
 * Model TradePrice
 * 
 */
export type TradePrice = $Result.DefaultSelection<Prisma.$TradePricePayload>
/**
 * Model TradePriceHistory
 * 
 */
export type TradePriceHistory = $Result.DefaultSelection<Prisma.$TradePriceHistoryPayload>
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
 * // Fetch zero or more OfficialPrices
 * const officialPrices = await prisma.officialPrice.findMany()
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
   * // Fetch zero or more OfficialPrices
   * const officialPrices = await prisma.officialPrice.findMany()
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
   * `prisma.officialPrice`: Exposes CRUD operations for the **OfficialPrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfficialPrices
    * const officialPrices = await prisma.officialPrice.findMany()
    * ```
    */
  get officialPrice(): Prisma.OfficialPriceDelegate<ExtArgs>;

  /**
   * `prisma.officialPriceHistory`: Exposes CRUD operations for the **OfficialPriceHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfficialPriceHistories
    * const officialPriceHistories = await prisma.officialPriceHistory.findMany()
    * ```
    */
  get officialPriceHistory(): Prisma.OfficialPriceHistoryDelegate<ExtArgs>;

  /**
   * `prisma.tradePrice`: Exposes CRUD operations for the **TradePrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradePrices
    * const tradePrices = await prisma.tradePrice.findMany()
    * ```
    */
  get tradePrice(): Prisma.TradePriceDelegate<ExtArgs>;

  /**
   * `prisma.tradePriceHistory`: Exposes CRUD operations for the **TradePriceHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradePriceHistories
    * const tradePriceHistories = await prisma.tradePriceHistory.findMany()
    * ```
    */
  get tradePriceHistory(): Prisma.TradePriceHistoryDelegate<ExtArgs>;

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
    OfficialPrice: 'OfficialPrice',
    OfficialPriceHistory: 'OfficialPriceHistory',
    TradePrice: 'TradePrice',
    TradePriceHistory: 'TradePriceHistory',
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
      modelProps: "officialPrice" | "officialPriceHistory" | "tradePrice" | "tradePriceHistory" | "syncLog" | "rateConfig" | "guildConfig" | "channelConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      OfficialPrice: {
        payload: Prisma.$OfficialPricePayload<ExtArgs>
        fields: Prisma.OfficialPriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfficialPriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfficialPriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>
          }
          findFirst: {
            args: Prisma.OfficialPriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfficialPriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>
          }
          findMany: {
            args: Prisma.OfficialPriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>[]
          }
          create: {
            args: Prisma.OfficialPriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>
          }
          createMany: {
            args: Prisma.OfficialPriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfficialPriceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>[]
          }
          delete: {
            args: Prisma.OfficialPriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>
          }
          update: {
            args: Prisma.OfficialPriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>
          }
          deleteMany: {
            args: Prisma.OfficialPriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfficialPriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OfficialPriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPricePayload>
          }
          aggregate: {
            args: Prisma.OfficialPriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfficialPrice>
          }
          groupBy: {
            args: Prisma.OfficialPriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfficialPriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfficialPriceCountArgs<ExtArgs>
            result: $Utils.Optional<OfficialPriceCountAggregateOutputType> | number
          }
        }
      }
      OfficialPriceHistory: {
        payload: Prisma.$OfficialPriceHistoryPayload<ExtArgs>
        fields: Prisma.OfficialPriceHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfficialPriceHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfficialPriceHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>
          }
          findFirst: {
            args: Prisma.OfficialPriceHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfficialPriceHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>
          }
          findMany: {
            args: Prisma.OfficialPriceHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>[]
          }
          create: {
            args: Prisma.OfficialPriceHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>
          }
          createMany: {
            args: Prisma.OfficialPriceHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfficialPriceHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>[]
          }
          delete: {
            args: Prisma.OfficialPriceHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>
          }
          update: {
            args: Prisma.OfficialPriceHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>
          }
          deleteMany: {
            args: Prisma.OfficialPriceHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfficialPriceHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OfficialPriceHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficialPriceHistoryPayload>
          }
          aggregate: {
            args: Prisma.OfficialPriceHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfficialPriceHistory>
          }
          groupBy: {
            args: Prisma.OfficialPriceHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfficialPriceHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfficialPriceHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<OfficialPriceHistoryCountAggregateOutputType> | number
          }
        }
      }
      TradePrice: {
        payload: Prisma.$TradePricePayload<ExtArgs>
        fields: Prisma.TradePriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradePriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradePriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>
          }
          findFirst: {
            args: Prisma.TradePriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradePriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>
          }
          findMany: {
            args: Prisma.TradePriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>[]
          }
          create: {
            args: Prisma.TradePriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>
          }
          createMany: {
            args: Prisma.TradePriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradePriceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>[]
          }
          delete: {
            args: Prisma.TradePriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>
          }
          update: {
            args: Prisma.TradePriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>
          }
          deleteMany: {
            args: Prisma.TradePriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradePriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TradePriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePricePayload>
          }
          aggregate: {
            args: Prisma.TradePriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradePrice>
          }
          groupBy: {
            args: Prisma.TradePriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradePriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradePriceCountArgs<ExtArgs>
            result: $Utils.Optional<TradePriceCountAggregateOutputType> | number
          }
        }
      }
      TradePriceHistory: {
        payload: Prisma.$TradePriceHistoryPayload<ExtArgs>
        fields: Prisma.TradePriceHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradePriceHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradePriceHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>
          }
          findFirst: {
            args: Prisma.TradePriceHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradePriceHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>
          }
          findMany: {
            args: Prisma.TradePriceHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>[]
          }
          create: {
            args: Prisma.TradePriceHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>
          }
          createMany: {
            args: Prisma.TradePriceHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradePriceHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>[]
          }
          delete: {
            args: Prisma.TradePriceHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>
          }
          update: {
            args: Prisma.TradePriceHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>
          }
          deleteMany: {
            args: Prisma.TradePriceHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradePriceHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TradePriceHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePriceHistoryPayload>
          }
          aggregate: {
            args: Prisma.TradePriceHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradePriceHistory>
          }
          groupBy: {
            args: Prisma.TradePriceHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradePriceHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradePriceHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<TradePriceHistoryCountAggregateOutputType> | number
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
   * Count Type OfficialPriceCountOutputType
   */

  export type OfficialPriceCountOutputType = {
    history: number
  }

  export type OfficialPriceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | OfficialPriceCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * OfficialPriceCountOutputType without action
   */
  export type OfficialPriceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceCountOutputType
     */
    select?: OfficialPriceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OfficialPriceCountOutputType without action
   */
  export type OfficialPriceCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfficialPriceHistoryWhereInput
  }


  /**
   * Count Type TradePriceCountOutputType
   */

  export type TradePriceCountOutputType = {
    history: number
  }

  export type TradePriceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | TradePriceCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * TradePriceCountOutputType without action
   */
  export type TradePriceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceCountOutputType
     */
    select?: TradePriceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TradePriceCountOutputType without action
   */
  export type TradePriceCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradePriceHistoryWhereInput
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
   * Model OfficialPrice
   */

  export type AggregateOfficialPrice = {
    _count: OfficialPriceCountAggregateOutputType | null
    _avg: OfficialPriceAvgAggregateOutputType | null
    _sum: OfficialPriceSumAggregateOutputType | null
    _min: OfficialPriceMinAggregateOutputType | null
    _max: OfficialPriceMaxAggregateOutputType | null
  }

  export type OfficialPriceAvgAggregateOutputType = {
    taxGems: number | null
    taxGold: number | null
  }

  export type OfficialPriceSumAggregateOutputType = {
    taxGems: number | null
    taxGold: number | null
  }

  export type OfficialPriceMinAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    slug: string | null
    category: string | null
    rarityLabel: string | null
    demand: string | null
    rateOfChange: string | null
    taxGems: number | null
    taxGold: number | null
    sheet: string | null
    existingAmount: string | null
    updatedAt: Date | null
  }

  export type OfficialPriceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    slug: string | null
    category: string | null
    rarityLabel: string | null
    demand: string | null
    rateOfChange: string | null
    taxGems: number | null
    taxGold: number | null
    sheet: string | null
    existingAmount: string | null
    updatedAt: Date | null
  }

  export type OfficialPriceCountAggregateOutputType = {
    id: number
    name: number
    normalized: number
    slug: number
    category: number
    rarityLabel: number
    demand: number
    keys: number
    scrolls: number
    vizards: number
    rateOfChange: number
    taxGems: number
    taxGold: number
    sheet: number
    existingAmount: number
    updatedAt: number
    _all: number
  }


  export type OfficialPriceAvgAggregateInputType = {
    taxGems?: true
    taxGold?: true
  }

  export type OfficialPriceSumAggregateInputType = {
    taxGems?: true
    taxGold?: true
  }

  export type OfficialPriceMinAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityLabel?: true
    demand?: true
    rateOfChange?: true
    taxGems?: true
    taxGold?: true
    sheet?: true
    existingAmount?: true
    updatedAt?: true
  }

  export type OfficialPriceMaxAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityLabel?: true
    demand?: true
    rateOfChange?: true
    taxGems?: true
    taxGold?: true
    sheet?: true
    existingAmount?: true
    updatedAt?: true
  }

  export type OfficialPriceCountAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityLabel?: true
    demand?: true
    keys?: true
    scrolls?: true
    vizards?: true
    rateOfChange?: true
    taxGems?: true
    taxGold?: true
    sheet?: true
    existingAmount?: true
    updatedAt?: true
    _all?: true
  }

  export type OfficialPriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfficialPrice to aggregate.
     */
    where?: OfficialPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPrices to fetch.
     */
    orderBy?: OfficialPriceOrderByWithRelationInput | OfficialPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfficialPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfficialPrices
    **/
    _count?: true | OfficialPriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfficialPriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfficialPriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfficialPriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfficialPriceMaxAggregateInputType
  }

  export type GetOfficialPriceAggregateType<T extends OfficialPriceAggregateArgs> = {
        [P in keyof T & keyof AggregateOfficialPrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfficialPrice[P]>
      : GetScalarType<T[P], AggregateOfficialPrice[P]>
  }




  export type OfficialPriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfficialPriceWhereInput
    orderBy?: OfficialPriceOrderByWithAggregationInput | OfficialPriceOrderByWithAggregationInput[]
    by: OfficialPriceScalarFieldEnum[] | OfficialPriceScalarFieldEnum
    having?: OfficialPriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfficialPriceCountAggregateInputType | true
    _avg?: OfficialPriceAvgAggregateInputType
    _sum?: OfficialPriceSumAggregateInputType
    _min?: OfficialPriceMinAggregateInputType
    _max?: OfficialPriceMaxAggregateInputType
  }

  export type OfficialPriceGroupByOutputType = {
    id: string
    name: string
    normalized: string
    slug: string
    category: string | null
    rarityLabel: string | null
    demand: string | null
    keys: JsonValue | null
    scrolls: JsonValue | null
    vizards: JsonValue | null
    rateOfChange: string | null
    taxGems: number | null
    taxGold: number | null
    sheet: string | null
    existingAmount: string | null
    updatedAt: Date
    _count: OfficialPriceCountAggregateOutputType | null
    _avg: OfficialPriceAvgAggregateOutputType | null
    _sum: OfficialPriceSumAggregateOutputType | null
    _min: OfficialPriceMinAggregateOutputType | null
    _max: OfficialPriceMaxAggregateOutputType | null
  }

  type GetOfficialPriceGroupByPayload<T extends OfficialPriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfficialPriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfficialPriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfficialPriceGroupByOutputType[P]>
            : GetScalarType<T[P], OfficialPriceGroupByOutputType[P]>
        }
      >
    >


  export type OfficialPriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityLabel?: boolean
    demand?: boolean
    keys?: boolean
    scrolls?: boolean
    vizards?: boolean
    rateOfChange?: boolean
    taxGems?: boolean
    taxGold?: boolean
    sheet?: boolean
    existingAmount?: boolean
    updatedAt?: boolean
    history?: boolean | OfficialPrice$historyArgs<ExtArgs>
    _count?: boolean | OfficialPriceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officialPrice"]>

  export type OfficialPriceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityLabel?: boolean
    demand?: boolean
    keys?: boolean
    scrolls?: boolean
    vizards?: boolean
    rateOfChange?: boolean
    taxGems?: boolean
    taxGold?: boolean
    sheet?: boolean
    existingAmount?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["officialPrice"]>

  export type OfficialPriceSelectScalar = {
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityLabel?: boolean
    demand?: boolean
    keys?: boolean
    scrolls?: boolean
    vizards?: boolean
    rateOfChange?: boolean
    taxGems?: boolean
    taxGold?: boolean
    sheet?: boolean
    existingAmount?: boolean
    updatedAt?: boolean
  }

  export type OfficialPriceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | OfficialPrice$historyArgs<ExtArgs>
    _count?: boolean | OfficialPriceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OfficialPriceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OfficialPricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OfficialPrice"
    objects: {
      history: Prisma.$OfficialPriceHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      normalized: string
      slug: string
      category: string | null
      rarityLabel: string | null
      demand: string | null
      keys: Prisma.JsonValue | null
      scrolls: Prisma.JsonValue | null
      vizards: Prisma.JsonValue | null
      rateOfChange: string | null
      taxGems: number | null
      taxGold: number | null
      sheet: string | null
      existingAmount: string | null
      updatedAt: Date
    }, ExtArgs["result"]["officialPrice"]>
    composites: {}
  }

  type OfficialPriceGetPayload<S extends boolean | null | undefined | OfficialPriceDefaultArgs> = $Result.GetResult<Prisma.$OfficialPricePayload, S>

  type OfficialPriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OfficialPriceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OfficialPriceCountAggregateInputType | true
    }

  export interface OfficialPriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OfficialPrice'], meta: { name: 'OfficialPrice' } }
    /**
     * Find zero or one OfficialPrice that matches the filter.
     * @param {OfficialPriceFindUniqueArgs} args - Arguments to find a OfficialPrice
     * @example
     * // Get one OfficialPrice
     * const officialPrice = await prisma.officialPrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfficialPriceFindUniqueArgs>(args: SelectSubset<T, OfficialPriceFindUniqueArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OfficialPrice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OfficialPriceFindUniqueOrThrowArgs} args - Arguments to find a OfficialPrice
     * @example
     * // Get one OfficialPrice
     * const officialPrice = await prisma.officialPrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfficialPriceFindUniqueOrThrowArgs>(args: SelectSubset<T, OfficialPriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OfficialPrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceFindFirstArgs} args - Arguments to find a OfficialPrice
     * @example
     * // Get one OfficialPrice
     * const officialPrice = await prisma.officialPrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfficialPriceFindFirstArgs>(args?: SelectSubset<T, OfficialPriceFindFirstArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OfficialPrice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceFindFirstOrThrowArgs} args - Arguments to find a OfficialPrice
     * @example
     * // Get one OfficialPrice
     * const officialPrice = await prisma.officialPrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfficialPriceFindFirstOrThrowArgs>(args?: SelectSubset<T, OfficialPriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OfficialPrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfficialPrices
     * const officialPrices = await prisma.officialPrice.findMany()
     * 
     * // Get first 10 OfficialPrices
     * const officialPrices = await prisma.officialPrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const officialPriceWithIdOnly = await prisma.officialPrice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfficialPriceFindManyArgs>(args?: SelectSubset<T, OfficialPriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OfficialPrice.
     * @param {OfficialPriceCreateArgs} args - Arguments to create a OfficialPrice.
     * @example
     * // Create one OfficialPrice
     * const OfficialPrice = await prisma.officialPrice.create({
     *   data: {
     *     // ... data to create a OfficialPrice
     *   }
     * })
     * 
     */
    create<T extends OfficialPriceCreateArgs>(args: SelectSubset<T, OfficialPriceCreateArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OfficialPrices.
     * @param {OfficialPriceCreateManyArgs} args - Arguments to create many OfficialPrices.
     * @example
     * // Create many OfficialPrices
     * const officialPrice = await prisma.officialPrice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfficialPriceCreateManyArgs>(args?: SelectSubset<T, OfficialPriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OfficialPrices and returns the data saved in the database.
     * @param {OfficialPriceCreateManyAndReturnArgs} args - Arguments to create many OfficialPrices.
     * @example
     * // Create many OfficialPrices
     * const officialPrice = await prisma.officialPrice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OfficialPrices and only return the `id`
     * const officialPriceWithIdOnly = await prisma.officialPrice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfficialPriceCreateManyAndReturnArgs>(args?: SelectSubset<T, OfficialPriceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OfficialPrice.
     * @param {OfficialPriceDeleteArgs} args - Arguments to delete one OfficialPrice.
     * @example
     * // Delete one OfficialPrice
     * const OfficialPrice = await prisma.officialPrice.delete({
     *   where: {
     *     // ... filter to delete one OfficialPrice
     *   }
     * })
     * 
     */
    delete<T extends OfficialPriceDeleteArgs>(args: SelectSubset<T, OfficialPriceDeleteArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OfficialPrice.
     * @param {OfficialPriceUpdateArgs} args - Arguments to update one OfficialPrice.
     * @example
     * // Update one OfficialPrice
     * const officialPrice = await prisma.officialPrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfficialPriceUpdateArgs>(args: SelectSubset<T, OfficialPriceUpdateArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OfficialPrices.
     * @param {OfficialPriceDeleteManyArgs} args - Arguments to filter OfficialPrices to delete.
     * @example
     * // Delete a few OfficialPrices
     * const { count } = await prisma.officialPrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfficialPriceDeleteManyArgs>(args?: SelectSubset<T, OfficialPriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfficialPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfficialPrices
     * const officialPrice = await prisma.officialPrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfficialPriceUpdateManyArgs>(args: SelectSubset<T, OfficialPriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OfficialPrice.
     * @param {OfficialPriceUpsertArgs} args - Arguments to update or create a OfficialPrice.
     * @example
     * // Update or create a OfficialPrice
     * const officialPrice = await prisma.officialPrice.upsert({
     *   create: {
     *     // ... data to create a OfficialPrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfficialPrice we want to update
     *   }
     * })
     */
    upsert<T extends OfficialPriceUpsertArgs>(args: SelectSubset<T, OfficialPriceUpsertArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OfficialPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceCountArgs} args - Arguments to filter OfficialPrices to count.
     * @example
     * // Count the number of OfficialPrices
     * const count = await prisma.officialPrice.count({
     *   where: {
     *     // ... the filter for the OfficialPrices we want to count
     *   }
     * })
    **/
    count<T extends OfficialPriceCountArgs>(
      args?: Subset<T, OfficialPriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfficialPriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfficialPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OfficialPriceAggregateArgs>(args: Subset<T, OfficialPriceAggregateArgs>): Prisma.PrismaPromise<GetOfficialPriceAggregateType<T>>

    /**
     * Group by OfficialPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceGroupByArgs} args - Group by arguments.
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
      T extends OfficialPriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfficialPriceGroupByArgs['orderBy'] }
        : { orderBy?: OfficialPriceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OfficialPriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfficialPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OfficialPrice model
   */
  readonly fields: OfficialPriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OfficialPrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfficialPriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    history<T extends OfficialPrice$historyArgs<ExtArgs> = {}>(args?: Subset<T, OfficialPrice$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the OfficialPrice model
   */ 
  interface OfficialPriceFieldRefs {
    readonly id: FieldRef<"OfficialPrice", 'String'>
    readonly name: FieldRef<"OfficialPrice", 'String'>
    readonly normalized: FieldRef<"OfficialPrice", 'String'>
    readonly slug: FieldRef<"OfficialPrice", 'String'>
    readonly category: FieldRef<"OfficialPrice", 'String'>
    readonly rarityLabel: FieldRef<"OfficialPrice", 'String'>
    readonly demand: FieldRef<"OfficialPrice", 'String'>
    readonly keys: FieldRef<"OfficialPrice", 'Json'>
    readonly scrolls: FieldRef<"OfficialPrice", 'Json'>
    readonly vizards: FieldRef<"OfficialPrice", 'Json'>
    readonly rateOfChange: FieldRef<"OfficialPrice", 'String'>
    readonly taxGems: FieldRef<"OfficialPrice", 'Float'>
    readonly taxGold: FieldRef<"OfficialPrice", 'Float'>
    readonly sheet: FieldRef<"OfficialPrice", 'String'>
    readonly existingAmount: FieldRef<"OfficialPrice", 'String'>
    readonly updatedAt: FieldRef<"OfficialPrice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OfficialPrice findUnique
   */
  export type OfficialPriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPrice to fetch.
     */
    where: OfficialPriceWhereUniqueInput
  }

  /**
   * OfficialPrice findUniqueOrThrow
   */
  export type OfficialPriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPrice to fetch.
     */
    where: OfficialPriceWhereUniqueInput
  }

  /**
   * OfficialPrice findFirst
   */
  export type OfficialPriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPrice to fetch.
     */
    where?: OfficialPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPrices to fetch.
     */
    orderBy?: OfficialPriceOrderByWithRelationInput | OfficialPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfficialPrices.
     */
    cursor?: OfficialPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfficialPrices.
     */
    distinct?: OfficialPriceScalarFieldEnum | OfficialPriceScalarFieldEnum[]
  }

  /**
   * OfficialPrice findFirstOrThrow
   */
  export type OfficialPriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPrice to fetch.
     */
    where?: OfficialPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPrices to fetch.
     */
    orderBy?: OfficialPriceOrderByWithRelationInput | OfficialPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfficialPrices.
     */
    cursor?: OfficialPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfficialPrices.
     */
    distinct?: OfficialPriceScalarFieldEnum | OfficialPriceScalarFieldEnum[]
  }

  /**
   * OfficialPrice findMany
   */
  export type OfficialPriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPrices to fetch.
     */
    where?: OfficialPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPrices to fetch.
     */
    orderBy?: OfficialPriceOrderByWithRelationInput | OfficialPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfficialPrices.
     */
    cursor?: OfficialPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPrices.
     */
    skip?: number
    distinct?: OfficialPriceScalarFieldEnum | OfficialPriceScalarFieldEnum[]
  }

  /**
   * OfficialPrice create
   */
  export type OfficialPriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * The data needed to create a OfficialPrice.
     */
    data: XOR<OfficialPriceCreateInput, OfficialPriceUncheckedCreateInput>
  }

  /**
   * OfficialPrice createMany
   */
  export type OfficialPriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfficialPrices.
     */
    data: OfficialPriceCreateManyInput | OfficialPriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfficialPrice createManyAndReturn
   */
  export type OfficialPriceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OfficialPrices.
     */
    data: OfficialPriceCreateManyInput | OfficialPriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfficialPrice update
   */
  export type OfficialPriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * The data needed to update a OfficialPrice.
     */
    data: XOR<OfficialPriceUpdateInput, OfficialPriceUncheckedUpdateInput>
    /**
     * Choose, which OfficialPrice to update.
     */
    where: OfficialPriceWhereUniqueInput
  }

  /**
   * OfficialPrice updateMany
   */
  export type OfficialPriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OfficialPrices.
     */
    data: XOR<OfficialPriceUpdateManyMutationInput, OfficialPriceUncheckedUpdateManyInput>
    /**
     * Filter which OfficialPrices to update
     */
    where?: OfficialPriceWhereInput
  }

  /**
   * OfficialPrice upsert
   */
  export type OfficialPriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * The filter to search for the OfficialPrice to update in case it exists.
     */
    where: OfficialPriceWhereUniqueInput
    /**
     * In case the OfficialPrice found by the `where` argument doesn't exist, create a new OfficialPrice with this data.
     */
    create: XOR<OfficialPriceCreateInput, OfficialPriceUncheckedCreateInput>
    /**
     * In case the OfficialPrice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfficialPriceUpdateInput, OfficialPriceUncheckedUpdateInput>
  }

  /**
   * OfficialPrice delete
   */
  export type OfficialPriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
    /**
     * Filter which OfficialPrice to delete.
     */
    where: OfficialPriceWhereUniqueInput
  }

  /**
   * OfficialPrice deleteMany
   */
  export type OfficialPriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfficialPrices to delete
     */
    where?: OfficialPriceWhereInput
  }

  /**
   * OfficialPrice.history
   */
  export type OfficialPrice$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    where?: OfficialPriceHistoryWhereInput
    orderBy?: OfficialPriceHistoryOrderByWithRelationInput | OfficialPriceHistoryOrderByWithRelationInput[]
    cursor?: OfficialPriceHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfficialPriceHistoryScalarFieldEnum | OfficialPriceHistoryScalarFieldEnum[]
  }

  /**
   * OfficialPrice without action
   */
  export type OfficialPriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPrice
     */
    select?: OfficialPriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceInclude<ExtArgs> | null
  }


  /**
   * Model OfficialPriceHistory
   */

  export type AggregateOfficialPriceHistory = {
    _count: OfficialPriceHistoryCountAggregateOutputType | null
    _avg: OfficialPriceHistoryAvgAggregateOutputType | null
    _sum: OfficialPriceHistorySumAggregateOutputType | null
    _min: OfficialPriceHistoryMinAggregateOutputType | null
    _max: OfficialPriceHistoryMaxAggregateOutputType | null
  }

  export type OfficialPriceHistoryAvgAggregateOutputType = {
    id: number | null
    keys: number | null
    scrolls: number | null
    vizards: number | null
  }

  export type OfficialPriceHistorySumAggregateOutputType = {
    id: number | null
    keys: number | null
    scrolls: number | null
    vizards: number | null
  }

  export type OfficialPriceHistoryMinAggregateOutputType = {
    id: number | null
    itemId: string | null
    keys: number | null
    scrolls: number | null
    vizards: number | null
    recordedAt: Date | null
  }

  export type OfficialPriceHistoryMaxAggregateOutputType = {
    id: number | null
    itemId: string | null
    keys: number | null
    scrolls: number | null
    vizards: number | null
    recordedAt: Date | null
  }

  export type OfficialPriceHistoryCountAggregateOutputType = {
    id: number
    itemId: number
    keys: number
    scrolls: number
    vizards: number
    recordedAt: number
    _all: number
  }


  export type OfficialPriceHistoryAvgAggregateInputType = {
    id?: true
    keys?: true
    scrolls?: true
    vizards?: true
  }

  export type OfficialPriceHistorySumAggregateInputType = {
    id?: true
    keys?: true
    scrolls?: true
    vizards?: true
  }

  export type OfficialPriceHistoryMinAggregateInputType = {
    id?: true
    itemId?: true
    keys?: true
    scrolls?: true
    vizards?: true
    recordedAt?: true
  }

  export type OfficialPriceHistoryMaxAggregateInputType = {
    id?: true
    itemId?: true
    keys?: true
    scrolls?: true
    vizards?: true
    recordedAt?: true
  }

  export type OfficialPriceHistoryCountAggregateInputType = {
    id?: true
    itemId?: true
    keys?: true
    scrolls?: true
    vizards?: true
    recordedAt?: true
    _all?: true
  }

  export type OfficialPriceHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfficialPriceHistory to aggregate.
     */
    where?: OfficialPriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPriceHistories to fetch.
     */
    orderBy?: OfficialPriceHistoryOrderByWithRelationInput | OfficialPriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfficialPriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfficialPriceHistories
    **/
    _count?: true | OfficialPriceHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfficialPriceHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfficialPriceHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfficialPriceHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfficialPriceHistoryMaxAggregateInputType
  }

  export type GetOfficialPriceHistoryAggregateType<T extends OfficialPriceHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateOfficialPriceHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfficialPriceHistory[P]>
      : GetScalarType<T[P], AggregateOfficialPriceHistory[P]>
  }




  export type OfficialPriceHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfficialPriceHistoryWhereInput
    orderBy?: OfficialPriceHistoryOrderByWithAggregationInput | OfficialPriceHistoryOrderByWithAggregationInput[]
    by: OfficialPriceHistoryScalarFieldEnum[] | OfficialPriceHistoryScalarFieldEnum
    having?: OfficialPriceHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfficialPriceHistoryCountAggregateInputType | true
    _avg?: OfficialPriceHistoryAvgAggregateInputType
    _sum?: OfficialPriceHistorySumAggregateInputType
    _min?: OfficialPriceHistoryMinAggregateInputType
    _max?: OfficialPriceHistoryMaxAggregateInputType
  }

  export type OfficialPriceHistoryGroupByOutputType = {
    id: number
    itemId: string
    keys: number | null
    scrolls: number | null
    vizards: number | null
    recordedAt: Date
    _count: OfficialPriceHistoryCountAggregateOutputType | null
    _avg: OfficialPriceHistoryAvgAggregateOutputType | null
    _sum: OfficialPriceHistorySumAggregateOutputType | null
    _min: OfficialPriceHistoryMinAggregateOutputType | null
    _max: OfficialPriceHistoryMaxAggregateOutputType | null
  }

  type GetOfficialPriceHistoryGroupByPayload<T extends OfficialPriceHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfficialPriceHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfficialPriceHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfficialPriceHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], OfficialPriceHistoryGroupByOutputType[P]>
        }
      >
    >


  export type OfficialPriceHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    keys?: boolean
    scrolls?: boolean
    vizards?: boolean
    recordedAt?: boolean
    item?: boolean | OfficialPriceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officialPriceHistory"]>

  export type OfficialPriceHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    keys?: boolean
    scrolls?: boolean
    vizards?: boolean
    recordedAt?: boolean
    item?: boolean | OfficialPriceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officialPriceHistory"]>

  export type OfficialPriceHistorySelectScalar = {
    id?: boolean
    itemId?: boolean
    keys?: boolean
    scrolls?: boolean
    vizards?: boolean
    recordedAt?: boolean
  }

  export type OfficialPriceHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | OfficialPriceDefaultArgs<ExtArgs>
  }
  export type OfficialPriceHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | OfficialPriceDefaultArgs<ExtArgs>
  }

  export type $OfficialPriceHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OfficialPriceHistory"
    objects: {
      item: Prisma.$OfficialPricePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      itemId: string
      keys: number | null
      scrolls: number | null
      vizards: number | null
      recordedAt: Date
    }, ExtArgs["result"]["officialPriceHistory"]>
    composites: {}
  }

  type OfficialPriceHistoryGetPayload<S extends boolean | null | undefined | OfficialPriceHistoryDefaultArgs> = $Result.GetResult<Prisma.$OfficialPriceHistoryPayload, S>

  type OfficialPriceHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OfficialPriceHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OfficialPriceHistoryCountAggregateInputType | true
    }

  export interface OfficialPriceHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OfficialPriceHistory'], meta: { name: 'OfficialPriceHistory' } }
    /**
     * Find zero or one OfficialPriceHistory that matches the filter.
     * @param {OfficialPriceHistoryFindUniqueArgs} args - Arguments to find a OfficialPriceHistory
     * @example
     * // Get one OfficialPriceHistory
     * const officialPriceHistory = await prisma.officialPriceHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfficialPriceHistoryFindUniqueArgs>(args: SelectSubset<T, OfficialPriceHistoryFindUniqueArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OfficialPriceHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OfficialPriceHistoryFindUniqueOrThrowArgs} args - Arguments to find a OfficialPriceHistory
     * @example
     * // Get one OfficialPriceHistory
     * const officialPriceHistory = await prisma.officialPriceHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfficialPriceHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, OfficialPriceHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OfficialPriceHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceHistoryFindFirstArgs} args - Arguments to find a OfficialPriceHistory
     * @example
     * // Get one OfficialPriceHistory
     * const officialPriceHistory = await prisma.officialPriceHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfficialPriceHistoryFindFirstArgs>(args?: SelectSubset<T, OfficialPriceHistoryFindFirstArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OfficialPriceHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceHistoryFindFirstOrThrowArgs} args - Arguments to find a OfficialPriceHistory
     * @example
     * // Get one OfficialPriceHistory
     * const officialPriceHistory = await prisma.officialPriceHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfficialPriceHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, OfficialPriceHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OfficialPriceHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfficialPriceHistories
     * const officialPriceHistories = await prisma.officialPriceHistory.findMany()
     * 
     * // Get first 10 OfficialPriceHistories
     * const officialPriceHistories = await prisma.officialPriceHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const officialPriceHistoryWithIdOnly = await prisma.officialPriceHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfficialPriceHistoryFindManyArgs>(args?: SelectSubset<T, OfficialPriceHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OfficialPriceHistory.
     * @param {OfficialPriceHistoryCreateArgs} args - Arguments to create a OfficialPriceHistory.
     * @example
     * // Create one OfficialPriceHistory
     * const OfficialPriceHistory = await prisma.officialPriceHistory.create({
     *   data: {
     *     // ... data to create a OfficialPriceHistory
     *   }
     * })
     * 
     */
    create<T extends OfficialPriceHistoryCreateArgs>(args: SelectSubset<T, OfficialPriceHistoryCreateArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OfficialPriceHistories.
     * @param {OfficialPriceHistoryCreateManyArgs} args - Arguments to create many OfficialPriceHistories.
     * @example
     * // Create many OfficialPriceHistories
     * const officialPriceHistory = await prisma.officialPriceHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfficialPriceHistoryCreateManyArgs>(args?: SelectSubset<T, OfficialPriceHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OfficialPriceHistories and returns the data saved in the database.
     * @param {OfficialPriceHistoryCreateManyAndReturnArgs} args - Arguments to create many OfficialPriceHistories.
     * @example
     * // Create many OfficialPriceHistories
     * const officialPriceHistory = await prisma.officialPriceHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OfficialPriceHistories and only return the `id`
     * const officialPriceHistoryWithIdOnly = await prisma.officialPriceHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfficialPriceHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, OfficialPriceHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OfficialPriceHistory.
     * @param {OfficialPriceHistoryDeleteArgs} args - Arguments to delete one OfficialPriceHistory.
     * @example
     * // Delete one OfficialPriceHistory
     * const OfficialPriceHistory = await prisma.officialPriceHistory.delete({
     *   where: {
     *     // ... filter to delete one OfficialPriceHistory
     *   }
     * })
     * 
     */
    delete<T extends OfficialPriceHistoryDeleteArgs>(args: SelectSubset<T, OfficialPriceHistoryDeleteArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OfficialPriceHistory.
     * @param {OfficialPriceHistoryUpdateArgs} args - Arguments to update one OfficialPriceHistory.
     * @example
     * // Update one OfficialPriceHistory
     * const officialPriceHistory = await prisma.officialPriceHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfficialPriceHistoryUpdateArgs>(args: SelectSubset<T, OfficialPriceHistoryUpdateArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OfficialPriceHistories.
     * @param {OfficialPriceHistoryDeleteManyArgs} args - Arguments to filter OfficialPriceHistories to delete.
     * @example
     * // Delete a few OfficialPriceHistories
     * const { count } = await prisma.officialPriceHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfficialPriceHistoryDeleteManyArgs>(args?: SelectSubset<T, OfficialPriceHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfficialPriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfficialPriceHistories
     * const officialPriceHistory = await prisma.officialPriceHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfficialPriceHistoryUpdateManyArgs>(args: SelectSubset<T, OfficialPriceHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OfficialPriceHistory.
     * @param {OfficialPriceHistoryUpsertArgs} args - Arguments to update or create a OfficialPriceHistory.
     * @example
     * // Update or create a OfficialPriceHistory
     * const officialPriceHistory = await prisma.officialPriceHistory.upsert({
     *   create: {
     *     // ... data to create a OfficialPriceHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfficialPriceHistory we want to update
     *   }
     * })
     */
    upsert<T extends OfficialPriceHistoryUpsertArgs>(args: SelectSubset<T, OfficialPriceHistoryUpsertArgs<ExtArgs>>): Prisma__OfficialPriceHistoryClient<$Result.GetResult<Prisma.$OfficialPriceHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OfficialPriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceHistoryCountArgs} args - Arguments to filter OfficialPriceHistories to count.
     * @example
     * // Count the number of OfficialPriceHistories
     * const count = await prisma.officialPriceHistory.count({
     *   where: {
     *     // ... the filter for the OfficialPriceHistories we want to count
     *   }
     * })
    **/
    count<T extends OfficialPriceHistoryCountArgs>(
      args?: Subset<T, OfficialPriceHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfficialPriceHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfficialPriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OfficialPriceHistoryAggregateArgs>(args: Subset<T, OfficialPriceHistoryAggregateArgs>): Prisma.PrismaPromise<GetOfficialPriceHistoryAggregateType<T>>

    /**
     * Group by OfficialPriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficialPriceHistoryGroupByArgs} args - Group by arguments.
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
      T extends OfficialPriceHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfficialPriceHistoryGroupByArgs['orderBy'] }
        : { orderBy?: OfficialPriceHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OfficialPriceHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfficialPriceHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OfficialPriceHistory model
   */
  readonly fields: OfficialPriceHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OfficialPriceHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfficialPriceHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends OfficialPriceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OfficialPriceDefaultArgs<ExtArgs>>): Prisma__OfficialPriceClient<$Result.GetResult<Prisma.$OfficialPricePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the OfficialPriceHistory model
   */ 
  interface OfficialPriceHistoryFieldRefs {
    readonly id: FieldRef<"OfficialPriceHistory", 'Int'>
    readonly itemId: FieldRef<"OfficialPriceHistory", 'String'>
    readonly keys: FieldRef<"OfficialPriceHistory", 'Float'>
    readonly scrolls: FieldRef<"OfficialPriceHistory", 'Float'>
    readonly vizards: FieldRef<"OfficialPriceHistory", 'Float'>
    readonly recordedAt: FieldRef<"OfficialPriceHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OfficialPriceHistory findUnique
   */
  export type OfficialPriceHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPriceHistory to fetch.
     */
    where: OfficialPriceHistoryWhereUniqueInput
  }

  /**
   * OfficialPriceHistory findUniqueOrThrow
   */
  export type OfficialPriceHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPriceHistory to fetch.
     */
    where: OfficialPriceHistoryWhereUniqueInput
  }

  /**
   * OfficialPriceHistory findFirst
   */
  export type OfficialPriceHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPriceHistory to fetch.
     */
    where?: OfficialPriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPriceHistories to fetch.
     */
    orderBy?: OfficialPriceHistoryOrderByWithRelationInput | OfficialPriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfficialPriceHistories.
     */
    cursor?: OfficialPriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfficialPriceHistories.
     */
    distinct?: OfficialPriceHistoryScalarFieldEnum | OfficialPriceHistoryScalarFieldEnum[]
  }

  /**
   * OfficialPriceHistory findFirstOrThrow
   */
  export type OfficialPriceHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPriceHistory to fetch.
     */
    where?: OfficialPriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPriceHistories to fetch.
     */
    orderBy?: OfficialPriceHistoryOrderByWithRelationInput | OfficialPriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfficialPriceHistories.
     */
    cursor?: OfficialPriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfficialPriceHistories.
     */
    distinct?: OfficialPriceHistoryScalarFieldEnum | OfficialPriceHistoryScalarFieldEnum[]
  }

  /**
   * OfficialPriceHistory findMany
   */
  export type OfficialPriceHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OfficialPriceHistories to fetch.
     */
    where?: OfficialPriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfficialPriceHistories to fetch.
     */
    orderBy?: OfficialPriceHistoryOrderByWithRelationInput | OfficialPriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfficialPriceHistories.
     */
    cursor?: OfficialPriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfficialPriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfficialPriceHistories.
     */
    skip?: number
    distinct?: OfficialPriceHistoryScalarFieldEnum | OfficialPriceHistoryScalarFieldEnum[]
  }

  /**
   * OfficialPriceHistory create
   */
  export type OfficialPriceHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a OfficialPriceHistory.
     */
    data: XOR<OfficialPriceHistoryCreateInput, OfficialPriceHistoryUncheckedCreateInput>
  }

  /**
   * OfficialPriceHistory createMany
   */
  export type OfficialPriceHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfficialPriceHistories.
     */
    data: OfficialPriceHistoryCreateManyInput | OfficialPriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfficialPriceHistory createManyAndReturn
   */
  export type OfficialPriceHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OfficialPriceHistories.
     */
    data: OfficialPriceHistoryCreateManyInput | OfficialPriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OfficialPriceHistory update
   */
  export type OfficialPriceHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a OfficialPriceHistory.
     */
    data: XOR<OfficialPriceHistoryUpdateInput, OfficialPriceHistoryUncheckedUpdateInput>
    /**
     * Choose, which OfficialPriceHistory to update.
     */
    where: OfficialPriceHistoryWhereUniqueInput
  }

  /**
   * OfficialPriceHistory updateMany
   */
  export type OfficialPriceHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OfficialPriceHistories.
     */
    data: XOR<OfficialPriceHistoryUpdateManyMutationInput, OfficialPriceHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OfficialPriceHistories to update
     */
    where?: OfficialPriceHistoryWhereInput
  }

  /**
   * OfficialPriceHistory upsert
   */
  export type OfficialPriceHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the OfficialPriceHistory to update in case it exists.
     */
    where: OfficialPriceHistoryWhereUniqueInput
    /**
     * In case the OfficialPriceHistory found by the `where` argument doesn't exist, create a new OfficialPriceHistory with this data.
     */
    create: XOR<OfficialPriceHistoryCreateInput, OfficialPriceHistoryUncheckedCreateInput>
    /**
     * In case the OfficialPriceHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfficialPriceHistoryUpdateInput, OfficialPriceHistoryUncheckedUpdateInput>
  }

  /**
   * OfficialPriceHistory delete
   */
  export type OfficialPriceHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
    /**
     * Filter which OfficialPriceHistory to delete.
     */
    where: OfficialPriceHistoryWhereUniqueInput
  }

  /**
   * OfficialPriceHistory deleteMany
   */
  export type OfficialPriceHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfficialPriceHistories to delete
     */
    where?: OfficialPriceHistoryWhereInput
  }

  /**
   * OfficialPriceHistory without action
   */
  export type OfficialPriceHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficialPriceHistory
     */
    select?: OfficialPriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfficialPriceHistoryInclude<ExtArgs> | null
  }


  /**
   * Model TradePrice
   */

  export type AggregateTradePrice = {
    _count: TradePriceCountAggregateOutputType | null
    _avg: TradePriceAvgAggregateOutputType | null
    _sum: TradePriceSumAggregateOutputType | null
    _min: TradePriceMinAggregateOutputType | null
    _max: TradePriceMaxAggregateOutputType | null
  }

  export type TradePriceAvgAggregateOutputType = {
    rarityPct: number | null
    value: number | null
    keys: number | null
    scrolls: number | null
    demand: number | null
    prestige: number | null
    taxGems: number | null
    taxGold: number | null
  }

  export type TradePriceSumAggregateOutputType = {
    rarityPct: number | null
    value: number | null
    keys: number | null
    scrolls: number | null
    demand: number | null
    prestige: number | null
    taxGems: number | null
    taxGold: number | null
  }

  export type TradePriceMinAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    slug: string | null
    category: string | null
    rarityPct: number | null
    emoji: string | null
    value: number | null
    keys: number | null
    scrolls: number | null
    demand: number | null
    rateOfChange: string | null
    prestige: number | null
    status: string | null
    obtainedFrom: string | null
    taxGems: number | null
    taxGold: number | null
    apiId: string | null
    apiUpdatedAt: Date | null
    updatedAt: Date | null
  }

  export type TradePriceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    slug: string | null
    category: string | null
    rarityPct: number | null
    emoji: string | null
    value: number | null
    keys: number | null
    scrolls: number | null
    demand: number | null
    rateOfChange: string | null
    prestige: number | null
    status: string | null
    obtainedFrom: string | null
    taxGems: number | null
    taxGold: number | null
    apiId: string | null
    apiUpdatedAt: Date | null
    updatedAt: Date | null
  }

  export type TradePriceCountAggregateOutputType = {
    id: number
    name: number
    normalized: number
    slug: number
    category: number
    rarityPct: number
    emoji: number
    value: number
    keys: number
    scrolls: number
    demand: number
    rateOfChange: number
    prestige: number
    status: number
    obtainedFrom: number
    taxGems: number
    taxGold: number
    apiId: number
    apiUpdatedAt: number
    updatedAt: number
    _all: number
  }


  export type TradePriceAvgAggregateInputType = {
    rarityPct?: true
    value?: true
    keys?: true
    scrolls?: true
    demand?: true
    prestige?: true
    taxGems?: true
    taxGold?: true
  }

  export type TradePriceSumAggregateInputType = {
    rarityPct?: true
    value?: true
    keys?: true
    scrolls?: true
    demand?: true
    prestige?: true
    taxGems?: true
    taxGold?: true
  }

  export type TradePriceMinAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityPct?: true
    emoji?: true
    value?: true
    keys?: true
    scrolls?: true
    demand?: true
    rateOfChange?: true
    prestige?: true
    status?: true
    obtainedFrom?: true
    taxGems?: true
    taxGold?: true
    apiId?: true
    apiUpdatedAt?: true
    updatedAt?: true
  }

  export type TradePriceMaxAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityPct?: true
    emoji?: true
    value?: true
    keys?: true
    scrolls?: true
    demand?: true
    rateOfChange?: true
    prestige?: true
    status?: true
    obtainedFrom?: true
    taxGems?: true
    taxGold?: true
    apiId?: true
    apiUpdatedAt?: true
    updatedAt?: true
  }

  export type TradePriceCountAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    slug?: true
    category?: true
    rarityPct?: true
    emoji?: true
    value?: true
    keys?: true
    scrolls?: true
    demand?: true
    rateOfChange?: true
    prestige?: true
    status?: true
    obtainedFrom?: true
    taxGems?: true
    taxGold?: true
    apiId?: true
    apiUpdatedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TradePriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradePrice to aggregate.
     */
    where?: TradePriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePrices to fetch.
     */
    orderBy?: TradePriceOrderByWithRelationInput | TradePriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradePriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradePrices
    **/
    _count?: true | TradePriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradePriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradePriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradePriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradePriceMaxAggregateInputType
  }

  export type GetTradePriceAggregateType<T extends TradePriceAggregateArgs> = {
        [P in keyof T & keyof AggregateTradePrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradePrice[P]>
      : GetScalarType<T[P], AggregateTradePrice[P]>
  }




  export type TradePriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradePriceWhereInput
    orderBy?: TradePriceOrderByWithAggregationInput | TradePriceOrderByWithAggregationInput[]
    by: TradePriceScalarFieldEnum[] | TradePriceScalarFieldEnum
    having?: TradePriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradePriceCountAggregateInputType | true
    _avg?: TradePriceAvgAggregateInputType
    _sum?: TradePriceSumAggregateInputType
    _min?: TradePriceMinAggregateInputType
    _max?: TradePriceMaxAggregateInputType
  }

  export type TradePriceGroupByOutputType = {
    id: string
    name: string
    normalized: string
    slug: string
    category: string | null
    rarityPct: number | null
    emoji: string | null
    value: number | null
    keys: number | null
    scrolls: number | null
    demand: number | null
    rateOfChange: string | null
    prestige: number | null
    status: string | null
    obtainedFrom: string | null
    taxGems: number | null
    taxGold: number | null
    apiId: string | null
    apiUpdatedAt: Date | null
    updatedAt: Date
    _count: TradePriceCountAggregateOutputType | null
    _avg: TradePriceAvgAggregateOutputType | null
    _sum: TradePriceSumAggregateOutputType | null
    _min: TradePriceMinAggregateOutputType | null
    _max: TradePriceMaxAggregateOutputType | null
  }

  type GetTradePriceGroupByPayload<T extends TradePriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradePriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradePriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradePriceGroupByOutputType[P]>
            : GetScalarType<T[P], TradePriceGroupByOutputType[P]>
        }
      >
    >


  export type TradePriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityPct?: boolean
    emoji?: boolean
    value?: boolean
    keys?: boolean
    scrolls?: boolean
    demand?: boolean
    rateOfChange?: boolean
    prestige?: boolean
    status?: boolean
    obtainedFrom?: boolean
    taxGems?: boolean
    taxGold?: boolean
    apiId?: boolean
    apiUpdatedAt?: boolean
    updatedAt?: boolean
    history?: boolean | TradePrice$historyArgs<ExtArgs>
    _count?: boolean | TradePriceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradePrice"]>

  export type TradePriceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityPct?: boolean
    emoji?: boolean
    value?: boolean
    keys?: boolean
    scrolls?: boolean
    demand?: boolean
    rateOfChange?: boolean
    prestige?: boolean
    status?: boolean
    obtainedFrom?: boolean
    taxGems?: boolean
    taxGold?: boolean
    apiId?: boolean
    apiUpdatedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tradePrice"]>

  export type TradePriceSelectScalar = {
    id?: boolean
    name?: boolean
    normalized?: boolean
    slug?: boolean
    category?: boolean
    rarityPct?: boolean
    emoji?: boolean
    value?: boolean
    keys?: boolean
    scrolls?: boolean
    demand?: boolean
    rateOfChange?: boolean
    prestige?: boolean
    status?: boolean
    obtainedFrom?: boolean
    taxGems?: boolean
    taxGold?: boolean
    apiId?: boolean
    apiUpdatedAt?: boolean
    updatedAt?: boolean
  }

  export type TradePriceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | TradePrice$historyArgs<ExtArgs>
    _count?: boolean | TradePriceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TradePriceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TradePricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradePrice"
    objects: {
      history: Prisma.$TradePriceHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      normalized: string
      slug: string
      category: string | null
      rarityPct: number | null
      emoji: string | null
      value: number | null
      keys: number | null
      scrolls: number | null
      demand: number | null
      rateOfChange: string | null
      prestige: number | null
      status: string | null
      obtainedFrom: string | null
      taxGems: number | null
      taxGold: number | null
      apiId: string | null
      apiUpdatedAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["tradePrice"]>
    composites: {}
  }

  type TradePriceGetPayload<S extends boolean | null | undefined | TradePriceDefaultArgs> = $Result.GetResult<Prisma.$TradePricePayload, S>

  type TradePriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TradePriceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TradePriceCountAggregateInputType | true
    }

  export interface TradePriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradePrice'], meta: { name: 'TradePrice' } }
    /**
     * Find zero or one TradePrice that matches the filter.
     * @param {TradePriceFindUniqueArgs} args - Arguments to find a TradePrice
     * @example
     * // Get one TradePrice
     * const tradePrice = await prisma.tradePrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradePriceFindUniqueArgs>(args: SelectSubset<T, TradePriceFindUniqueArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TradePrice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TradePriceFindUniqueOrThrowArgs} args - Arguments to find a TradePrice
     * @example
     * // Get one TradePrice
     * const tradePrice = await prisma.tradePrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradePriceFindUniqueOrThrowArgs>(args: SelectSubset<T, TradePriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TradePrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceFindFirstArgs} args - Arguments to find a TradePrice
     * @example
     * // Get one TradePrice
     * const tradePrice = await prisma.tradePrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradePriceFindFirstArgs>(args?: SelectSubset<T, TradePriceFindFirstArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TradePrice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceFindFirstOrThrowArgs} args - Arguments to find a TradePrice
     * @example
     * // Get one TradePrice
     * const tradePrice = await prisma.tradePrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradePriceFindFirstOrThrowArgs>(args?: SelectSubset<T, TradePriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TradePrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradePrices
     * const tradePrices = await prisma.tradePrice.findMany()
     * 
     * // Get first 10 TradePrices
     * const tradePrices = await prisma.tradePrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradePriceWithIdOnly = await prisma.tradePrice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradePriceFindManyArgs>(args?: SelectSubset<T, TradePriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TradePrice.
     * @param {TradePriceCreateArgs} args - Arguments to create a TradePrice.
     * @example
     * // Create one TradePrice
     * const TradePrice = await prisma.tradePrice.create({
     *   data: {
     *     // ... data to create a TradePrice
     *   }
     * })
     * 
     */
    create<T extends TradePriceCreateArgs>(args: SelectSubset<T, TradePriceCreateArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TradePrices.
     * @param {TradePriceCreateManyArgs} args - Arguments to create many TradePrices.
     * @example
     * // Create many TradePrices
     * const tradePrice = await prisma.tradePrice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradePriceCreateManyArgs>(args?: SelectSubset<T, TradePriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradePrices and returns the data saved in the database.
     * @param {TradePriceCreateManyAndReturnArgs} args - Arguments to create many TradePrices.
     * @example
     * // Create many TradePrices
     * const tradePrice = await prisma.tradePrice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradePrices and only return the `id`
     * const tradePriceWithIdOnly = await prisma.tradePrice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradePriceCreateManyAndReturnArgs>(args?: SelectSubset<T, TradePriceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TradePrice.
     * @param {TradePriceDeleteArgs} args - Arguments to delete one TradePrice.
     * @example
     * // Delete one TradePrice
     * const TradePrice = await prisma.tradePrice.delete({
     *   where: {
     *     // ... filter to delete one TradePrice
     *   }
     * })
     * 
     */
    delete<T extends TradePriceDeleteArgs>(args: SelectSubset<T, TradePriceDeleteArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TradePrice.
     * @param {TradePriceUpdateArgs} args - Arguments to update one TradePrice.
     * @example
     * // Update one TradePrice
     * const tradePrice = await prisma.tradePrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradePriceUpdateArgs>(args: SelectSubset<T, TradePriceUpdateArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TradePrices.
     * @param {TradePriceDeleteManyArgs} args - Arguments to filter TradePrices to delete.
     * @example
     * // Delete a few TradePrices
     * const { count } = await prisma.tradePrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradePriceDeleteManyArgs>(args?: SelectSubset<T, TradePriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradePrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradePrices
     * const tradePrice = await prisma.tradePrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradePriceUpdateManyArgs>(args: SelectSubset<T, TradePriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TradePrice.
     * @param {TradePriceUpsertArgs} args - Arguments to update or create a TradePrice.
     * @example
     * // Update or create a TradePrice
     * const tradePrice = await prisma.tradePrice.upsert({
     *   create: {
     *     // ... data to create a TradePrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradePrice we want to update
     *   }
     * })
     */
    upsert<T extends TradePriceUpsertArgs>(args: SelectSubset<T, TradePriceUpsertArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TradePrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceCountArgs} args - Arguments to filter TradePrices to count.
     * @example
     * // Count the number of TradePrices
     * const count = await prisma.tradePrice.count({
     *   where: {
     *     // ... the filter for the TradePrices we want to count
     *   }
     * })
    **/
    count<T extends TradePriceCountArgs>(
      args?: Subset<T, TradePriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradePriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradePrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TradePriceAggregateArgs>(args: Subset<T, TradePriceAggregateArgs>): Prisma.PrismaPromise<GetTradePriceAggregateType<T>>

    /**
     * Group by TradePrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceGroupByArgs} args - Group by arguments.
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
      T extends TradePriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradePriceGroupByArgs['orderBy'] }
        : { orderBy?: TradePriceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TradePriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradePriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradePrice model
   */
  readonly fields: TradePriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradePrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradePriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    history<T extends TradePrice$historyArgs<ExtArgs> = {}>(args?: Subset<T, TradePrice$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the TradePrice model
   */ 
  interface TradePriceFieldRefs {
    readonly id: FieldRef<"TradePrice", 'String'>
    readonly name: FieldRef<"TradePrice", 'String'>
    readonly normalized: FieldRef<"TradePrice", 'String'>
    readonly slug: FieldRef<"TradePrice", 'String'>
    readonly category: FieldRef<"TradePrice", 'String'>
    readonly rarityPct: FieldRef<"TradePrice", 'Float'>
    readonly emoji: FieldRef<"TradePrice", 'String'>
    readonly value: FieldRef<"TradePrice", 'Float'>
    readonly keys: FieldRef<"TradePrice", 'Float'>
    readonly scrolls: FieldRef<"TradePrice", 'Float'>
    readonly demand: FieldRef<"TradePrice", 'Int'>
    readonly rateOfChange: FieldRef<"TradePrice", 'String'>
    readonly prestige: FieldRef<"TradePrice", 'Int'>
    readonly status: FieldRef<"TradePrice", 'String'>
    readonly obtainedFrom: FieldRef<"TradePrice", 'String'>
    readonly taxGems: FieldRef<"TradePrice", 'Float'>
    readonly taxGold: FieldRef<"TradePrice", 'Float'>
    readonly apiId: FieldRef<"TradePrice", 'String'>
    readonly apiUpdatedAt: FieldRef<"TradePrice", 'DateTime'>
    readonly updatedAt: FieldRef<"TradePrice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradePrice findUnique
   */
  export type TradePriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * Filter, which TradePrice to fetch.
     */
    where: TradePriceWhereUniqueInput
  }

  /**
   * TradePrice findUniqueOrThrow
   */
  export type TradePriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * Filter, which TradePrice to fetch.
     */
    where: TradePriceWhereUniqueInput
  }

  /**
   * TradePrice findFirst
   */
  export type TradePriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * Filter, which TradePrice to fetch.
     */
    where?: TradePriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePrices to fetch.
     */
    orderBy?: TradePriceOrderByWithRelationInput | TradePriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradePrices.
     */
    cursor?: TradePriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradePrices.
     */
    distinct?: TradePriceScalarFieldEnum | TradePriceScalarFieldEnum[]
  }

  /**
   * TradePrice findFirstOrThrow
   */
  export type TradePriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * Filter, which TradePrice to fetch.
     */
    where?: TradePriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePrices to fetch.
     */
    orderBy?: TradePriceOrderByWithRelationInput | TradePriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradePrices.
     */
    cursor?: TradePriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradePrices.
     */
    distinct?: TradePriceScalarFieldEnum | TradePriceScalarFieldEnum[]
  }

  /**
   * TradePrice findMany
   */
  export type TradePriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * Filter, which TradePrices to fetch.
     */
    where?: TradePriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePrices to fetch.
     */
    orderBy?: TradePriceOrderByWithRelationInput | TradePriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradePrices.
     */
    cursor?: TradePriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePrices.
     */
    skip?: number
    distinct?: TradePriceScalarFieldEnum | TradePriceScalarFieldEnum[]
  }

  /**
   * TradePrice create
   */
  export type TradePriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * The data needed to create a TradePrice.
     */
    data: XOR<TradePriceCreateInput, TradePriceUncheckedCreateInput>
  }

  /**
   * TradePrice createMany
   */
  export type TradePriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradePrices.
     */
    data: TradePriceCreateManyInput | TradePriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradePrice createManyAndReturn
   */
  export type TradePriceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TradePrices.
     */
    data: TradePriceCreateManyInput | TradePriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradePrice update
   */
  export type TradePriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * The data needed to update a TradePrice.
     */
    data: XOR<TradePriceUpdateInput, TradePriceUncheckedUpdateInput>
    /**
     * Choose, which TradePrice to update.
     */
    where: TradePriceWhereUniqueInput
  }

  /**
   * TradePrice updateMany
   */
  export type TradePriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradePrices.
     */
    data: XOR<TradePriceUpdateManyMutationInput, TradePriceUncheckedUpdateManyInput>
    /**
     * Filter which TradePrices to update
     */
    where?: TradePriceWhereInput
  }

  /**
   * TradePrice upsert
   */
  export type TradePriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * The filter to search for the TradePrice to update in case it exists.
     */
    where: TradePriceWhereUniqueInput
    /**
     * In case the TradePrice found by the `where` argument doesn't exist, create a new TradePrice with this data.
     */
    create: XOR<TradePriceCreateInput, TradePriceUncheckedCreateInput>
    /**
     * In case the TradePrice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradePriceUpdateInput, TradePriceUncheckedUpdateInput>
  }

  /**
   * TradePrice delete
   */
  export type TradePriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
    /**
     * Filter which TradePrice to delete.
     */
    where: TradePriceWhereUniqueInput
  }

  /**
   * TradePrice deleteMany
   */
  export type TradePriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradePrices to delete
     */
    where?: TradePriceWhereInput
  }

  /**
   * TradePrice.history
   */
  export type TradePrice$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    where?: TradePriceHistoryWhereInput
    orderBy?: TradePriceHistoryOrderByWithRelationInput | TradePriceHistoryOrderByWithRelationInput[]
    cursor?: TradePriceHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradePriceHistoryScalarFieldEnum | TradePriceHistoryScalarFieldEnum[]
  }

  /**
   * TradePrice without action
   */
  export type TradePriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePrice
     */
    select?: TradePriceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceInclude<ExtArgs> | null
  }


  /**
   * Model TradePriceHistory
   */

  export type AggregateTradePriceHistory = {
    _count: TradePriceHistoryCountAggregateOutputType | null
    _avg: TradePriceHistoryAvgAggregateOutputType | null
    _sum: TradePriceHistorySumAggregateOutputType | null
    _min: TradePriceHistoryMinAggregateOutputType | null
    _max: TradePriceHistoryMaxAggregateOutputType | null
  }

  export type TradePriceHistoryAvgAggregateOutputType = {
    id: number | null
    value: number | null
    demand: number | null
  }

  export type TradePriceHistorySumAggregateOutputType = {
    id: number | null
    value: number | null
    demand: number | null
  }

  export type TradePriceHistoryMinAggregateOutputType = {
    id: number | null
    itemId: string | null
    value: number | null
    demand: number | null
    recordedAt: Date | null
  }

  export type TradePriceHistoryMaxAggregateOutputType = {
    id: number | null
    itemId: string | null
    value: number | null
    demand: number | null
    recordedAt: Date | null
  }

  export type TradePriceHistoryCountAggregateOutputType = {
    id: number
    itemId: number
    value: number
    demand: number
    recordedAt: number
    _all: number
  }


  export type TradePriceHistoryAvgAggregateInputType = {
    id?: true
    value?: true
    demand?: true
  }

  export type TradePriceHistorySumAggregateInputType = {
    id?: true
    value?: true
    demand?: true
  }

  export type TradePriceHistoryMinAggregateInputType = {
    id?: true
    itemId?: true
    value?: true
    demand?: true
    recordedAt?: true
  }

  export type TradePriceHistoryMaxAggregateInputType = {
    id?: true
    itemId?: true
    value?: true
    demand?: true
    recordedAt?: true
  }

  export type TradePriceHistoryCountAggregateInputType = {
    id?: true
    itemId?: true
    value?: true
    demand?: true
    recordedAt?: true
    _all?: true
  }

  export type TradePriceHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradePriceHistory to aggregate.
     */
    where?: TradePriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePriceHistories to fetch.
     */
    orderBy?: TradePriceHistoryOrderByWithRelationInput | TradePriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradePriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradePriceHistories
    **/
    _count?: true | TradePriceHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradePriceHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradePriceHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradePriceHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradePriceHistoryMaxAggregateInputType
  }

  export type GetTradePriceHistoryAggregateType<T extends TradePriceHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateTradePriceHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradePriceHistory[P]>
      : GetScalarType<T[P], AggregateTradePriceHistory[P]>
  }




  export type TradePriceHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradePriceHistoryWhereInput
    orderBy?: TradePriceHistoryOrderByWithAggregationInput | TradePriceHistoryOrderByWithAggregationInput[]
    by: TradePriceHistoryScalarFieldEnum[] | TradePriceHistoryScalarFieldEnum
    having?: TradePriceHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradePriceHistoryCountAggregateInputType | true
    _avg?: TradePriceHistoryAvgAggregateInputType
    _sum?: TradePriceHistorySumAggregateInputType
    _min?: TradePriceHistoryMinAggregateInputType
    _max?: TradePriceHistoryMaxAggregateInputType
  }

  export type TradePriceHistoryGroupByOutputType = {
    id: number
    itemId: string
    value: number | null
    demand: number | null
    recordedAt: Date
    _count: TradePriceHistoryCountAggregateOutputType | null
    _avg: TradePriceHistoryAvgAggregateOutputType | null
    _sum: TradePriceHistorySumAggregateOutputType | null
    _min: TradePriceHistoryMinAggregateOutputType | null
    _max: TradePriceHistoryMaxAggregateOutputType | null
  }

  type GetTradePriceHistoryGroupByPayload<T extends TradePriceHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradePriceHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradePriceHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradePriceHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], TradePriceHistoryGroupByOutputType[P]>
        }
      >
    >


  export type TradePriceHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    value?: boolean
    demand?: boolean
    recordedAt?: boolean
    item?: boolean | TradePriceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradePriceHistory"]>

  export type TradePriceHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    value?: boolean
    demand?: boolean
    recordedAt?: boolean
    item?: boolean | TradePriceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradePriceHistory"]>

  export type TradePriceHistorySelectScalar = {
    id?: boolean
    itemId?: boolean
    value?: boolean
    demand?: boolean
    recordedAt?: boolean
  }

  export type TradePriceHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | TradePriceDefaultArgs<ExtArgs>
  }
  export type TradePriceHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | TradePriceDefaultArgs<ExtArgs>
  }

  export type $TradePriceHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradePriceHistory"
    objects: {
      item: Prisma.$TradePricePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      itemId: string
      value: number | null
      demand: number | null
      recordedAt: Date
    }, ExtArgs["result"]["tradePriceHistory"]>
    composites: {}
  }

  type TradePriceHistoryGetPayload<S extends boolean | null | undefined | TradePriceHistoryDefaultArgs> = $Result.GetResult<Prisma.$TradePriceHistoryPayload, S>

  type TradePriceHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TradePriceHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TradePriceHistoryCountAggregateInputType | true
    }

  export interface TradePriceHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradePriceHistory'], meta: { name: 'TradePriceHistory' } }
    /**
     * Find zero or one TradePriceHistory that matches the filter.
     * @param {TradePriceHistoryFindUniqueArgs} args - Arguments to find a TradePriceHistory
     * @example
     * // Get one TradePriceHistory
     * const tradePriceHistory = await prisma.tradePriceHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradePriceHistoryFindUniqueArgs>(args: SelectSubset<T, TradePriceHistoryFindUniqueArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TradePriceHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TradePriceHistoryFindUniqueOrThrowArgs} args - Arguments to find a TradePriceHistory
     * @example
     * // Get one TradePriceHistory
     * const tradePriceHistory = await prisma.tradePriceHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradePriceHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, TradePriceHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TradePriceHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceHistoryFindFirstArgs} args - Arguments to find a TradePriceHistory
     * @example
     * // Get one TradePriceHistory
     * const tradePriceHistory = await prisma.tradePriceHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradePriceHistoryFindFirstArgs>(args?: SelectSubset<T, TradePriceHistoryFindFirstArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TradePriceHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceHistoryFindFirstOrThrowArgs} args - Arguments to find a TradePriceHistory
     * @example
     * // Get one TradePriceHistory
     * const tradePriceHistory = await prisma.tradePriceHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradePriceHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, TradePriceHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TradePriceHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradePriceHistories
     * const tradePriceHistories = await prisma.tradePriceHistory.findMany()
     * 
     * // Get first 10 TradePriceHistories
     * const tradePriceHistories = await prisma.tradePriceHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradePriceHistoryWithIdOnly = await prisma.tradePriceHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradePriceHistoryFindManyArgs>(args?: SelectSubset<T, TradePriceHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TradePriceHistory.
     * @param {TradePriceHistoryCreateArgs} args - Arguments to create a TradePriceHistory.
     * @example
     * // Create one TradePriceHistory
     * const TradePriceHistory = await prisma.tradePriceHistory.create({
     *   data: {
     *     // ... data to create a TradePriceHistory
     *   }
     * })
     * 
     */
    create<T extends TradePriceHistoryCreateArgs>(args: SelectSubset<T, TradePriceHistoryCreateArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TradePriceHistories.
     * @param {TradePriceHistoryCreateManyArgs} args - Arguments to create many TradePriceHistories.
     * @example
     * // Create many TradePriceHistories
     * const tradePriceHistory = await prisma.tradePriceHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradePriceHistoryCreateManyArgs>(args?: SelectSubset<T, TradePriceHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradePriceHistories and returns the data saved in the database.
     * @param {TradePriceHistoryCreateManyAndReturnArgs} args - Arguments to create many TradePriceHistories.
     * @example
     * // Create many TradePriceHistories
     * const tradePriceHistory = await prisma.tradePriceHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradePriceHistories and only return the `id`
     * const tradePriceHistoryWithIdOnly = await prisma.tradePriceHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradePriceHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, TradePriceHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TradePriceHistory.
     * @param {TradePriceHistoryDeleteArgs} args - Arguments to delete one TradePriceHistory.
     * @example
     * // Delete one TradePriceHistory
     * const TradePriceHistory = await prisma.tradePriceHistory.delete({
     *   where: {
     *     // ... filter to delete one TradePriceHistory
     *   }
     * })
     * 
     */
    delete<T extends TradePriceHistoryDeleteArgs>(args: SelectSubset<T, TradePriceHistoryDeleteArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TradePriceHistory.
     * @param {TradePriceHistoryUpdateArgs} args - Arguments to update one TradePriceHistory.
     * @example
     * // Update one TradePriceHistory
     * const tradePriceHistory = await prisma.tradePriceHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradePriceHistoryUpdateArgs>(args: SelectSubset<T, TradePriceHistoryUpdateArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TradePriceHistories.
     * @param {TradePriceHistoryDeleteManyArgs} args - Arguments to filter TradePriceHistories to delete.
     * @example
     * // Delete a few TradePriceHistories
     * const { count } = await prisma.tradePriceHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradePriceHistoryDeleteManyArgs>(args?: SelectSubset<T, TradePriceHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradePriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradePriceHistories
     * const tradePriceHistory = await prisma.tradePriceHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradePriceHistoryUpdateManyArgs>(args: SelectSubset<T, TradePriceHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TradePriceHistory.
     * @param {TradePriceHistoryUpsertArgs} args - Arguments to update or create a TradePriceHistory.
     * @example
     * // Update or create a TradePriceHistory
     * const tradePriceHistory = await prisma.tradePriceHistory.upsert({
     *   create: {
     *     // ... data to create a TradePriceHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradePriceHistory we want to update
     *   }
     * })
     */
    upsert<T extends TradePriceHistoryUpsertArgs>(args: SelectSubset<T, TradePriceHistoryUpsertArgs<ExtArgs>>): Prisma__TradePriceHistoryClient<$Result.GetResult<Prisma.$TradePriceHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TradePriceHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceHistoryCountArgs} args - Arguments to filter TradePriceHistories to count.
     * @example
     * // Count the number of TradePriceHistories
     * const count = await prisma.tradePriceHistory.count({
     *   where: {
     *     // ... the filter for the TradePriceHistories we want to count
     *   }
     * })
    **/
    count<T extends TradePriceHistoryCountArgs>(
      args?: Subset<T, TradePriceHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradePriceHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradePriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TradePriceHistoryAggregateArgs>(args: Subset<T, TradePriceHistoryAggregateArgs>): Prisma.PrismaPromise<GetTradePriceHistoryAggregateType<T>>

    /**
     * Group by TradePriceHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradePriceHistoryGroupByArgs} args - Group by arguments.
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
      T extends TradePriceHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradePriceHistoryGroupByArgs['orderBy'] }
        : { orderBy?: TradePriceHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TradePriceHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradePriceHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradePriceHistory model
   */
  readonly fields: TradePriceHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradePriceHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradePriceHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends TradePriceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TradePriceDefaultArgs<ExtArgs>>): Prisma__TradePriceClient<$Result.GetResult<Prisma.$TradePricePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the TradePriceHistory model
   */ 
  interface TradePriceHistoryFieldRefs {
    readonly id: FieldRef<"TradePriceHistory", 'Int'>
    readonly itemId: FieldRef<"TradePriceHistory", 'String'>
    readonly value: FieldRef<"TradePriceHistory", 'Float'>
    readonly demand: FieldRef<"TradePriceHistory", 'Int'>
    readonly recordedAt: FieldRef<"TradePriceHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradePriceHistory findUnique
   */
  export type TradePriceHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradePriceHistory to fetch.
     */
    where: TradePriceHistoryWhereUniqueInput
  }

  /**
   * TradePriceHistory findUniqueOrThrow
   */
  export type TradePriceHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradePriceHistory to fetch.
     */
    where: TradePriceHistoryWhereUniqueInput
  }

  /**
   * TradePriceHistory findFirst
   */
  export type TradePriceHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradePriceHistory to fetch.
     */
    where?: TradePriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePriceHistories to fetch.
     */
    orderBy?: TradePriceHistoryOrderByWithRelationInput | TradePriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradePriceHistories.
     */
    cursor?: TradePriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradePriceHistories.
     */
    distinct?: TradePriceHistoryScalarFieldEnum | TradePriceHistoryScalarFieldEnum[]
  }

  /**
   * TradePriceHistory findFirstOrThrow
   */
  export type TradePriceHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradePriceHistory to fetch.
     */
    where?: TradePriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePriceHistories to fetch.
     */
    orderBy?: TradePriceHistoryOrderByWithRelationInput | TradePriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradePriceHistories.
     */
    cursor?: TradePriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePriceHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradePriceHistories.
     */
    distinct?: TradePriceHistoryScalarFieldEnum | TradePriceHistoryScalarFieldEnum[]
  }

  /**
   * TradePriceHistory findMany
   */
  export type TradePriceHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * Filter, which TradePriceHistories to fetch.
     */
    where?: TradePriceHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradePriceHistories to fetch.
     */
    orderBy?: TradePriceHistoryOrderByWithRelationInput | TradePriceHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradePriceHistories.
     */
    cursor?: TradePriceHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradePriceHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradePriceHistories.
     */
    skip?: number
    distinct?: TradePriceHistoryScalarFieldEnum | TradePriceHistoryScalarFieldEnum[]
  }

  /**
   * TradePriceHistory create
   */
  export type TradePriceHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a TradePriceHistory.
     */
    data: XOR<TradePriceHistoryCreateInput, TradePriceHistoryUncheckedCreateInput>
  }

  /**
   * TradePriceHistory createMany
   */
  export type TradePriceHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradePriceHistories.
     */
    data: TradePriceHistoryCreateManyInput | TradePriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradePriceHistory createManyAndReturn
   */
  export type TradePriceHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TradePriceHistories.
     */
    data: TradePriceHistoryCreateManyInput | TradePriceHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradePriceHistory update
   */
  export type TradePriceHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a TradePriceHistory.
     */
    data: XOR<TradePriceHistoryUpdateInput, TradePriceHistoryUncheckedUpdateInput>
    /**
     * Choose, which TradePriceHistory to update.
     */
    where: TradePriceHistoryWhereUniqueInput
  }

  /**
   * TradePriceHistory updateMany
   */
  export type TradePriceHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradePriceHistories.
     */
    data: XOR<TradePriceHistoryUpdateManyMutationInput, TradePriceHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TradePriceHistories to update
     */
    where?: TradePriceHistoryWhereInput
  }

  /**
   * TradePriceHistory upsert
   */
  export type TradePriceHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the TradePriceHistory to update in case it exists.
     */
    where: TradePriceHistoryWhereUniqueInput
    /**
     * In case the TradePriceHistory found by the `where` argument doesn't exist, create a new TradePriceHistory with this data.
     */
    create: XOR<TradePriceHistoryCreateInput, TradePriceHistoryUncheckedCreateInput>
    /**
     * In case the TradePriceHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradePriceHistoryUpdateInput, TradePriceHistoryUncheckedUpdateInput>
  }

  /**
   * TradePriceHistory delete
   */
  export type TradePriceHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
    /**
     * Filter which TradePriceHistory to delete.
     */
    where: TradePriceHistoryWhereUniqueInput
  }

  /**
   * TradePriceHistory deleteMany
   */
  export type TradePriceHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradePriceHistories to delete
     */
    where?: TradePriceHistoryWhereInput
  }

  /**
   * TradePriceHistory without action
   */
  export type TradePriceHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradePriceHistory
     */
    select?: TradePriceHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradePriceHistoryInclude<ExtArgs> | null
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
    welcomeChannelId: string | null
    memberCountChannelId: string | null
    updatedAt: Date | null
  }

  export type GuildConfigMaxAggregateOutputType = {
    id: string | null
    guildId: string | null
    defaultPrefix: string | null
    officialChannelId: string | null
    tradeChannelId: string | null
    welcomeChannelId: string | null
    memberCountChannelId: string | null
    updatedAt: Date | null
  }

  export type GuildConfigCountAggregateOutputType = {
    id: number
    guildId: number
    defaultPrefix: number
    officialChannelId: number
    tradeChannelId: number
    welcomeChannelId: number
    memberCountChannelId: number
    updatedAt: number
    _all: number
  }


  export type GuildConfigMinAggregateInputType = {
    id?: true
    guildId?: true
    defaultPrefix?: true
    officialChannelId?: true
    tradeChannelId?: true
    welcomeChannelId?: true
    memberCountChannelId?: true
    updatedAt?: true
  }

  export type GuildConfigMaxAggregateInputType = {
    id?: true
    guildId?: true
    defaultPrefix?: true
    officialChannelId?: true
    tradeChannelId?: true
    welcomeChannelId?: true
    memberCountChannelId?: true
    updatedAt?: true
  }

  export type GuildConfigCountAggregateInputType = {
    id?: true
    guildId?: true
    defaultPrefix?: true
    officialChannelId?: true
    tradeChannelId?: true
    welcomeChannelId?: true
    memberCountChannelId?: true
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
    welcomeChannelId: string | null
    memberCountChannelId: string | null
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
    welcomeChannelId?: boolean
    memberCountChannelId?: boolean
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
    welcomeChannelId?: boolean
    memberCountChannelId?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guildConfig"]>

  export type GuildConfigSelectScalar = {
    id?: boolean
    guildId?: boolean
    defaultPrefix?: boolean
    officialChannelId?: boolean
    tradeChannelId?: boolean
    welcomeChannelId?: boolean
    memberCountChannelId?: boolean
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
      welcomeChannelId: string | null
      memberCountChannelId: string | null
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
    readonly welcomeChannelId: FieldRef<"GuildConfig", 'String'>
    readonly memberCountChannelId: FieldRef<"GuildConfig", 'String'>
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


  export const OfficialPriceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    normalized: 'normalized',
    slug: 'slug',
    category: 'category',
    rarityLabel: 'rarityLabel',
    demand: 'demand',
    keys: 'keys',
    scrolls: 'scrolls',
    vizards: 'vizards',
    rateOfChange: 'rateOfChange',
    taxGems: 'taxGems',
    taxGold: 'taxGold',
    sheet: 'sheet',
    existingAmount: 'existingAmount',
    updatedAt: 'updatedAt'
  };

  export type OfficialPriceScalarFieldEnum = (typeof OfficialPriceScalarFieldEnum)[keyof typeof OfficialPriceScalarFieldEnum]


  export const OfficialPriceHistoryScalarFieldEnum: {
    id: 'id',
    itemId: 'itemId',
    keys: 'keys',
    scrolls: 'scrolls',
    vizards: 'vizards',
    recordedAt: 'recordedAt'
  };

  export type OfficialPriceHistoryScalarFieldEnum = (typeof OfficialPriceHistoryScalarFieldEnum)[keyof typeof OfficialPriceHistoryScalarFieldEnum]


  export const TradePriceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    normalized: 'normalized',
    slug: 'slug',
    category: 'category',
    rarityPct: 'rarityPct',
    emoji: 'emoji',
    value: 'value',
    keys: 'keys',
    scrolls: 'scrolls',
    demand: 'demand',
    rateOfChange: 'rateOfChange',
    prestige: 'prestige',
    status: 'status',
    obtainedFrom: 'obtainedFrom',
    taxGems: 'taxGems',
    taxGold: 'taxGold',
    apiId: 'apiId',
    apiUpdatedAt: 'apiUpdatedAt',
    updatedAt: 'updatedAt'
  };

  export type TradePriceScalarFieldEnum = (typeof TradePriceScalarFieldEnum)[keyof typeof TradePriceScalarFieldEnum]


  export const TradePriceHistoryScalarFieldEnum: {
    id: 'id',
    itemId: 'itemId',
    value: 'value',
    demand: 'demand',
    recordedAt: 'recordedAt'
  };

  export type TradePriceHistoryScalarFieldEnum = (typeof TradePriceHistoryScalarFieldEnum)[keyof typeof TradePriceHistoryScalarFieldEnum]


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
    welcomeChannelId: 'welcomeChannelId',
    memberCountChannelId: 'memberCountChannelId',
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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type OfficialPriceWhereInput = {
    AND?: OfficialPriceWhereInput | OfficialPriceWhereInput[]
    OR?: OfficialPriceWhereInput[]
    NOT?: OfficialPriceWhereInput | OfficialPriceWhereInput[]
    id?: StringFilter<"OfficialPrice"> | string
    name?: StringFilter<"OfficialPrice"> | string
    normalized?: StringFilter<"OfficialPrice"> | string
    slug?: StringFilter<"OfficialPrice"> | string
    category?: StringNullableFilter<"OfficialPrice"> | string | null
    rarityLabel?: StringNullableFilter<"OfficialPrice"> | string | null
    demand?: StringNullableFilter<"OfficialPrice"> | string | null
    keys?: JsonNullableFilter<"OfficialPrice">
    scrolls?: JsonNullableFilter<"OfficialPrice">
    vizards?: JsonNullableFilter<"OfficialPrice">
    rateOfChange?: StringNullableFilter<"OfficialPrice"> | string | null
    taxGems?: FloatNullableFilter<"OfficialPrice"> | number | null
    taxGold?: FloatNullableFilter<"OfficialPrice"> | number | null
    sheet?: StringNullableFilter<"OfficialPrice"> | string | null
    existingAmount?: StringNullableFilter<"OfficialPrice"> | string | null
    updatedAt?: DateTimeFilter<"OfficialPrice"> | Date | string
    history?: OfficialPriceHistoryListRelationFilter
  }

  export type OfficialPriceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    rarityLabel?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    keys?: SortOrderInput | SortOrder
    scrolls?: SortOrderInput | SortOrder
    vizards?: SortOrderInput | SortOrder
    rateOfChange?: SortOrderInput | SortOrder
    taxGems?: SortOrderInput | SortOrder
    taxGold?: SortOrderInput | SortOrder
    sheet?: SortOrderInput | SortOrder
    existingAmount?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    history?: OfficialPriceHistoryOrderByRelationAggregateInput
  }

  export type OfficialPriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    normalized?: string
    slug?: string
    AND?: OfficialPriceWhereInput | OfficialPriceWhereInput[]
    OR?: OfficialPriceWhereInput[]
    NOT?: OfficialPriceWhereInput | OfficialPriceWhereInput[]
    name?: StringFilter<"OfficialPrice"> | string
    category?: StringNullableFilter<"OfficialPrice"> | string | null
    rarityLabel?: StringNullableFilter<"OfficialPrice"> | string | null
    demand?: StringNullableFilter<"OfficialPrice"> | string | null
    keys?: JsonNullableFilter<"OfficialPrice">
    scrolls?: JsonNullableFilter<"OfficialPrice">
    vizards?: JsonNullableFilter<"OfficialPrice">
    rateOfChange?: StringNullableFilter<"OfficialPrice"> | string | null
    taxGems?: FloatNullableFilter<"OfficialPrice"> | number | null
    taxGold?: FloatNullableFilter<"OfficialPrice"> | number | null
    sheet?: StringNullableFilter<"OfficialPrice"> | string | null
    existingAmount?: StringNullableFilter<"OfficialPrice"> | string | null
    updatedAt?: DateTimeFilter<"OfficialPrice"> | Date | string
    history?: OfficialPriceHistoryListRelationFilter
  }, "id" | "normalized" | "slug">

  export type OfficialPriceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    rarityLabel?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    keys?: SortOrderInput | SortOrder
    scrolls?: SortOrderInput | SortOrder
    vizards?: SortOrderInput | SortOrder
    rateOfChange?: SortOrderInput | SortOrder
    taxGems?: SortOrderInput | SortOrder
    taxGold?: SortOrderInput | SortOrder
    sheet?: SortOrderInput | SortOrder
    existingAmount?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: OfficialPriceCountOrderByAggregateInput
    _avg?: OfficialPriceAvgOrderByAggregateInput
    _max?: OfficialPriceMaxOrderByAggregateInput
    _min?: OfficialPriceMinOrderByAggregateInput
    _sum?: OfficialPriceSumOrderByAggregateInput
  }

  export type OfficialPriceScalarWhereWithAggregatesInput = {
    AND?: OfficialPriceScalarWhereWithAggregatesInput | OfficialPriceScalarWhereWithAggregatesInput[]
    OR?: OfficialPriceScalarWhereWithAggregatesInput[]
    NOT?: OfficialPriceScalarWhereWithAggregatesInput | OfficialPriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OfficialPrice"> | string
    name?: StringWithAggregatesFilter<"OfficialPrice"> | string
    normalized?: StringWithAggregatesFilter<"OfficialPrice"> | string
    slug?: StringWithAggregatesFilter<"OfficialPrice"> | string
    category?: StringNullableWithAggregatesFilter<"OfficialPrice"> | string | null
    rarityLabel?: StringNullableWithAggregatesFilter<"OfficialPrice"> | string | null
    demand?: StringNullableWithAggregatesFilter<"OfficialPrice"> | string | null
    keys?: JsonNullableWithAggregatesFilter<"OfficialPrice">
    scrolls?: JsonNullableWithAggregatesFilter<"OfficialPrice">
    vizards?: JsonNullableWithAggregatesFilter<"OfficialPrice">
    rateOfChange?: StringNullableWithAggregatesFilter<"OfficialPrice"> | string | null
    taxGems?: FloatNullableWithAggregatesFilter<"OfficialPrice"> | number | null
    taxGold?: FloatNullableWithAggregatesFilter<"OfficialPrice"> | number | null
    sheet?: StringNullableWithAggregatesFilter<"OfficialPrice"> | string | null
    existingAmount?: StringNullableWithAggregatesFilter<"OfficialPrice"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"OfficialPrice"> | Date | string
  }

  export type OfficialPriceHistoryWhereInput = {
    AND?: OfficialPriceHistoryWhereInput | OfficialPriceHistoryWhereInput[]
    OR?: OfficialPriceHistoryWhereInput[]
    NOT?: OfficialPriceHistoryWhereInput | OfficialPriceHistoryWhereInput[]
    id?: IntFilter<"OfficialPriceHistory"> | number
    itemId?: StringFilter<"OfficialPriceHistory"> | string
    keys?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    scrolls?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    vizards?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"OfficialPriceHistory"> | Date | string
    item?: XOR<OfficialPriceRelationFilter, OfficialPriceWhereInput>
  }

  export type OfficialPriceHistoryOrderByWithRelationInput = {
    id?: SortOrder
    itemId?: SortOrder
    keys?: SortOrderInput | SortOrder
    scrolls?: SortOrderInput | SortOrder
    vizards?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    item?: OfficialPriceOrderByWithRelationInput
  }

  export type OfficialPriceHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    itemId_recordedAt?: OfficialPriceHistoryItemIdRecordedAtCompoundUniqueInput
    AND?: OfficialPriceHistoryWhereInput | OfficialPriceHistoryWhereInput[]
    OR?: OfficialPriceHistoryWhereInput[]
    NOT?: OfficialPriceHistoryWhereInput | OfficialPriceHistoryWhereInput[]
    itemId?: StringFilter<"OfficialPriceHistory"> | string
    keys?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    scrolls?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    vizards?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"OfficialPriceHistory"> | Date | string
    item?: XOR<OfficialPriceRelationFilter, OfficialPriceWhereInput>
  }, "id" | "itemId_recordedAt">

  export type OfficialPriceHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    itemId?: SortOrder
    keys?: SortOrderInput | SortOrder
    scrolls?: SortOrderInput | SortOrder
    vizards?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    _count?: OfficialPriceHistoryCountOrderByAggregateInput
    _avg?: OfficialPriceHistoryAvgOrderByAggregateInput
    _max?: OfficialPriceHistoryMaxOrderByAggregateInput
    _min?: OfficialPriceHistoryMinOrderByAggregateInput
    _sum?: OfficialPriceHistorySumOrderByAggregateInput
  }

  export type OfficialPriceHistoryScalarWhereWithAggregatesInput = {
    AND?: OfficialPriceHistoryScalarWhereWithAggregatesInput | OfficialPriceHistoryScalarWhereWithAggregatesInput[]
    OR?: OfficialPriceHistoryScalarWhereWithAggregatesInput[]
    NOT?: OfficialPriceHistoryScalarWhereWithAggregatesInput | OfficialPriceHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OfficialPriceHistory"> | number
    itemId?: StringWithAggregatesFilter<"OfficialPriceHistory"> | string
    keys?: FloatNullableWithAggregatesFilter<"OfficialPriceHistory"> | number | null
    scrolls?: FloatNullableWithAggregatesFilter<"OfficialPriceHistory"> | number | null
    vizards?: FloatNullableWithAggregatesFilter<"OfficialPriceHistory"> | number | null
    recordedAt?: DateTimeWithAggregatesFilter<"OfficialPriceHistory"> | Date | string
  }

  export type TradePriceWhereInput = {
    AND?: TradePriceWhereInput | TradePriceWhereInput[]
    OR?: TradePriceWhereInput[]
    NOT?: TradePriceWhereInput | TradePriceWhereInput[]
    id?: StringFilter<"TradePrice"> | string
    name?: StringFilter<"TradePrice"> | string
    normalized?: StringFilter<"TradePrice"> | string
    slug?: StringFilter<"TradePrice"> | string
    category?: StringNullableFilter<"TradePrice"> | string | null
    rarityPct?: FloatNullableFilter<"TradePrice"> | number | null
    emoji?: StringNullableFilter<"TradePrice"> | string | null
    value?: FloatNullableFilter<"TradePrice"> | number | null
    keys?: FloatNullableFilter<"TradePrice"> | number | null
    scrolls?: FloatNullableFilter<"TradePrice"> | number | null
    demand?: IntNullableFilter<"TradePrice"> | number | null
    rateOfChange?: StringNullableFilter<"TradePrice"> | string | null
    prestige?: IntNullableFilter<"TradePrice"> | number | null
    status?: StringNullableFilter<"TradePrice"> | string | null
    obtainedFrom?: StringNullableFilter<"TradePrice"> | string | null
    taxGems?: FloatNullableFilter<"TradePrice"> | number | null
    taxGold?: FloatNullableFilter<"TradePrice"> | number | null
    apiId?: StringNullableFilter<"TradePrice"> | string | null
    apiUpdatedAt?: DateTimeNullableFilter<"TradePrice"> | Date | string | null
    updatedAt?: DateTimeFilter<"TradePrice"> | Date | string
    history?: TradePriceHistoryListRelationFilter
  }

  export type TradePriceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    rarityPct?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    keys?: SortOrderInput | SortOrder
    scrolls?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    rateOfChange?: SortOrderInput | SortOrder
    prestige?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    obtainedFrom?: SortOrderInput | SortOrder
    taxGems?: SortOrderInput | SortOrder
    taxGold?: SortOrderInput | SortOrder
    apiId?: SortOrderInput | SortOrder
    apiUpdatedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    history?: TradePriceHistoryOrderByRelationAggregateInput
  }

  export type TradePriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    normalized?: string
    slug?: string
    AND?: TradePriceWhereInput | TradePriceWhereInput[]
    OR?: TradePriceWhereInput[]
    NOT?: TradePriceWhereInput | TradePriceWhereInput[]
    name?: StringFilter<"TradePrice"> | string
    category?: StringNullableFilter<"TradePrice"> | string | null
    rarityPct?: FloatNullableFilter<"TradePrice"> | number | null
    emoji?: StringNullableFilter<"TradePrice"> | string | null
    value?: FloatNullableFilter<"TradePrice"> | number | null
    keys?: FloatNullableFilter<"TradePrice"> | number | null
    scrolls?: FloatNullableFilter<"TradePrice"> | number | null
    demand?: IntNullableFilter<"TradePrice"> | number | null
    rateOfChange?: StringNullableFilter<"TradePrice"> | string | null
    prestige?: IntNullableFilter<"TradePrice"> | number | null
    status?: StringNullableFilter<"TradePrice"> | string | null
    obtainedFrom?: StringNullableFilter<"TradePrice"> | string | null
    taxGems?: FloatNullableFilter<"TradePrice"> | number | null
    taxGold?: FloatNullableFilter<"TradePrice"> | number | null
    apiId?: StringNullableFilter<"TradePrice"> | string | null
    apiUpdatedAt?: DateTimeNullableFilter<"TradePrice"> | Date | string | null
    updatedAt?: DateTimeFilter<"TradePrice"> | Date | string
    history?: TradePriceHistoryListRelationFilter
  }, "id" | "normalized" | "slug">

  export type TradePriceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    rarityPct?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    keys?: SortOrderInput | SortOrder
    scrolls?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    rateOfChange?: SortOrderInput | SortOrder
    prestige?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    obtainedFrom?: SortOrderInput | SortOrder
    taxGems?: SortOrderInput | SortOrder
    taxGold?: SortOrderInput | SortOrder
    apiId?: SortOrderInput | SortOrder
    apiUpdatedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: TradePriceCountOrderByAggregateInput
    _avg?: TradePriceAvgOrderByAggregateInput
    _max?: TradePriceMaxOrderByAggregateInput
    _min?: TradePriceMinOrderByAggregateInput
    _sum?: TradePriceSumOrderByAggregateInput
  }

  export type TradePriceScalarWhereWithAggregatesInput = {
    AND?: TradePriceScalarWhereWithAggregatesInput | TradePriceScalarWhereWithAggregatesInput[]
    OR?: TradePriceScalarWhereWithAggregatesInput[]
    NOT?: TradePriceScalarWhereWithAggregatesInput | TradePriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradePrice"> | string
    name?: StringWithAggregatesFilter<"TradePrice"> | string
    normalized?: StringWithAggregatesFilter<"TradePrice"> | string
    slug?: StringWithAggregatesFilter<"TradePrice"> | string
    category?: StringNullableWithAggregatesFilter<"TradePrice"> | string | null
    rarityPct?: FloatNullableWithAggregatesFilter<"TradePrice"> | number | null
    emoji?: StringNullableWithAggregatesFilter<"TradePrice"> | string | null
    value?: FloatNullableWithAggregatesFilter<"TradePrice"> | number | null
    keys?: FloatNullableWithAggregatesFilter<"TradePrice"> | number | null
    scrolls?: FloatNullableWithAggregatesFilter<"TradePrice"> | number | null
    demand?: IntNullableWithAggregatesFilter<"TradePrice"> | number | null
    rateOfChange?: StringNullableWithAggregatesFilter<"TradePrice"> | string | null
    prestige?: IntNullableWithAggregatesFilter<"TradePrice"> | number | null
    status?: StringNullableWithAggregatesFilter<"TradePrice"> | string | null
    obtainedFrom?: StringNullableWithAggregatesFilter<"TradePrice"> | string | null
    taxGems?: FloatNullableWithAggregatesFilter<"TradePrice"> | number | null
    taxGold?: FloatNullableWithAggregatesFilter<"TradePrice"> | number | null
    apiId?: StringNullableWithAggregatesFilter<"TradePrice"> | string | null
    apiUpdatedAt?: DateTimeNullableWithAggregatesFilter<"TradePrice"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"TradePrice"> | Date | string
  }

  export type TradePriceHistoryWhereInput = {
    AND?: TradePriceHistoryWhereInput | TradePriceHistoryWhereInput[]
    OR?: TradePriceHistoryWhereInput[]
    NOT?: TradePriceHistoryWhereInput | TradePriceHistoryWhereInput[]
    id?: IntFilter<"TradePriceHistory"> | number
    itemId?: StringFilter<"TradePriceHistory"> | string
    value?: FloatNullableFilter<"TradePriceHistory"> | number | null
    demand?: IntNullableFilter<"TradePriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"TradePriceHistory"> | Date | string
    item?: XOR<TradePriceRelationFilter, TradePriceWhereInput>
  }

  export type TradePriceHistoryOrderByWithRelationInput = {
    id?: SortOrder
    itemId?: SortOrder
    value?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    item?: TradePriceOrderByWithRelationInput
  }

  export type TradePriceHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    itemId_recordedAt?: TradePriceHistoryItemIdRecordedAtCompoundUniqueInput
    AND?: TradePriceHistoryWhereInput | TradePriceHistoryWhereInput[]
    OR?: TradePriceHistoryWhereInput[]
    NOT?: TradePriceHistoryWhereInput | TradePriceHistoryWhereInput[]
    itemId?: StringFilter<"TradePriceHistory"> | string
    value?: FloatNullableFilter<"TradePriceHistory"> | number | null
    demand?: IntNullableFilter<"TradePriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"TradePriceHistory"> | Date | string
    item?: XOR<TradePriceRelationFilter, TradePriceWhereInput>
  }, "id" | "itemId_recordedAt">

  export type TradePriceHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    itemId?: SortOrder
    value?: SortOrderInput | SortOrder
    demand?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    _count?: TradePriceHistoryCountOrderByAggregateInput
    _avg?: TradePriceHistoryAvgOrderByAggregateInput
    _max?: TradePriceHistoryMaxOrderByAggregateInput
    _min?: TradePriceHistoryMinOrderByAggregateInput
    _sum?: TradePriceHistorySumOrderByAggregateInput
  }

  export type TradePriceHistoryScalarWhereWithAggregatesInput = {
    AND?: TradePriceHistoryScalarWhereWithAggregatesInput | TradePriceHistoryScalarWhereWithAggregatesInput[]
    OR?: TradePriceHistoryScalarWhereWithAggregatesInput[]
    NOT?: TradePriceHistoryScalarWhereWithAggregatesInput | TradePriceHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TradePriceHistory"> | number
    itemId?: StringWithAggregatesFilter<"TradePriceHistory"> | string
    value?: FloatNullableWithAggregatesFilter<"TradePriceHistory"> | number | null
    demand?: IntNullableWithAggregatesFilter<"TradePriceHistory"> | number | null
    recordedAt?: DateTimeWithAggregatesFilter<"TradePriceHistory"> | Date | string
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
    welcomeChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    memberCountChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    updatedAt?: DateTimeFilter<"GuildConfig"> | Date | string
    channels?: ChannelConfigListRelationFilter
  }

  export type GuildConfigOrderByWithRelationInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrderInput | SortOrder
    tradeChannelId?: SortOrderInput | SortOrder
    welcomeChannelId?: SortOrderInput | SortOrder
    memberCountChannelId?: SortOrderInput | SortOrder
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
    welcomeChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    memberCountChannelId?: StringNullableFilter<"GuildConfig"> | string | null
    updatedAt?: DateTimeFilter<"GuildConfig"> | Date | string
    channels?: ChannelConfigListRelationFilter
  }, "id" | "guildId">

  export type GuildConfigOrderByWithAggregationInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrderInput | SortOrder
    tradeChannelId?: SortOrderInput | SortOrder
    welcomeChannelId?: SortOrderInput | SortOrder
    memberCountChannelId?: SortOrderInput | SortOrder
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
    welcomeChannelId?: StringNullableWithAggregatesFilter<"GuildConfig"> | string | null
    memberCountChannelId?: StringNullableWithAggregatesFilter<"GuildConfig"> | string | null
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

  export type OfficialPriceCreateInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    demand?: string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: string | null
    taxGems?: number | null
    taxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    updatedAt?: Date | string
    history?: OfficialPriceHistoryCreateNestedManyWithoutItemInput
  }

  export type OfficialPriceUncheckedCreateInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    demand?: string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: string | null
    taxGems?: number | null
    taxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    updatedAt?: Date | string
    history?: OfficialPriceHistoryUncheckedCreateNestedManyWithoutItemInput
  }

  export type OfficialPriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    demand?: NullableStringFieldUpdateOperationsInput | string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: OfficialPriceHistoryUpdateManyWithoutItemNestedInput
  }

  export type OfficialPriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    demand?: NullableStringFieldUpdateOperationsInput | string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: OfficialPriceHistoryUncheckedUpdateManyWithoutItemNestedInput
  }

  export type OfficialPriceCreateManyInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    demand?: string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: string | null
    taxGems?: number | null
    taxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    updatedAt?: Date | string
  }

  export type OfficialPriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    demand?: NullableStringFieldUpdateOperationsInput | string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    demand?: NullableStringFieldUpdateOperationsInput | string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceHistoryCreateInput = {
    keys?: number | null
    scrolls?: number | null
    vizards?: number | null
    recordedAt?: Date | string
    item: OfficialPriceCreateNestedOneWithoutHistoryInput
  }

  export type OfficialPriceHistoryUncheckedCreateInput = {
    id?: number
    itemId: string
    keys?: number | null
    scrolls?: number | null
    vizards?: number | null
    recordedAt?: Date | string
  }

  export type OfficialPriceHistoryUpdateInput = {
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    vizards?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: OfficialPriceUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type OfficialPriceHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: StringFieldUpdateOperationsInput | string
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    vizards?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceHistoryCreateManyInput = {
    id?: number
    itemId: string
    keys?: number | null
    scrolls?: number | null
    vizards?: number | null
    recordedAt?: Date | string
  }

  export type OfficialPriceHistoryUpdateManyMutationInput = {
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    vizards?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: StringFieldUpdateOperationsInput | string
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    vizards?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceCreateInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityPct?: number | null
    emoji?: string | null
    value?: number | null
    keys?: number | null
    scrolls?: number | null
    demand?: number | null
    rateOfChange?: string | null
    prestige?: number | null
    status?: string | null
    obtainedFrom?: string | null
    taxGems?: number | null
    taxGold?: number | null
    apiId?: string | null
    apiUpdatedAt?: Date | string | null
    updatedAt?: Date | string
    history?: TradePriceHistoryCreateNestedManyWithoutItemInput
  }

  export type TradePriceUncheckedCreateInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityPct?: number | null
    emoji?: string | null
    value?: number | null
    keys?: number | null
    scrolls?: number | null
    demand?: number | null
    rateOfChange?: string | null
    prestige?: number | null
    status?: string | null
    obtainedFrom?: string | null
    taxGems?: number | null
    taxGold?: number | null
    apiId?: string | null
    apiUpdatedAt?: Date | string | null
    updatedAt?: Date | string
    history?: TradePriceHistoryUncheckedCreateNestedManyWithoutItemInput
  }

  export type TradePriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    prestige?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: TradePriceHistoryUpdateManyWithoutItemNestedInput
  }

  export type TradePriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    prestige?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: TradePriceHistoryUncheckedUpdateManyWithoutItemNestedInput
  }

  export type TradePriceCreateManyInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityPct?: number | null
    emoji?: string | null
    value?: number | null
    keys?: number | null
    scrolls?: number | null
    demand?: number | null
    rateOfChange?: string | null
    prestige?: number | null
    status?: string | null
    obtainedFrom?: string | null
    taxGems?: number | null
    taxGold?: number | null
    apiId?: string | null
    apiUpdatedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type TradePriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    prestige?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    prestige?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceHistoryCreateInput = {
    value?: number | null
    demand?: number | null
    recordedAt?: Date | string
    item: TradePriceCreateNestedOneWithoutHistoryInput
  }

  export type TradePriceHistoryUncheckedCreateInput = {
    id?: number
    itemId: string
    value?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type TradePriceHistoryUpdateInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: TradePriceUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type TradePriceHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: StringFieldUpdateOperationsInput | string
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceHistoryCreateManyInput = {
    id?: number
    itemId: string
    value?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type TradePriceHistoryUpdateManyMutationInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemId?: StringFieldUpdateOperationsInput | string
    value?: NullableFloatFieldUpdateOperationsInput | number | null
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
    welcomeChannelId?: string | null
    memberCountChannelId?: string | null
    updatedAt?: Date | string
    channels?: ChannelConfigCreateNestedManyWithoutGuildInput
  }

  export type GuildConfigUncheckedCreateInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    welcomeChannelId?: string | null
    memberCountChannelId?: string | null
    updatedAt?: Date | string
    channels?: ChannelConfigUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    memberCountChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelConfigUpdateManyWithoutGuildNestedInput
  }

  export type GuildConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    memberCountChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channels?: ChannelConfigUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type GuildConfigCreateManyInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    welcomeChannelId?: string | null
    memberCountChannelId?: string | null
    updatedAt?: Date | string
  }

  export type GuildConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    memberCountChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    memberCountChannelId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type OfficialPriceHistoryListRelationFilter = {
    every?: OfficialPriceHistoryWhereInput
    some?: OfficialPriceHistoryWhereInput
    none?: OfficialPriceHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OfficialPriceHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfficialPriceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityLabel?: SortOrder
    demand?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    vizards?: SortOrder
    rateOfChange?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
    sheet?: SortOrder
    existingAmount?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficialPriceAvgOrderByAggregateInput = {
    taxGems?: SortOrder
    taxGold?: SortOrder
  }

  export type OfficialPriceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityLabel?: SortOrder
    demand?: SortOrder
    rateOfChange?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
    sheet?: SortOrder
    existingAmount?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficialPriceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityLabel?: SortOrder
    demand?: SortOrder
    rateOfChange?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
    sheet?: SortOrder
    existingAmount?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfficialPriceSumOrderByAggregateInput = {
    taxGems?: SortOrder
    taxGold?: SortOrder
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

  export type OfficialPriceRelationFilter = {
    is?: OfficialPriceWhereInput
    isNot?: OfficialPriceWhereInput
  }

  export type OfficialPriceHistoryItemIdRecordedAtCompoundUniqueInput = {
    itemId: string
    recordedAt: Date | string
  }

  export type OfficialPriceHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    vizards?: SortOrder
    recordedAt?: SortOrder
  }

  export type OfficialPriceHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    vizards?: SortOrder
  }

  export type OfficialPriceHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    vizards?: SortOrder
    recordedAt?: SortOrder
  }

  export type OfficialPriceHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    vizards?: SortOrder
    recordedAt?: SortOrder
  }

  export type OfficialPriceHistorySumOrderByAggregateInput = {
    id?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    vizards?: SortOrder
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

  export type TradePriceHistoryListRelationFilter = {
    every?: TradePriceHistoryWhereInput
    some?: TradePriceHistoryWhereInput
    none?: TradePriceHistoryWhereInput
  }

  export type TradePriceHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradePriceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityPct?: SortOrder
    emoji?: SortOrder
    value?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    demand?: SortOrder
    rateOfChange?: SortOrder
    prestige?: SortOrder
    status?: SortOrder
    obtainedFrom?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
    apiId?: SortOrder
    apiUpdatedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradePriceAvgOrderByAggregateInput = {
    rarityPct?: SortOrder
    value?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    demand?: SortOrder
    prestige?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
  }

  export type TradePriceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityPct?: SortOrder
    emoji?: SortOrder
    value?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    demand?: SortOrder
    rateOfChange?: SortOrder
    prestige?: SortOrder
    status?: SortOrder
    obtainedFrom?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
    apiId?: SortOrder
    apiUpdatedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradePriceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    rarityPct?: SortOrder
    emoji?: SortOrder
    value?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    demand?: SortOrder
    rateOfChange?: SortOrder
    prestige?: SortOrder
    status?: SortOrder
    obtainedFrom?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
    apiId?: SortOrder
    apiUpdatedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradePriceSumOrderByAggregateInput = {
    rarityPct?: SortOrder
    value?: SortOrder
    keys?: SortOrder
    scrolls?: SortOrder
    demand?: SortOrder
    prestige?: SortOrder
    taxGems?: SortOrder
    taxGold?: SortOrder
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

  export type TradePriceRelationFilter = {
    is?: TradePriceWhereInput
    isNot?: TradePriceWhereInput
  }

  export type TradePriceHistoryItemIdRecordedAtCompoundUniqueInput = {
    itemId: string
    recordedAt: Date | string
  }

  export type TradePriceHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    value?: SortOrder
    demand?: SortOrder
    recordedAt?: SortOrder
  }

  export type TradePriceHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    demand?: SortOrder
  }

  export type TradePriceHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    value?: SortOrder
    demand?: SortOrder
    recordedAt?: SortOrder
  }

  export type TradePriceHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    value?: SortOrder
    demand?: SortOrder
    recordedAt?: SortOrder
  }

  export type TradePriceHistorySumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    demand?: SortOrder
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
    welcomeChannelId?: SortOrder
    memberCountChannelId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuildConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrder
    tradeChannelId?: SortOrder
    welcomeChannelId?: SortOrder
    memberCountChannelId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuildConfigMinOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    defaultPrefix?: SortOrder
    officialChannelId?: SortOrder
    tradeChannelId?: SortOrder
    welcomeChannelId?: SortOrder
    memberCountChannelId?: SortOrder
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

  export type OfficialPriceHistoryCreateNestedManyWithoutItemInput = {
    create?: XOR<OfficialPriceHistoryCreateWithoutItemInput, OfficialPriceHistoryUncheckedCreateWithoutItemInput> | OfficialPriceHistoryCreateWithoutItemInput[] | OfficialPriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OfficialPriceHistoryCreateOrConnectWithoutItemInput | OfficialPriceHistoryCreateOrConnectWithoutItemInput[]
    createMany?: OfficialPriceHistoryCreateManyItemInputEnvelope
    connect?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
  }

  export type OfficialPriceHistoryUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<OfficialPriceHistoryCreateWithoutItemInput, OfficialPriceHistoryUncheckedCreateWithoutItemInput> | OfficialPriceHistoryCreateWithoutItemInput[] | OfficialPriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OfficialPriceHistoryCreateOrConnectWithoutItemInput | OfficialPriceHistoryCreateOrConnectWithoutItemInput[]
    createMany?: OfficialPriceHistoryCreateManyItemInputEnvelope
    connect?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OfficialPriceHistoryUpdateManyWithoutItemNestedInput = {
    create?: XOR<OfficialPriceHistoryCreateWithoutItemInput, OfficialPriceHistoryUncheckedCreateWithoutItemInput> | OfficialPriceHistoryCreateWithoutItemInput[] | OfficialPriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OfficialPriceHistoryCreateOrConnectWithoutItemInput | OfficialPriceHistoryCreateOrConnectWithoutItemInput[]
    upsert?: OfficialPriceHistoryUpsertWithWhereUniqueWithoutItemInput | OfficialPriceHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OfficialPriceHistoryCreateManyItemInputEnvelope
    set?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    disconnect?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    delete?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    connect?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    update?: OfficialPriceHistoryUpdateWithWhereUniqueWithoutItemInput | OfficialPriceHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OfficialPriceHistoryUpdateManyWithWhereWithoutItemInput | OfficialPriceHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OfficialPriceHistoryScalarWhereInput | OfficialPriceHistoryScalarWhereInput[]
  }

  export type OfficialPriceHistoryUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<OfficialPriceHistoryCreateWithoutItemInput, OfficialPriceHistoryUncheckedCreateWithoutItemInput> | OfficialPriceHistoryCreateWithoutItemInput[] | OfficialPriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OfficialPriceHistoryCreateOrConnectWithoutItemInput | OfficialPriceHistoryCreateOrConnectWithoutItemInput[]
    upsert?: OfficialPriceHistoryUpsertWithWhereUniqueWithoutItemInput | OfficialPriceHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OfficialPriceHistoryCreateManyItemInputEnvelope
    set?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    disconnect?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    delete?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    connect?: OfficialPriceHistoryWhereUniqueInput | OfficialPriceHistoryWhereUniqueInput[]
    update?: OfficialPriceHistoryUpdateWithWhereUniqueWithoutItemInput | OfficialPriceHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OfficialPriceHistoryUpdateManyWithWhereWithoutItemInput | OfficialPriceHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OfficialPriceHistoryScalarWhereInput | OfficialPriceHistoryScalarWhereInput[]
  }

  export type OfficialPriceCreateNestedOneWithoutHistoryInput = {
    create?: XOR<OfficialPriceCreateWithoutHistoryInput, OfficialPriceUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: OfficialPriceCreateOrConnectWithoutHistoryInput
    connect?: OfficialPriceWhereUniqueInput
  }

  export type OfficialPriceUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<OfficialPriceCreateWithoutHistoryInput, OfficialPriceUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: OfficialPriceCreateOrConnectWithoutHistoryInput
    upsert?: OfficialPriceUpsertWithoutHistoryInput
    connect?: OfficialPriceWhereUniqueInput
    update?: XOR<XOR<OfficialPriceUpdateToOneWithWhereWithoutHistoryInput, OfficialPriceUpdateWithoutHistoryInput>, OfficialPriceUncheckedUpdateWithoutHistoryInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TradePriceHistoryCreateNestedManyWithoutItemInput = {
    create?: XOR<TradePriceHistoryCreateWithoutItemInput, TradePriceHistoryUncheckedCreateWithoutItemInput> | TradePriceHistoryCreateWithoutItemInput[] | TradePriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradePriceHistoryCreateOrConnectWithoutItemInput | TradePriceHistoryCreateOrConnectWithoutItemInput[]
    createMany?: TradePriceHistoryCreateManyItemInputEnvelope
    connect?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
  }

  export type TradePriceHistoryUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<TradePriceHistoryCreateWithoutItemInput, TradePriceHistoryUncheckedCreateWithoutItemInput> | TradePriceHistoryCreateWithoutItemInput[] | TradePriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradePriceHistoryCreateOrConnectWithoutItemInput | TradePriceHistoryCreateOrConnectWithoutItemInput[]
    createMany?: TradePriceHistoryCreateManyItemInputEnvelope
    connect?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
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

  export type TradePriceHistoryUpdateManyWithoutItemNestedInput = {
    create?: XOR<TradePriceHistoryCreateWithoutItemInput, TradePriceHistoryUncheckedCreateWithoutItemInput> | TradePriceHistoryCreateWithoutItemInput[] | TradePriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradePriceHistoryCreateOrConnectWithoutItemInput | TradePriceHistoryCreateOrConnectWithoutItemInput[]
    upsert?: TradePriceHistoryUpsertWithWhereUniqueWithoutItemInput | TradePriceHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: TradePriceHistoryCreateManyItemInputEnvelope
    set?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    disconnect?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    delete?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    connect?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    update?: TradePriceHistoryUpdateWithWhereUniqueWithoutItemInput | TradePriceHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: TradePriceHistoryUpdateManyWithWhereWithoutItemInput | TradePriceHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: TradePriceHistoryScalarWhereInput | TradePriceHistoryScalarWhereInput[]
  }

  export type TradePriceHistoryUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<TradePriceHistoryCreateWithoutItemInput, TradePriceHistoryUncheckedCreateWithoutItemInput> | TradePriceHistoryCreateWithoutItemInput[] | TradePriceHistoryUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradePriceHistoryCreateOrConnectWithoutItemInput | TradePriceHistoryCreateOrConnectWithoutItemInput[]
    upsert?: TradePriceHistoryUpsertWithWhereUniqueWithoutItemInput | TradePriceHistoryUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: TradePriceHistoryCreateManyItemInputEnvelope
    set?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    disconnect?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    delete?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    connect?: TradePriceHistoryWhereUniqueInput | TradePriceHistoryWhereUniqueInput[]
    update?: TradePriceHistoryUpdateWithWhereUniqueWithoutItemInput | TradePriceHistoryUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: TradePriceHistoryUpdateManyWithWhereWithoutItemInput | TradePriceHistoryUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: TradePriceHistoryScalarWhereInput | TradePriceHistoryScalarWhereInput[]
  }

  export type TradePriceCreateNestedOneWithoutHistoryInput = {
    create?: XOR<TradePriceCreateWithoutHistoryInput, TradePriceUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: TradePriceCreateOrConnectWithoutHistoryInput
    connect?: TradePriceWhereUniqueInput
  }

  export type TradePriceUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<TradePriceCreateWithoutHistoryInput, TradePriceUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: TradePriceCreateOrConnectWithoutHistoryInput
    upsert?: TradePriceUpsertWithoutHistoryInput
    connect?: TradePriceWhereUniqueInput
    update?: XOR<XOR<TradePriceUpdateToOneWithWhereWithoutHistoryInput, TradePriceUpdateWithoutHistoryInput>, TradePriceUncheckedUpdateWithoutHistoryInput>
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

  export type OfficialPriceHistoryCreateWithoutItemInput = {
    keys?: number | null
    scrolls?: number | null
    vizards?: number | null
    recordedAt?: Date | string
  }

  export type OfficialPriceHistoryUncheckedCreateWithoutItemInput = {
    id?: number
    keys?: number | null
    scrolls?: number | null
    vizards?: number | null
    recordedAt?: Date | string
  }

  export type OfficialPriceHistoryCreateOrConnectWithoutItemInput = {
    where: OfficialPriceHistoryWhereUniqueInput
    create: XOR<OfficialPriceHistoryCreateWithoutItemInput, OfficialPriceHistoryUncheckedCreateWithoutItemInput>
  }

  export type OfficialPriceHistoryCreateManyItemInputEnvelope = {
    data: OfficialPriceHistoryCreateManyItemInput | OfficialPriceHistoryCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type OfficialPriceHistoryUpsertWithWhereUniqueWithoutItemInput = {
    where: OfficialPriceHistoryWhereUniqueInput
    update: XOR<OfficialPriceHistoryUpdateWithoutItemInput, OfficialPriceHistoryUncheckedUpdateWithoutItemInput>
    create: XOR<OfficialPriceHistoryCreateWithoutItemInput, OfficialPriceHistoryUncheckedCreateWithoutItemInput>
  }

  export type OfficialPriceHistoryUpdateWithWhereUniqueWithoutItemInput = {
    where: OfficialPriceHistoryWhereUniqueInput
    data: XOR<OfficialPriceHistoryUpdateWithoutItemInput, OfficialPriceHistoryUncheckedUpdateWithoutItemInput>
  }

  export type OfficialPriceHistoryUpdateManyWithWhereWithoutItemInput = {
    where: OfficialPriceHistoryScalarWhereInput
    data: XOR<OfficialPriceHistoryUpdateManyMutationInput, OfficialPriceHistoryUncheckedUpdateManyWithoutItemInput>
  }

  export type OfficialPriceHistoryScalarWhereInput = {
    AND?: OfficialPriceHistoryScalarWhereInput | OfficialPriceHistoryScalarWhereInput[]
    OR?: OfficialPriceHistoryScalarWhereInput[]
    NOT?: OfficialPriceHistoryScalarWhereInput | OfficialPriceHistoryScalarWhereInput[]
    id?: IntFilter<"OfficialPriceHistory"> | number
    itemId?: StringFilter<"OfficialPriceHistory"> | string
    keys?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    scrolls?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    vizards?: FloatNullableFilter<"OfficialPriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"OfficialPriceHistory"> | Date | string
  }

  export type OfficialPriceCreateWithoutHistoryInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    demand?: string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: string | null
    taxGems?: number | null
    taxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    updatedAt?: Date | string
  }

  export type OfficialPriceUncheckedCreateWithoutHistoryInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityLabel?: string | null
    demand?: string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: string | null
    taxGems?: number | null
    taxGold?: number | null
    sheet?: string | null
    existingAmount?: string | null
    updatedAt?: Date | string
  }

  export type OfficialPriceCreateOrConnectWithoutHistoryInput = {
    where: OfficialPriceWhereUniqueInput
    create: XOR<OfficialPriceCreateWithoutHistoryInput, OfficialPriceUncheckedCreateWithoutHistoryInput>
  }

  export type OfficialPriceUpsertWithoutHistoryInput = {
    update: XOR<OfficialPriceUpdateWithoutHistoryInput, OfficialPriceUncheckedUpdateWithoutHistoryInput>
    create: XOR<OfficialPriceCreateWithoutHistoryInput, OfficialPriceUncheckedCreateWithoutHistoryInput>
    where?: OfficialPriceWhereInput
  }

  export type OfficialPriceUpdateToOneWithWhereWithoutHistoryInput = {
    where?: OfficialPriceWhereInput
    data: XOR<OfficialPriceUpdateWithoutHistoryInput, OfficialPriceUncheckedUpdateWithoutHistoryInput>
  }

  export type OfficialPriceUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    demand?: NullableStringFieldUpdateOperationsInput | string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityLabel?: NullableStringFieldUpdateOperationsInput | string | null
    demand?: NullableStringFieldUpdateOperationsInput | string | null
    keys?: NullableJsonNullValueInput | InputJsonValue
    scrolls?: NullableJsonNullValueInput | InputJsonValue
    vizards?: NullableJsonNullValueInput | InputJsonValue
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    sheet?: NullableStringFieldUpdateOperationsInput | string | null
    existingAmount?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceHistoryCreateWithoutItemInput = {
    value?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type TradePriceHistoryUncheckedCreateWithoutItemInput = {
    id?: number
    value?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type TradePriceHistoryCreateOrConnectWithoutItemInput = {
    where: TradePriceHistoryWhereUniqueInput
    create: XOR<TradePriceHistoryCreateWithoutItemInput, TradePriceHistoryUncheckedCreateWithoutItemInput>
  }

  export type TradePriceHistoryCreateManyItemInputEnvelope = {
    data: TradePriceHistoryCreateManyItemInput | TradePriceHistoryCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type TradePriceHistoryUpsertWithWhereUniqueWithoutItemInput = {
    where: TradePriceHistoryWhereUniqueInput
    update: XOR<TradePriceHistoryUpdateWithoutItemInput, TradePriceHistoryUncheckedUpdateWithoutItemInput>
    create: XOR<TradePriceHistoryCreateWithoutItemInput, TradePriceHistoryUncheckedCreateWithoutItemInput>
  }

  export type TradePriceHistoryUpdateWithWhereUniqueWithoutItemInput = {
    where: TradePriceHistoryWhereUniqueInput
    data: XOR<TradePriceHistoryUpdateWithoutItemInput, TradePriceHistoryUncheckedUpdateWithoutItemInput>
  }

  export type TradePriceHistoryUpdateManyWithWhereWithoutItemInput = {
    where: TradePriceHistoryScalarWhereInput
    data: XOR<TradePriceHistoryUpdateManyMutationInput, TradePriceHistoryUncheckedUpdateManyWithoutItemInput>
  }

  export type TradePriceHistoryScalarWhereInput = {
    AND?: TradePriceHistoryScalarWhereInput | TradePriceHistoryScalarWhereInput[]
    OR?: TradePriceHistoryScalarWhereInput[]
    NOT?: TradePriceHistoryScalarWhereInput | TradePriceHistoryScalarWhereInput[]
    id?: IntFilter<"TradePriceHistory"> | number
    itemId?: StringFilter<"TradePriceHistory"> | string
    value?: FloatNullableFilter<"TradePriceHistory"> | number | null
    demand?: IntNullableFilter<"TradePriceHistory"> | number | null
    recordedAt?: DateTimeFilter<"TradePriceHistory"> | Date | string
  }

  export type TradePriceCreateWithoutHistoryInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityPct?: number | null
    emoji?: string | null
    value?: number | null
    keys?: number | null
    scrolls?: number | null
    demand?: number | null
    rateOfChange?: string | null
    prestige?: number | null
    status?: string | null
    obtainedFrom?: string | null
    taxGems?: number | null
    taxGold?: number | null
    apiId?: string | null
    apiUpdatedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type TradePriceUncheckedCreateWithoutHistoryInput = {
    id: string
    name: string
    normalized: string
    slug: string
    category?: string | null
    rarityPct?: number | null
    emoji?: string | null
    value?: number | null
    keys?: number | null
    scrolls?: number | null
    demand?: number | null
    rateOfChange?: string | null
    prestige?: number | null
    status?: string | null
    obtainedFrom?: string | null
    taxGems?: number | null
    taxGold?: number | null
    apiId?: string | null
    apiUpdatedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type TradePriceCreateOrConnectWithoutHistoryInput = {
    where: TradePriceWhereUniqueInput
    create: XOR<TradePriceCreateWithoutHistoryInput, TradePriceUncheckedCreateWithoutHistoryInput>
  }

  export type TradePriceUpsertWithoutHistoryInput = {
    update: XOR<TradePriceUpdateWithoutHistoryInput, TradePriceUncheckedUpdateWithoutHistoryInput>
    create: XOR<TradePriceCreateWithoutHistoryInput, TradePriceUncheckedCreateWithoutHistoryInput>
    where?: TradePriceWhereInput
  }

  export type TradePriceUpdateToOneWithWhereWithoutHistoryInput = {
    where?: TradePriceWhereInput
    data: XOR<TradePriceUpdateWithoutHistoryInput, TradePriceUncheckedUpdateWithoutHistoryInput>
  }

  export type TradePriceUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    prestige?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    rarityPct?: NullableFloatFieldUpdateOperationsInput | number | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    rateOfChange?: NullableStringFieldUpdateOperationsInput | string | null
    prestige?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    obtainedFrom?: NullableStringFieldUpdateOperationsInput | string | null
    taxGems?: NullableFloatFieldUpdateOperationsInput | number | null
    taxGold?: NullableFloatFieldUpdateOperationsInput | number | null
    apiId?: NullableStringFieldUpdateOperationsInput | string | null
    apiUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    welcomeChannelId?: string | null
    memberCountChannelId?: string | null
    updatedAt?: Date | string
  }

  export type GuildConfigUncheckedCreateWithoutChannelsInput = {
    id?: string
    guildId: string
    defaultPrefix?: string
    officialChannelId?: string | null
    tradeChannelId?: string | null
    welcomeChannelId?: string | null
    memberCountChannelId?: string | null
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
    welcomeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    memberCountChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildConfigUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    defaultPrefix?: StringFieldUpdateOperationsInput | string
    officialChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    tradeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    welcomeChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    memberCountChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceHistoryCreateManyItemInput = {
    id?: number
    keys?: number | null
    scrolls?: number | null
    vizards?: number | null
    recordedAt?: Date | string
  }

  export type OfficialPriceHistoryUpdateWithoutItemInput = {
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    vizards?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceHistoryUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    vizards?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfficialPriceHistoryUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    keys?: NullableFloatFieldUpdateOperationsInput | number | null
    scrolls?: NullableFloatFieldUpdateOperationsInput | number | null
    vizards?: NullableFloatFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceHistoryCreateManyItemInput = {
    id?: number
    value?: number | null
    demand?: number | null
    recordedAt?: Date | string
  }

  export type TradePriceHistoryUpdateWithoutItemInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceHistoryUncheckedUpdateWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    demand?: NullableIntFieldUpdateOperationsInput | number | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradePriceHistoryUncheckedUpdateManyWithoutItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: NullableFloatFieldUpdateOperationsInput | number | null
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
     * @deprecated Use OfficialPriceCountOutputTypeDefaultArgs instead
     */
    export type OfficialPriceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OfficialPriceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradePriceCountOutputTypeDefaultArgs instead
     */
    export type TradePriceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradePriceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GuildConfigCountOutputTypeDefaultArgs instead
     */
    export type GuildConfigCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GuildConfigCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OfficialPriceDefaultArgs instead
     */
    export type OfficialPriceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OfficialPriceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OfficialPriceHistoryDefaultArgs instead
     */
    export type OfficialPriceHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OfficialPriceHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradePriceDefaultArgs instead
     */
    export type TradePriceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradePriceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradePriceHistoryDefaultArgs instead
     */
    export type TradePriceHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradePriceHistoryDefaultArgs<ExtArgs>
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