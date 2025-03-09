// src/ast.ts

// Base interface for all AST nodes with bonus print functionality
export interface ASTNode {
    evaluate(): number | boolean;
    print(): string;
  }
  
  // Represents a numeric literal
  export class NumberNode implements ASTNode {
    constructor(public value: number) {}
  
    evaluate(): number {
      return this.value;
    }
  
    print(): string {
      return `${this.value}`;
    }
  }
  
  // Represents a binary operation that now supports arithmetic and comparison operators.
  export class BinaryOperationNode implements ASTNode {
    constructor(
      public left: ASTNode,
      public right: ASTNode,
      // Now includes comparison operators as well as arithmetic ones
      public operator: "+" | "-" | "*" | "/" | "<" | ">" | "=="
    ) {}
  
    evaluate(): number | boolean {
      const leftVal = this.left.evaluate();
      const rightVal = this.right.evaluate();
  
      // For arithmetic operations, both operands must be numbers.
      if (
        (this.operator === "+" ||
          this.operator === "-" ||
          this.operator === "*" ||
          this.operator === "/") &&
        (typeof leftVal !== "number" || typeof rightVal !== "number")
      ) {
        throw new Error("Invalid operand: both operands must be numbers for arithmetic operations.");
      }
  
      switch (this.operator) {
        case "+":
          return leftVal as number + (rightVal as number);
        case "-":
          return leftVal as number - (rightVal as number);
        case "*":
          return leftVal as number * (rightVal as number);
        case "/":
          if (rightVal === 0) {
            throw new Error("Division by zero error!");
          }
          return (leftVal as number) / (rightVal as number);
        case "<":
          return (leftVal as number) < (rightVal as number);
        case ">":
          return (leftVal as number) > (rightVal as number);
        case "==":
          return (leftVal as number) === (rightVal as number);
        default:
          throw new Error(`Invalid operator: ${this.operator}`);
      }
    }
  
    print(): string {
      return `(${this.left.print()} ${this.operator} ${this.right.print()})`;
    }
  }
  