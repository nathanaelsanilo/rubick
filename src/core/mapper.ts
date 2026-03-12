import type { AnyObject, MapperConfig } from "../types";
import { ModelMapper } from "./engine";
import { Registry } from "./registry";

export class Mapper {
  private registry = new Registry();
  private modelMapper = new ModelMapper();

  setup<TSource, TTarget>(
    sourceId: string,
    targetId: string,
    config: MapperConfig<TSource, TTarget>,
  ): void {
    this.registry.register(sourceId, targetId, config);
  }

  map<TSource extends AnyObject, TTarget extends AnyObject>(
    sourceId: string,
    targetId: string,
    sourceObject: TSource,
  ): TTarget {
    const config = this.registry.getConfig(sourceId, targetId);

    return this.modelMapper.map<TSource, TTarget>(sourceObject, config);
  }
}

// singleton so config will share across application
export const mapper = new Mapper();
