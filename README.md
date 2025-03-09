# DSL Calculator: Unleash Your Inner Mathemagician! ✨

Welcome to **DSL Calculator**, the ultimate Domain-Specific Language (DSL) that lets you solve both simple and mind-bending complex mathematical expressions with ease!

> _"Math doesn't have to be boring, and neither should your code!"_

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Implementation Approach & AI Usage](#implementation-approach--ai-usage)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [License](#license)

## Overview

**DSL Calculator** is a TypeScript-powered calculator that goes beyond the mundane! Built with a custom Abstract Syntax Tree (AST) and a clever parser, it can:

- Evaluating basic arithmetic like `5 + 3` or `10 / 2`
- Handling complex expressions with nested parentheses (e.g., `(1+2)*3 - 4/2`)
- Comparison operators such as `<`, `>`, and `==`
- Printing expressions in a neat, human-readable format
- Providing robust error handling for division by zero or invalid input

## Features

- **Simple & Complex Expression Support**  
  Enter two numbers and choose an operation or type an entire expression in one go.

- **Bonus Operations**  
  Enjoy not only basic arithmetic but also comparison operations (e.g., `<`, `>`, `==`).

- **Error Handling**  
  Division by zero? Invalid characters? We catch those gremlins and let you know with a smile.

- **Comprehensive Testing**  
  Unit tests written in Jest ensure that our DSL works like a charm.

## Implementation Approach & AI Usage

1. **Core Implementation (Manually Developed):**  
   - **AST Nodes:** We created a `NumberNode` for numeric literals and a `BinaryOperationNode` for arithmetic/comparison operations.  
   - **Parser:** A recursive descent parser (`parser.ts`) tokenizes and builds the AST for complex expressions.  
   - **Bonus Features:** Comparison operators (`<`, `>`, `==`) and a `print()` method to display expressions.  

2. **Frontend (AI-Generated):**  
   - The HTML, CSS, and certain UI logic in `index.html` (and portions of `index.ts`) were generated with the assistance of an AI tool.  

3. **Testing & Validation:**  
   - We wrote a comprehensive test suite using **Jest** to ensure the DSL behaves as expected, including edge cases like division by zero.

4. **Assumptions:**  
   - We assume all inputs for arithmetic operations are numeric.  
   - Division by zero is handled by throwing an error.  
   - Comparison operators expect numeric operands.

5. **Challenge Requirements:**  
   - **Core Implementation of the DSL:** Done with `NumberNode`, `BinaryOperationNode`, and a robust evaluation logic.  
   - **At Least One Bonus Feature:** We added comparison operators, error handling with descriptive messages, and print functionality.  
   - **Comprehensive Test Suite:** Located in `__tests__` with coverage for arithmetic, nested expressions, and error handling.  
   - **README:** Contains approach details, assumptions, and instructions for running the project and tests.
 

## Installation

### Prerequisites
- **Node.js & npm**  
  Download and install from [nodejs.org](https://nodejs.org).

### Steps

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/dsl-calculator.git
   cd dsl-calculator
   ```
2. **Install Dependencies**  
   ```bash
   npm install
   ```
3. **Build the Project (Optional)**  
   ```bash
   npm run build
   ```

## Usage

### Running the Development Server

```bash
npm start
```
Your browser should automatically open a page where you can either:

- **Use the Simple Calculator**: Enter two numbers, pick your operator, and see the result.  
- **Enter a Complex Expression**: Type in something like `(1+2)*3 - 4/2` to see both the expression and the computed result.

### What You See

- A neat, readable form with inputs, dropdowns, and a special section for complex expressions.
- An output area that displays your expression in a neat format and shows the computed result.
- Error messages that are as friendly as they are informative!


## Development

### File Structure

```
dsl-calculator/
├── src/
│   ├── ast.ts         // AST definitions and DSL core logic
│   ├── parser.ts      // Expression parser for complex calculations
│   ├── index.ts       // Frontend entry point (partially AI-generated)
│   └── index.html     // HTML template with fancy CSS (AI-generated)
├── __tests__/
│   └── ast.test.ts    // Jest unit tests for the DSL
├── jest.config.js     // Jest configuration
├── package-lock.json  // Automatically generated dependency lock file
├── package.json       // Project configuration and scripts
├── tsconfig.json      // TypeScript configuration
├── webpack.config.js  // Webpack bundler configuration
└── README.md          // This awesome README file!
```

### Building for Production

```bash
npm run build
```
All bundled files will appear in the `dist` folder, ready for deployment.

## Testing

We use **Jest** to ensure everything works smoothly:

```bash
npm test
```
All tests should pass, ensuring that both simple and complex expressions evaluate correctly handle errors.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Happy coding, and may the math be ever in your favor! 😄
