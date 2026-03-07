import { describe, expect, it } from "vitest";
import { ModelMapper } from "../core/engine";
import type { MapperConfig } from "../types";

type TargetObject = { userId: number; fullName: string; isActive: boolean };

describe("ModelMapper", () => {
  it("should map properties from source to target", () => {
    const mapper = new ModelMapper();
    const source = { name: "Alice", age: 30 };
    const target = mapper.map<typeof source, { name: string; age: number }>(
      source,
    );

    expect(target).toEqual({ name: "Alice", age: 30 });
  });

  it("should follow configuration key", () => {
    const mapper = new ModelMapper();

    const sourceObject = {
      user_id: 123,
      full_name: "John Doe",
      is_active: true,
    };

    const config: MapperConfig<typeof sourceObject, TargetObject> = {
      userId: "user_id",
      fullName: "full_name",
      isActive: "is_active",
    };

    const result = mapper.map<typeof sourceObject, TargetObject>(
      sourceObject,
      config,
    );

    expect(result.userId).toBe(123);
    expect(result.fullName).toBe("John Doe");
    expect(result.isActive).toBe(true);

    // should not have source property
    expect((result as any).user_id).toBeUndefined();
  });
});
