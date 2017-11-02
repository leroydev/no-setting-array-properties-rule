import * as TSUtils from "tsutils";
import * as ts from "typescript";

import * as Lint from "tslint";

export class Rule extends Lint.Rules.TypedRule {
    /* tslint:disable:object-literal-sort-keys */
    public static metadata: Lint.IRuleMetadata = {
        ruleName: "no-setting-array-properties",
        description: "Forbids setting array properties.",
        rationale: "Array properties aren't handled by JSON.stringify.",
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: [true],
        type: "functionality",
        typescriptOnly: false,
        hasFix: false,
    };
    /* tslint:enable:object-literal-sort-keys */

    public static FAILURE_STRING = "setting array properties is not allowed";

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, program.getTypeChecker()));
    }
}

class Walker extends Lint.AbstractWalker<void> {
    constructor(sourceFile: ts.SourceFile, ruleName: string, private readonly checker: ts.TypeChecker) {
        super(sourceFile, ruleName, undefined);
    }

    public walk(sourceFile: ts.SourceFile): void {
        const that = this;
        return ts.forEachChild(sourceFile, function cb(node: ts.Node): void {
            if (that.isViolation(node)) {
                that.addFailureAtNode(
                    node,
                    Rule.FAILURE_STRING,
                );
            }
            return ts.forEachChild(node, cb);
        });
    }

    private isViolation(node: ts.Node) {
        if (TSUtils.isElementAccessExpression(node)) {
            const argument = node.argumentExpression;
            if (argument === undefined) {
                return false;
            }

            const expressionType = this.checker.getTypeAtLocation(node.expression);
            if (expressionType.symbol === undefined || expressionType.symbol.name !== "Array") {
                return false;
            }

            const argumentExpressionType = this.checker.getTypeAtLocation(argument);
            if (isStringLiteralPropertyAccess(argument) || isStringVariable(argumentExpressionType)) {
                return true;
            }
        }
        return false;
    }
}

function isStringLiteralPropertyAccess(argument: ts.Expression): boolean {
    return TSUtils.isStringLiteral(argument) && TSUtils.isValidPropertyAccess(argument.text);
}

function isStringVariable(type: ts.Type): boolean {
    return Lint.isTypeFlagSet(type, ts.TypeFlags.StringLike);
}
