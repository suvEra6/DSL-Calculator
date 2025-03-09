// src/index.ts
import { NumberNode, BinaryOperationNode } from "./ast";
import { parseExpression } from "./parser";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calc-form") as HTMLFormElement;
  const resultDiv = document.getElementById("result") as HTMLDivElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      // Check if a complex expression was provided
      const complexExpr = (document.getElementById("expression") as HTMLInputElement).value.trim();

      let expression;
      if (complexExpr !== "") {
        // Parse the full expression string into an AST
        expression = parseExpression(complexExpr);
      } else {
        // Otherwise use the simple calculator fields
        const num1 = parseFloat((document.getElementById("num1") as HTMLInputElement).value);
        const num2 = parseFloat((document.getElementById("num2") as HTMLInputElement).value);
        const operation = (document.getElementById("operation") as HTMLSelectElement).value as
          | "+"
          | "-"
          | "*"
          | "/"
          | "<"
          | ">"
          | "==";
        expression = new BinaryOperationNode(new NumberNode(num1), new NumberNode(num2), operation);
      }

      const output = expression.evaluate();
      const expressionStr = expression.print();

      resultDiv.innerHTML = `
        <p><strong>Expression:</strong> ${expressionStr}</p>
        <p><strong>Result:</strong> ${output}</p>
      `;
    } catch (error: any) {
      resultDiv.textContent = "Error: " + error.message;
    }
  });
});
