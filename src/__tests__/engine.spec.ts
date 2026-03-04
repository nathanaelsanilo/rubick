import { describe, expect, it } from "vitest";
import { ModelMapper } from "../core/engine";

describe("ModelMapper", () => {
  it("should map properties from source to target", () => {
    const mapper = new ModelMapper();
    const source = { name: "Alice", age: 30 };
    const target = mapper.map<typeof source, { name: string; age: number }>(
      source,
    );

    expect(target).toEqual({ name: "Alice", age: 30 });
  });
});
