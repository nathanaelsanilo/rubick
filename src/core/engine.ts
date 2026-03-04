export class ModelMapper {
  map<TSource extends Record<string, any>, TTarget extends Record<string, any>>(
    sourceObject: TSource,
  ): TTarget {
    const targetObject: any = {};
    for (const key in sourceObject) {
      // only copy own properties, not inherited ones
      if (Object.hasOwn(sourceObject, key)) {
        targetObject[key] = sourceObject[key];
      }
    }
    return targetObject as TTarget;
  }
}
