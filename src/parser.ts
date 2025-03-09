// src/parser.ts

import { ASTNode, NumberNode, BinaryOperationNode } from "./ast";

enum TokenType {
  NUMBER = "NUMBER",
  OPERATOR = "OPERATOR",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN"
}

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const char = input[i];
    if (char === " ") {
      i++;
      continue;
    }
    if ((char >= "0" && char <= "9") || char === ".") {
      let numStr = "";
      while (i < input.length && (((input[i] >= "0" && input[i] <= "9") || input[i] === "."))) {
        numStr += input[i];
        i++;
      }
      tokens.push({ type: TokenType.NUMBER, value: numStr });
      continue;
    }
    // Handle operators: +, -, *, /, <, >, and ==
    if ("+-*/<>".includes(char) || (char === "=" && input[i + 1] === "=")) {
      if (char === "=" && input[i + 1] === "=") {
        tokens.push({ type: TokenType.OPERATOR, value: "==" });
        i += 2;
      } else {
        tokens.push({ type: TokenType.OPERATOR, value: char });
        i++;
      }
      continue;
    }
    if (char === "(") {
      tokens.push({ type: TokenType.LPAREN, value: char });
      i++;
      continue;
    }
    if (char === ")") {
      tokens.push({ type: TokenType.RPAREN, value: char });
      i++;
      continue;
    }
    throw new Error("Unknown character: " + char);
  }
  return tokens;
}

export function parseExpression(input: string): ASTNode {
  const tokens = tokenize(input);
  let current = 0;

  function peek(): Token | undefined {
    return tokens[current];
  }

  function consume(expectedType?: TokenType, expectedValue?: string): Token {
    const token = tokens[current];
    if (!token) {
      throw new Error("Unexpected end of input");
    }
    if (expectedType && token.type !== expectedType) {
      throw new Error(`Expected token type ${expectedType} but got ${token.type}`);
    }
    if (expectedValue && token.value !== expectedValue) {
      throw new Error(`Expected token value ${expectedValue} but got ${token.value}`);
    }
    current++;
    return token;
  }

  // Grammar:
  // expression -> comparison
  // comparison -> additive (( "==" | "<" | ">" ) additive)*
  // additive -> multiplicative (( "+" | "-" ) multiplicative)*
  // multiplicative -> primary (( "*" | "/" ) primary)*
  // primary -> NUMBER | "(" expression ")"

  function parsePrimary(): ASTNode {
    const token = peek();
    if (!token) {
      throw new Error("Unexpected end of input");
    }
    if (token.type === TokenType.NUMBER) {
      consume(TokenType.NUMBER);
      return new NumberNode(parseFloat(token.value));
    }
    if (token.type === TokenType.LPAREN) {
      consume(TokenType.LPAREN);
      const expr = parseExpressionInternal();
      consume(TokenType.RPAREN);
      return expr;
    }
    throw new Error("Unexpected token: " + token.value);
  }

  function parseMultiplicative(): ASTNode {
    let node = parsePrimary();
    while (peek() && peek()?.type === TokenType.OPERATOR && (peek()?.value === "*" || peek()?.value === "/")) {
      const op = consume(TokenType.OPERATOR).value as "*" | "/";
      const right = parsePrimary();
      node = new BinaryOperationNode(node, right, op);
    }
    return node;
  }

  function parseAdditive(): ASTNode {
    let node = parseMultiplicative();
    while (peek() && peek()?.type === TokenType.OPERATOR && (peek()?.value === "+" || peek()?.value === "-")) {
      const op = consume(TokenType.OPERATOR).value as "+" | "-";
      const right = parseMultiplicative();
      node = new BinaryOperationNode(node, right, op);
    }
    return node;
  }

  function parseComparison(): ASTNode {
    let node = parseAdditive();
    while (peek() && peek()?.type === TokenType.OPERATOR && (peek()?.value === "==" || peek()?.value === "<" || peek()?.value === ">")) {
      const op = consume(TokenType.OPERATOR).value as "==" | "<" | ">";
      const right = parseAdditive();
      node = new BinaryOperationNode(node, right, op);
    }
    return node;
  }

  function parseExpressionInternal(): ASTNode {
    return parseComparison();
  }

  const result = parseExpressionInternal();
  if (current < tokens.length) {
    throw new Error("Unexpected token: " + tokens[current].value);
  }
  return result;
}
