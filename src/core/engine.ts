import type { MapperConfig } from "../types";

export class ModelMapper {
  map<TSource extends Record<string, any>, TTarget extends Record<string, any>>(
    sourceObject: TSource,
    config?: MapperConfig<TSource, TTarget>,
  ): TTarget {
    const targetObject: any = {};

    const mappedSourceKey = new Set<string | Symbol>();

    if (config) {
      for (const targetKey in config) {
        const sourceKey = config[targetKey];

        if (sourceKey && sourceKey in sourceObject) {
          targetObject[targetKey] = sourceObject[sourceKey];
          mappedSourceKey.add(sourceKey as string);
        }
      }
    }

    for (const key in sourceObject) {
      // only copy own properties, not inherited ones
      if (!mappedSourceKey.has(key) && Object.hasOwn(sourceObject, key)) {
        targetObject[key] = sourceObject[key];
      }
    }

    return targetObject as TTarget;
  }
}
