import type { Grammar, Replacement } from './Node';
import Token from './Token';
import Symbol from './Symbol';
import { TYPE_CLOSE_SYMBOL, TYPE_OPEN_SYMBOL } from '@parser/Symbols';
import Names from './Names';
import type TypeVariable from './TypeVariable';
import type Conflict from '@conflicts/Conflict';
import type Locale from '@locale/Locale';
import DuplicateTypeVariable from '@conflicts/DuplicateTypeVariable';
import Glyphs from '../lore/Glyphs';
import Purpose from '../concepts/Purpose';
import Node, { node } from './Node';

export default class TypeVariables extends Node {
    readonly open: Token;
    readonly variables: TypeVariable[];
    readonly close: Token | undefined;

    constructor(open: Token, names: TypeVariable[], close: Token | undefined) {
        super();

        this.open = open;
        this.variables = names;
        this.close = close;

        this.computeChildren();
    }

    static make(variables?: TypeVariable[]) {
        return new TypeVariables(
            new Token(TYPE_OPEN_SYMBOL, Symbol.TypeOpen),
            variables ?? [],
            new Token(TYPE_CLOSE_SYMBOL, Symbol.TypeClose)
        );
    }

    static getPossibleNodes() {
        return [TypeVariables.make()];
    }

    getGrammar(): Grammar {
        return [
            { name: 'open', types: node(Symbol.TypeOpen) },
            { name: 'variables', types: node(Names) },
            { name: 'close', types: node(Symbol.TypeClose) },
        ];
    }

    clone(replace?: Replacement) {
        return new TypeVariables(
            this.replaceChild('open', this.open, replace),
            this.replaceChild('variables', this.variables, replace),
            this.replaceChild('close', this.close, replace)
        ) as this;
    }

    simplify() {
        return new TypeVariables(
            this.open,
            this.variables.map((v) => v.simplify()),
            this.close
        );
    }

    getPurpose() {
        return Purpose.Type;
    }

    computeConflicts() {
        const conflicts: Conflict[] = [];

        // Type variables must have unique names.
        for (const typeVar of this.variables) {
            const dupe = this.variables.find(
                (v) => v !== typeVar && v.names.sharesName(typeVar.names)
            );
            if (dupe) conflicts.push(new DuplicateTypeVariable(typeVar, dupe));
        }

        return conflicts;
    }

    hasVariableNamed(name: string) {
        return this.variables.some((variable) => variable.names.hasName(name));
    }

    getNodeLocale(translation: Locale) {
        return translation.node.TypeVariables;
    }

    getGlyphs() {
        return Glyphs.Name;
    }
}
