// __tests__/ast.test.ts

import { NumberNode, BinaryOperationNode } from "../src/ast";

describe("NumberNode", () => {
  it("should return its numeric value", () => {
    const num = new NumberNode(42);
    expect(num.evaluate()).toBe(42);
  });
});

describe("BinaryOperationNode", () => {
  it("should add two numbers", () => {
    const node = new BinaryOperationNode(new NumberNode(10), new NumberNode(5), "+");
    expect(node.evaluate()).toBe(15);
  });

  it("should handle nested expressions", () => {
    // (10 - 5) * 3 = 15
    const inner = new BinaryOperationNode(new NumberNode(10), new NumberNode(5), "-");
    const nested = new BinaryOperationNode(inner, new NumberNode(3), "*");
    expect(nested.evaluate()).toBe(15);
  });

  it("should throw an error for division by zero", () => {
    expect(() => {
      new BinaryOperationNode(new NumberNode(10), new NumberNode(0), "/").evaluate();
    }).toThrow("Division by zero error!");
  });
});
