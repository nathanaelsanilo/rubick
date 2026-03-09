import type { MapperConfig } from "../types";

export class Registry {
  private storage = new Map<string, MapperConfig<any, any>>();

  private generateKey(sourceId: string, targetId: string): string {
    return `${sourceId}_to_${targetId}`;
  }

  register<TSource, TTarget>(
    sourceId: string,
    targetId: string,
    config: MapperConfig<TSource, TTarget>,
  ): void {
    const key = this.generateKey(sourceId, targetId);
    this.storage.set(key, config);
  }

  getConfig(
    sourceId: string,
    targetId: string,
  ): MapperConfig<any, any> | undefined {
    const key = this.generateKey(sourceId, targetId);
    return this.storage.get(key);
  }
}
