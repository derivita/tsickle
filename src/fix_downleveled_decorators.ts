import * as ts from "typescript";

/**
 * This is an attempt to fix the downleveled decorators so Closure doesn't have
 * trouble with them. The problem is that when `experimentalDecorators` is
 * enabled, we TSC ends up converting a class decorator like this:
 *
 * @classDecorator
 * export class Person { ... }
 *
 * to this:
 *
 * let Person = class Person { ... };
 *
 * as well as some calls to __decorate(Person, ...)
 *
 * The problem is that this causes Closure Compiler to fail with this error:
 * ERROR - [JSC_CANNOT_CONVERT_YET] Transpilation of 'Classes with possible name shadowing' is not yet implemented.
 * 21| let Person = class Person {
 *                  ^^^^^^^^^^^^^^
 *
 * As previously mentioned, this transformer is an _attempt_, it doesn't actually work it seems.
 * I'm not sure if tsickle can even affect this at this point in the process or not.
 */
export function fixDownleveledDecorators() {
  return (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
    return (sourceFile: ts.SourceFile) => {
      function visit(node: ts.Node): ts.Node {
        // Check if the node is a VariableDeclaration
        if (ts.isVariableDeclaration(node)) {
          // Check if it's a variable declaration of a class expression
          if (node.initializer && ts.isClassExpression(node.initializer)) {
            const className = node.name;
            const classNameAsString = className.getText();

            const typeParameter = ts.factory.createTypeParameterDeclaration(
              undefined,
              classNameAsString,
              undefined,
              undefined
            );

            const classDeclaration = ts.factory.createClassDeclaration(
              undefined,
              undefined,
              [typeParameter],
              [],
              node.initializer.members
            );

            // Replace the variable declaration with the class declaration
            ts.factory.updateSourceFile(sourceFile, [classDeclaration]);
          }
        }
        return ts.visitEachChild(node, visit, context);
      }
      return ts.visitEachChild(sourceFile, visit, context);
    };
  };
}
