import type { MapperConfig } from "../types";

export class ModelMapper {
  map<TSource extends Record<string, any>, TTarget extends Record<string, any>>(
    sourceObject: TSource,
    config?: MapperConfig<TSource, TTarget>,
  ): TTarget {
    const targetObject: Record<string, any> = {};

    const mappedSourceKey = new Set<string | Symbol>();

    if (config) {
      // map by config
      for (const targetKey in config) {
        const rule = config[targetKey];

        if (typeof rule === "function") {
          targetObject[targetKey] = rule(sourceObject);
        } else if (typeof rule === "string") {
          const sourceKey = rule;
          targetObject[targetKey] = sourceObject[sourceKey];
          mappedSourceKey.add(sourceKey);
        }
      }
    }

    // auto map based on similar object key
    for (const key in sourceObject) {
      // only copy own properties, not inherited ones
      if (!mappedSourceKey.has(key) && Object.hasOwn(sourceObject, key)) {
        // prevent overriding mapped data
        if (!(key in targetObject)) {
          targetObject[key] = sourceObject[key];
        }
      }
    }

    return targetObject as TTarget;
  }
}
