export type TransformFn = (source: any, target: any) => any;

export type MapperConfig<TSource, TTarget> = {
  [K in keyof TTarget]?: keyof TSource;
};
