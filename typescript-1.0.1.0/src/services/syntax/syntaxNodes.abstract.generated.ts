///<reference path='references.ts' />

module TypeScript.Syntax.Abstract {
    // Inject this module as the factory for producing syntax nodes in the parser.
    Parser.syntaxFactory = Abstract;
    export var isConcrete: boolean = false;

    export class SourceUnitSyntax extends SyntaxNode {
        public syntaxTree: SyntaxTree = null;
        public moduleElements: IModuleElementSyntax[];
        public endOfFileToken: ISyntaxToken;
        constructor(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) {
            super(data);
            this.parent = null,
            this.moduleElements = moduleElements,
            this.endOfFileToken = endOfFileToken,
            !isShared(moduleElements) && (moduleElements.parent = this),
            endOfFileToken.parent = this;
        }
    }
    export class QualifiedNameSyntax extends SyntaxNode implements INameSyntax {
        public left: INameSyntax;
        public dotToken: ISyntaxToken;
        public right: ISyntaxToken;
        public _nameBrand: any; public _typeBrand: any;
        constructor(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) {
            super(data);
            this.left = left,
            this.right = right,
            left.parent = this,
            right.parent = this;
        }
    }
    export class ObjectTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public openBraceToken: ISyntaxToken;
        public typeMembers: ITypeMemberSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, typeMembers: ITypeMemberSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.typeMembers = typeMembers,
            !isShared(typeMembers) && (typeMembers.parent = this);
        }
    }
    export class FunctionTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.type = type,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            type.parent = this;
        }
    }
    export class ArrayTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public type: ITypeSyntax;
        public openBracketToken: ISyntaxToken;
        public closeBracketToken: ISyntaxToken;
        public _typeBrand: any;
        constructor(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) {
            super(data);
            this.type = type,
            type.parent = this;
        }
    }
    export class ConstructorTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public newKeyword: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _typeBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.type = type,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            type.parent = this;
        }
    }
    export class GenericTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public name: INameSyntax;
        public typeArgumentList: TypeArgumentListSyntax;
        public _typeBrand: any;
        constructor(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) {
            super(data);
            this.name = name,
            this.typeArgumentList = typeArgumentList,
            name.parent = this,
            typeArgumentList.parent = this;
        }
    }
    export class TypeQuerySyntax extends SyntaxNode implements ITypeSyntax {
        public typeOfKeyword: ISyntaxToken;
        public name: INameSyntax;
        public _typeBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) {
            super(data);
            this.name = name,
            name.parent = this;
        }
    }
    export class InterfaceDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public interfaceKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public body: ObjectTypeSyntax;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.body = body,
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            !isShared(heritageClauses) && (heritageClauses.parent = this),
            body.parent = this;
        }
    }
    export class FunctionDeclarationSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.callSignature = callSignature,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            callSignature.parent = this,
            block && (block.parent = this);
        }
    }
    export class ModuleDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public moduleKeyword: ISyntaxToken;
        public name: INameSyntax;
        public stringLiteral: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public moduleElements: IModuleElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.name = name,
            this.stringLiteral = stringLiteral,
            this.moduleElements = moduleElements,
            !isShared(modifiers) && (modifiers.parent = this),
            name && (name.parent = this),
            stringLiteral && (stringLiteral.parent = this),
            !isShared(moduleElements) && (moduleElements.parent = this);
        }
    }
    export class ClassDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public classKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public openBraceToken: ISyntaxToken;
        public classElements: IClassElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.classElements = classElements,
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            !isShared(heritageClauses) && (heritageClauses.parent = this),
            !isShared(classElements) && (classElements.parent = this);
        }
    }
    export class EnumDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public enumKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public enumElements: EnumElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: EnumElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.enumElements = enumElements,
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            !isShared(enumElements) && (enumElements.parent = this);
        }
    }
    export class ImportDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public importKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public moduleReference: IModuleReferenceSyntax;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.moduleReference = moduleReference,
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            moduleReference.parent = this;
        }
    }
    export class ExportAssignmentSyntax extends SyntaxNode implements IModuleElementSyntax {
        public exportKeyword: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _moduleElementBrand: any;
        constructor(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.identifier = identifier,
            identifier.parent = this;
        }
    }
    export class MemberFunctionDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            propertyName.parent = this,
            callSignature.parent = this,
            block && (block.parent = this);
        }
    }
    export class MemberVariableDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclarator: VariableDeclaratorSyntax;
        public semicolonToken: ISyntaxToken;
        public _memberDeclarationBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.variableDeclarator = variableDeclarator,
            !isShared(modifiers) && (modifiers.parent = this),
            variableDeclarator.parent = this;
        }
    }
    export class ConstructorDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public constructorKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.constructorKeyword = constructorKeyword,
            this.callSignature = callSignature,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            constructorKeyword.parent = this,
            callSignature.parent = this,
            block && (block.parent = this);
        }
    }
    export class IndexMemberDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public indexSignature: IndexSignatureSyntax;
        public semicolonToken: ISyntaxToken;
        public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.indexSignature = indexSignature,
            !isShared(modifiers) && (modifiers.parent = this),
            indexSignature.parent = this;
        }
    }
    export class GetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public getKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any; public _propertyAssignmentBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }
    }
    export class SetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public setKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _memberDeclarationBrand: any; public _propertyAssignmentBrand: any; public _classElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }
    }
    export class PropertySignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.questionToken = questionToken,
            this.typeAnnotation = typeAnnotation,
            propertyName.parent = this,
            questionToken && (questionToken.parent = this),
            typeAnnotation && (typeAnnotation.parent = this);
        }
    }
    export class CallSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.typeAnnotation = typeAnnotation,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            typeAnnotation && (typeAnnotation.parent = this);
        }
    }
    export class ConstructSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public newKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) {
            super(data);
            this.callSignature = callSignature,
            callSignature.parent = this;
        }
    }
    export class IndexSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public openBracketToken: ISyntaxToken;
        public parameters: ParameterSyntax[];
        public closeBracketToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, parameters: ParameterSyntax[], closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
            this.openBracketToken = openBracketToken,
            this.parameters = parameters,
            this.closeBracketToken = closeBracketToken,
            this.typeAnnotation = typeAnnotation,
            openBracketToken.parent = this,
            !isShared(parameters) && (parameters.parent = this),
            closeBracketToken.parent = this,
            typeAnnotation && (typeAnnotation.parent = this);
        }
    }
    export class MethodSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _typeMemberBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.questionToken = questionToken,
            this.callSignature = callSignature,
            propertyName.parent = this,
            questionToken && (questionToken.parent = this),
            callSignature.parent = this;
        }
    }
    export class BlockSyntax extends SyntaxNode implements IStatementSyntax {
        public openBraceToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.openBraceToken = openBraceToken,
            this.statements = statements,
            openBraceToken.parent = this,
            !isShared(statements) && (statements.parent = this);
        }
    }
    export class IfStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public ifKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public elseClause: ElseClauseSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) {
            super(data);
            this.condition = condition,
            this.statement = statement,
            this.elseClause = elseClause,
            condition.parent = this,
            statement.parent = this,
            elseClause && (elseClause.parent = this);
        }
    }
    export class VariableStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclaration: VariableDeclarationSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.variableDeclaration = variableDeclaration,
            !isShared(modifiers) && (modifiers.parent = this),
            variableDeclaration.parent = this;
        }
    }
    export class ExpressionStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            expression.parent = this;
        }
    }
    export class ReturnStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public returnKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.returnKeyword = returnKeyword,
            this.expression = expression,
            returnKeyword.parent = this,
            expression && (expression.parent = this);
        }
    }
    export class SwitchStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public switchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public switchClauses: ISwitchClauseSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            this.switchClauses = switchClauses,
            expression.parent = this,
            !isShared(switchClauses) && (switchClauses.parent = this);
        }
    }
    export class BreakStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public breakKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.breakKeyword = breakKeyword,
            this.identifier = identifier,
            breakKeyword.parent = this,
            identifier && (identifier.parent = this);
        }
    }
    export class ContinueStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public continueKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.continueKeyword = continueKeyword,
            this.identifier = identifier,
            continueKeyword.parent = this,
            identifier && (identifier.parent = this);
        }
    }
    export class ForStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public initializer: IExpressionSyntax;
        public firstSemicolonToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public secondSemicolonToken: ISyntaxToken;
        public incrementor: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.variableDeclaration = variableDeclaration,
            this.initializer = initializer,
            this.condition = condition,
            this.incrementor = incrementor,
            this.statement = statement,
            variableDeclaration && (variableDeclaration.parent = this),
            initializer && (initializer.parent = this),
            condition && (condition.parent = this),
            incrementor && (incrementor.parent = this),
            statement.parent = this;
        }
    }
    export class ForInStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public left: IExpressionSyntax;
        public inKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.variableDeclaration = variableDeclaration,
            this.left = left,
            this.expression = expression,
            this.statement = statement,
            variableDeclaration && (variableDeclaration.parent = this),
            left && (left.parent = this),
            expression.parent = this,
            statement.parent = this;
        }
    }
    export class EmptyStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, semicolonToken: ISyntaxToken) {
            super(data);
            this.semicolonToken = semicolonToken,
            semicolonToken.parent = this;
        }
    }
    export class ThrowStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public throwKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            expression.parent = this;
        }
    }
    export class WhileStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.condition = condition,
            this.statement = statement,
            condition.parent = this,
            statement.parent = this;
        }
    }
    export class TryStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public tryKeyword: ISyntaxToken;
        public block: BlockSyntax;
        public catchClause: CatchClauseSyntax;
        public finallyClause: FinallyClauseSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) {
            super(data);
            this.block = block,
            this.catchClause = catchClause,
            this.finallyClause = finallyClause,
            block.parent = this,
            catchClause && (catchClause.parent = this),
            finallyClause && (finallyClause.parent = this);
        }
    }
    export class LabeledStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public identifier: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.identifier = identifier,
            this.statement = statement,
            identifier.parent = this,
            statement.parent = this;
        }
    }
    export class DoStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public doKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.statement = statement,
            this.condition = condition,
            statement.parent = this,
            condition.parent = this;
        }
    }
    export class DebuggerStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public debuggerKeyword: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.debuggerKeyword = debuggerKeyword,
            debuggerKeyword.parent = this;
        }
    }
    export class WithStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public withKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _statementBrand: any; public _moduleElementBrand: any;
        constructor(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.condition = condition,
            this.statement = statement,
            condition.parent = this,
            statement.parent = this;
        }
    }
    export class PrefixUnaryExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public operatorToken: ISyntaxToken;
        public operand: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) {
            super(data);
            this.operatorToken = operatorToken,
            this.operand = operand,
            operatorToken.parent = this,
            operand.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxFacts.getPrefixUnaryExpressionFromOperatorToken(this.operatorToken.kind()); }
    }
    export class DeleteExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public deleteKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.expression = expression,
            expression.parent = this;
        }
    }
    export class TypeOfExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public typeOfKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.expression = expression,
            expression.parent = this;
        }
    }
    export class VoidExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public voidKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.expression = expression,
            expression.parent = this;
        }
    }
    export class ConditionalExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public condition: IExpressionSyntax;
        public questionToken: ISyntaxToken;
        public whenTrue: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public whenFalse: IExpressionSyntax;
        public _expressionBrand: any;
        constructor(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) {
            super(data);
            this.condition = condition,
            this.whenTrue = whenTrue,
            this.whenFalse = whenFalse,
            condition.parent = this,
            whenTrue.parent = this,
            whenFalse.parent = this;
        }
    }
    export class BinaryExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public left: IExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public right: IExpressionSyntax;
        public _expressionBrand: any;
        constructor(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) {
            super(data);
            this.left = left,
            this.operatorToken = operatorToken,
            this.right = right,
            left.parent = this,
            operatorToken.parent = this,
            right.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxFacts.getBinaryExpressionFromOperatorToken(this.operatorToken.kind()); }
    }
    export class PostfixUnaryExpressionSyntax extends SyntaxNode implements IPostfixExpressionSyntax {
        public operand: ILeftHandSideExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) {
            super(data);
            this.operand = operand,
            this.operatorToken = operatorToken,
            operand.parent = this,
            operatorToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxFacts.getPostfixUnaryExpressionFromOperatorToken(this.operatorToken.kind()); }
    }
    export class MemberAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public dotToken: ISyntaxToken;
        public name: ISyntaxToken;
        public _memberExpressionBrand: any; public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) {
            super(data);
            this.expression = expression,
            this.name = name,
            expression.parent = this,
            name.parent = this;
        }
    }
    export class InvocationExpressionSyntax extends SyntaxNode implements ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) {
            super(data);
            this.expression = expression,
            this.argumentList = argumentList,
            expression.parent = this,
            argumentList.parent = this;
        }
    }
    export class ArrayLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBracketToken: ISyntaxToken;
        public expressions: IExpressionSyntax[];
        public closeBracketToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, openBracketToken: ISyntaxToken, expressions: IExpressionSyntax[], closeBracketToken: ISyntaxToken) {
            super(data);
            this.expressions = expressions,
            !isShared(expressions) && (expressions.parent = this);
        }
    }
    export class ObjectLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBraceToken: ISyntaxToken;
        public propertyAssignments: IPropertyAssignmentSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, openBraceToken: ISyntaxToken, propertyAssignments: IPropertyAssignmentSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.propertyAssignments = propertyAssignments,
            !isShared(propertyAssignments) && (propertyAssignments.parent = this);
        }
    }
    export class ObjectCreationExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public newKeyword: ISyntaxToken;
        public expression: IMemberExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) {
            super(data);
            this.expression = expression,
            this.argumentList = argumentList,
            expression.parent = this,
            argumentList && (argumentList.parent = this);
        }
    }
    export class ParenthesizedExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            expression.parent = this;
        }
    }
    export class ParenthesizedArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public callSignature: CallSignatureSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            super(data);
            this.callSignature = callSignature,
            this.block = block,
            this.expression = expression,
            callSignature.parent = this,
            block && (block.parent = this),
            expression && (expression.parent = this);
        }
    }
    export class SimpleArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public parameter: ParameterSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            super(data);
            this.parameter = parameter,
            this.block = block,
            this.expression = expression,
            parameter.parent = this,
            block && (block.parent = this),
            expression && (expression.parent = this);
        }
    }
    export class CastExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public lessThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public greaterThanToken: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.type = type,
            this.expression = expression,
            type.parent = this,
            expression.parent = this;
        }
    }
    export class ElementAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public openBracketToken: ISyntaxToken;
        public argumentExpression: IExpressionSyntax;
        public closeBracketToken: ISyntaxToken;
        public _memberExpressionBrand: any; public _callExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            this.argumentExpression = argumentExpression,
            expression.parent = this,
            argumentExpression.parent = this;
        }
    }
    export class FunctionExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any;
        constructor(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.identifier = identifier,
            this.callSignature = callSignature,
            this.block = block,
            identifier && (identifier.parent = this),
            callSignature.parent = this,
            block.parent = this;
        }
    }
    export class OmittedExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public _expressionBrand: any;
        constructor(data: number) {
            super(data);
        }
    }
    export class VariableDeclarationSyntax extends SyntaxNode {
        public varKeyword: ISyntaxToken;
        public variableDeclarators: VariableDeclaratorSyntax[];
        constructor(data: number, varKeyword: ISyntaxToken, variableDeclarators: VariableDeclaratorSyntax[]) {
            super(data);
            this.varKeyword = varKeyword,
            this.variableDeclarators = variableDeclarators,
            varKeyword.parent = this,
            !isShared(variableDeclarators) && (variableDeclarators.parent = this);
        }
    }
    export class VariableDeclaratorSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.typeAnnotation = typeAnnotation,
            this.equalsValueClause = equalsValueClause,
            propertyName.parent = this,
            typeAnnotation && (typeAnnotation.parent = this),
            equalsValueClause && (equalsValueClause.parent = this);
        }
    }
    export class ArgumentListSyntax extends SyntaxNode {
        public typeArgumentList: TypeArgumentListSyntax;
        public openParenToken: ISyntaxToken;
        public arguments: IExpressionSyntax[];
        public closeParenToken: ISyntaxToken;
        constructor(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: IExpressionSyntax[], closeParenToken: ISyntaxToken) {
            super(data);
            this.typeArgumentList = typeArgumentList,
            this.arguments = _arguments,
            typeArgumentList && (typeArgumentList.parent = this),
            !isShared(_arguments) && (_arguments.parent = this);
        }
    }
    export class ParameterListSyntax extends SyntaxNode {
        public openParenToken: ISyntaxToken;
        public parameters: ParameterSyntax[];
        public closeParenToken: ISyntaxToken;
        constructor(data: number, openParenToken: ISyntaxToken, parameters: ParameterSyntax[], closeParenToken: ISyntaxToken) {
            super(data);
            this.parameters = parameters,
            !isShared(parameters) && (parameters.parent = this);
        }
    }
    export class TypeArgumentListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeArguments: ITypeSyntax[];
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeArguments: ITypeSyntax[], greaterThanToken: ISyntaxToken) {
            super(data);
            this.lessThanToken = lessThanToken,
            this.typeArguments = typeArguments,
            lessThanToken.parent = this,
            !isShared(typeArguments) && (typeArguments.parent = this);
        }
    }
    export class TypeParameterListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeParameters: TypeParameterSyntax[];
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeParameters: TypeParameterSyntax[], greaterThanToken: ISyntaxToken) {
            super(data);
            this.lessThanToken = lessThanToken,
            this.typeParameters = typeParameters,
            lessThanToken.parent = this,
            !isShared(typeParameters) && (typeParameters.parent = this);
        }
    }
    export class HeritageClauseSyntax extends SyntaxNode {
        public extendsOrImplementsKeyword: ISyntaxToken;
        public typeNames: INameSyntax[];
        constructor(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: INameSyntax[]) {
            super(data);
            this.extendsOrImplementsKeyword = extendsOrImplementsKeyword,
            this.typeNames = typeNames,
            extendsOrImplementsKeyword.parent = this,
            !isShared(typeNames) && (typeNames.parent = this);
        }
        public kind(): SyntaxKind { return this.extendsOrImplementsKeyword.kind() === SyntaxKind.ExtendsKeyword ? SyntaxKind.ExtendsHeritageClause : SyntaxKind.ImplementsHeritageClause; }
    }
    export class EqualsValueClauseSyntax extends SyntaxNode {
        public equalsToken: ISyntaxToken;
        public value: IExpressionSyntax;
        constructor(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) {
            super(data);
            this.value = value,
            value.parent = this;
        }
    }
    export class CaseSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public caseKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any;
        constructor(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            super(data);
            this.expression = expression,
            this.statements = statements,
            expression.parent = this,
            !isShared(statements) && (statements.parent = this);
        }
    }
    export class DefaultSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public defaultKeyword: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _switchClauseBrand: any;
        constructor(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            super(data);
            this.statements = statements,
            !isShared(statements) && (statements.parent = this);
        }
    }
    export class ElseClauseSyntax extends SyntaxNode {
        public elseKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        constructor(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.statement = statement,
            statement.parent = this;
        }
    }
    export class CatchClauseSyntax extends SyntaxNode {
        public catchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public closeParenToken: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) {
            super(data);
            this.identifier = identifier,
            this.typeAnnotation = typeAnnotation,
            this.block = block,
            identifier.parent = this,
            typeAnnotation && (typeAnnotation.parent = this),
            block.parent = this;
        }
    }
    export class FinallyClauseSyntax extends SyntaxNode {
        public finallyKeyword: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) {
            super(data);
            this.block = block,
            block.parent = this;
        }
    }
    export class TypeParameterSyntax extends SyntaxNode {
        public identifier: ISyntaxToken;
        public constraint: ConstraintSyntax;
        constructor(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) {
            super(data);
            this.identifier = identifier,
            this.constraint = constraint,
            identifier.parent = this,
            constraint && (constraint.parent = this);
        }
    }
    export class ConstraintSyntax extends SyntaxNode {
        public extendsKeyword: ISyntaxToken;
        public typeOrExpression: ISyntaxNodeOrToken;
        constructor(data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken) {
            super(data);
            this.typeOrExpression = typeOrExpression,
            typeOrExpression.parent = this;
        }
    }
    export class SimplePropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public _propertyAssignmentBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.expression = expression,
            propertyName.parent = this,
            expression.parent = this;
        }
    }
    export class FunctionPropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _propertyAssignmentBrand: any;
        constructor(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }
    }
    export class ParameterSyntax extends SyntaxNode {
        public dotDotDotToken: ISyntaxToken;
        public modifiers: ISyntaxToken[];
        public identifier: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.dotDotDotToken = dotDotDotToken,
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.questionToken = questionToken,
            this.typeAnnotation = typeAnnotation,
            this.equalsValueClause = equalsValueClause,
            dotDotDotToken && (dotDotDotToken.parent = this),
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            questionToken && (questionToken.parent = this),
            typeAnnotation && (typeAnnotation.parent = this),
            equalsValueClause && (equalsValueClause.parent = this);
        }
    }
    export class EnumElementSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.equalsValueClause = equalsValueClause,
            propertyName.parent = this,
            equalsValueClause && (equalsValueClause.parent = this);
        }
    }
    export class TypeAnnotationSyntax extends SyntaxNode {
        public colonToken: ISyntaxToken;
        public type: ITypeSyntax;
        constructor(data: number, colonToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.type = type,
            type.parent = this;
        }
    }
    export class ExternalModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public requireKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public stringLiteral: ISyntaxToken;
        public closeParenToken: ISyntaxToken;
        public _moduleReferenceBrand: any;
        constructor(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken) {
            super(data);
            this.stringLiteral = stringLiteral,
            stringLiteral.parent = this;
        }
    }
    export class ModuleNameModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public moduleName: INameSyntax;
        public _moduleReferenceBrand: any;
        constructor(data: number, moduleName: INameSyntax) {
            super(data);
            this.moduleName = moduleName,
            moduleName.parent = this;
        }
    }

    (<any>SourceUnitSyntax).prototype.__kind = SyntaxKind.SourceUnit, (<any>QualifiedNameSyntax).prototype.__kind = SyntaxKind.QualifiedName, (<any>ObjectTypeSyntax).prototype.__kind = SyntaxKind.ObjectType, (<any>FunctionTypeSyntax).prototype.__kind = SyntaxKind.FunctionType, (<any>ArrayTypeSyntax).prototype.__kind = SyntaxKind.ArrayType, (<any>ConstructorTypeSyntax).prototype.__kind = SyntaxKind.ConstructorType, (<any>GenericTypeSyntax).prototype.__kind = SyntaxKind.GenericType, (<any>TypeQuerySyntax).prototype.__kind = SyntaxKind.TypeQuery, (<any>InterfaceDeclarationSyntax).prototype.__kind = SyntaxKind.InterfaceDeclaration, (<any>FunctionDeclarationSyntax).prototype.__kind = SyntaxKind.FunctionDeclaration, (<any>ModuleDeclarationSyntax).prototype.__kind = SyntaxKind.ModuleDeclaration, (<any>ClassDeclarationSyntax).prototype.__kind = SyntaxKind.ClassDeclaration, (<any>EnumDeclarationSyntax).prototype.__kind = SyntaxKind.EnumDeclaration, (<any>ImportDeclarationSyntax).prototype.__kind = SyntaxKind.ImportDeclaration, (<any>ExportAssignmentSyntax).prototype.__kind = SyntaxKind.ExportAssignment, (<any>MemberFunctionDeclarationSyntax).prototype.__kind = SyntaxKind.MemberFunctionDeclaration, (<any>MemberVariableDeclarationSyntax).prototype.__kind = SyntaxKind.MemberVariableDeclaration, (<any>ConstructorDeclarationSyntax).prototype.__kind = SyntaxKind.ConstructorDeclaration, (<any>IndexMemberDeclarationSyntax).prototype.__kind = SyntaxKind.IndexMemberDeclaration, (<any>GetAccessorSyntax).prototype.__kind = SyntaxKind.GetAccessor, (<any>SetAccessorSyntax).prototype.__kind = SyntaxKind.SetAccessor, (<any>PropertySignatureSyntax).prototype.__kind = SyntaxKind.PropertySignature, (<any>CallSignatureSyntax).prototype.__kind = SyntaxKind.CallSignature, (<any>ConstructSignatureSyntax).prototype.__kind = SyntaxKind.ConstructSignature, (<any>IndexSignatureSyntax).prototype.__kind = SyntaxKind.IndexSignature, (<any>MethodSignatureSyntax).prototype.__kind = SyntaxKind.MethodSignature, (<any>BlockSyntax).prototype.__kind = SyntaxKind.Block, (<any>IfStatementSyntax).prototype.__kind = SyntaxKind.IfStatement, (<any>VariableStatementSyntax).prototype.__kind = SyntaxKind.VariableStatement, (<any>ExpressionStatementSyntax).prototype.__kind = SyntaxKind.ExpressionStatement, (<any>ReturnStatementSyntax).prototype.__kind = SyntaxKind.ReturnStatement, (<any>SwitchStatementSyntax).prototype.__kind = SyntaxKind.SwitchStatement, (<any>BreakStatementSyntax).prototype.__kind = SyntaxKind.BreakStatement, (<any>ContinueStatementSyntax).prototype.__kind = SyntaxKind.ContinueStatement, (<any>ForStatementSyntax).prototype.__kind = SyntaxKind.ForStatement, (<any>ForInStatementSyntax).prototype.__kind = SyntaxKind.ForInStatement, (<any>EmptyStatementSyntax).prototype.__kind = SyntaxKind.EmptyStatement, (<any>ThrowStatementSyntax).prototype.__kind = SyntaxKind.ThrowStatement, (<any>WhileStatementSyntax).prototype.__kind = SyntaxKind.WhileStatement, (<any>TryStatementSyntax).prototype.__kind = SyntaxKind.TryStatement, (<any>LabeledStatementSyntax).prototype.__kind = SyntaxKind.LabeledStatement, (<any>DoStatementSyntax).prototype.__kind = SyntaxKind.DoStatement, (<any>DebuggerStatementSyntax).prototype.__kind = SyntaxKind.DebuggerStatement, (<any>WithStatementSyntax).prototype.__kind = SyntaxKind.WithStatement, (<any>DeleteExpressionSyntax).prototype.__kind = SyntaxKind.DeleteExpression, (<any>TypeOfExpressionSyntax).prototype.__kind = SyntaxKind.TypeOfExpression, (<any>VoidExpressionSyntax).prototype.__kind = SyntaxKind.VoidExpression, (<any>ConditionalExpressionSyntax).prototype.__kind = SyntaxKind.ConditionalExpression, (<any>MemberAccessExpressionSyntax).prototype.__kind = SyntaxKind.MemberAccessExpression, (<any>InvocationExpressionSyntax).prototype.__kind = SyntaxKind.InvocationExpression, (<any>ArrayLiteralExpressionSyntax).prototype.__kind = SyntaxKind.ArrayLiteralExpression, (<any>ObjectLiteralExpressionSyntax).prototype.__kind = SyntaxKind.ObjectLiteralExpression, (<any>ObjectCreationExpressionSyntax).prototype.__kind = SyntaxKind.ObjectCreationExpression, (<any>ParenthesizedExpressionSyntax).prototype.__kind = SyntaxKind.ParenthesizedExpression, (<any>ParenthesizedArrowFunctionExpressionSyntax).prototype.__kind = SyntaxKind.ParenthesizedArrowFunctionExpression, (<any>SimpleArrowFunctionExpressionSyntax).prototype.__kind = SyntaxKind.SimpleArrowFunctionExpression, (<any>CastExpressionSyntax).prototype.__kind = SyntaxKind.CastExpression, (<any>ElementAccessExpressionSyntax).prototype.__kind = SyntaxKind.ElementAccessExpression, (<any>FunctionExpressionSyntax).prototype.__kind = SyntaxKind.FunctionExpression, (<any>OmittedExpressionSyntax).prototype.__kind = SyntaxKind.OmittedExpression, (<any>VariableDeclarationSyntax).prototype.__kind = SyntaxKind.VariableDeclaration, (<any>VariableDeclaratorSyntax).prototype.__kind = SyntaxKind.VariableDeclarator, (<any>ArgumentListSyntax).prototype.__kind = SyntaxKind.ArgumentList, (<any>ParameterListSyntax).prototype.__kind = SyntaxKind.ParameterList, (<any>TypeArgumentListSyntax).prototype.__kind = SyntaxKind.TypeArgumentList, (<any>TypeParameterListSyntax).prototype.__kind = SyntaxKind.TypeParameterList, (<any>EqualsValueClauseSyntax).prototype.__kind = SyntaxKind.EqualsValueClause, (<any>CaseSwitchClauseSyntax).prototype.__kind = SyntaxKind.CaseSwitchClause, (<any>DefaultSwitchClauseSyntax).prototype.__kind = SyntaxKind.DefaultSwitchClause, (<any>ElseClauseSyntax).prototype.__kind = SyntaxKind.ElseClause, (<any>CatchClauseSyntax).prototype.__kind = SyntaxKind.CatchClause, (<any>FinallyClauseSyntax).prototype.__kind = SyntaxKind.FinallyClause, (<any>TypeParameterSyntax).prototype.__kind = SyntaxKind.TypeParameter, (<any>ConstraintSyntax).prototype.__kind = SyntaxKind.Constraint, (<any>SimplePropertyAssignmentSyntax).prototype.__kind = SyntaxKind.SimplePropertyAssignment, (<any>FunctionPropertyAssignmentSyntax).prototype.__kind = SyntaxKind.FunctionPropertyAssignment, (<any>ParameterSyntax).prototype.__kind = SyntaxKind.Parameter, (<any>EnumElementSyntax).prototype.__kind = SyntaxKind.EnumElement, (<any>TypeAnnotationSyntax).prototype.__kind = SyntaxKind.TypeAnnotation, (<any>ExternalModuleReferenceSyntax).prototype.__kind = SyntaxKind.ExternalModuleReference, (<any>ModuleNameModuleReferenceSyntax).prototype.__kind = SyntaxKind.ModuleNameModuleReference;
}