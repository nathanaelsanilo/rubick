export type TransformerFn<TSource, TTarget, K extends keyof TTarget> = (
  source: TSource,
) => TTarget[K];
export type TransformerPrimitive<TSource> = keyof TSource;
export type TransformerValue<TSource, TTarget, K extends keyof TTarget> =
  | TransformerPrimitive<TSource>
  | TransformerFn<TSource, TTarget, K>;

export type MapperConfig<TSource, TTarget> = {
  [K in keyof TTarget]?: TransformerValue<TSource, TTarget, K>;
};
