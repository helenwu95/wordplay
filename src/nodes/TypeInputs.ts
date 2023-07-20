import type Locale from '@locale/Locale';
import Purpose from '../concepts/Purpose';
import Glyphs from '../lore/Glyphs';
import { TYPE_CLOSE_SYMBOL, TYPE_OPEN_SYMBOL } from '../parser/Symbols';
import type { Grammar, Replacement } from './Node';
import Token from './Token';
import Symbol from './Symbol';
import Type from './Type';
import Node, { list, node, optional } from './Node';

export default class TypeInputs extends Node {
    readonly open: Token;
    readonly types: Type[];
    readonly close: Token | undefined;

    constructor(open: Token, types: Type[], close: Token | undefined) {
        super();

        this.open = open;
        this.types = types;
        this.close = close;

        this.computeChildren();
    }

    static make(types?: Type[]) {
        return new TypeInputs(
            new Token(TYPE_OPEN_SYMBOL, Symbol.TypeOpen),
            types ?? [],
            new Token(TYPE_CLOSE_SYMBOL, Symbol.TypeClose)
        );
    }

    static getPossibleNodes() {
        return [TypeInputs.make()];
    }

    getPurpose() {
        return Purpose.Evaluate;
    }

    getGrammar(): Grammar {
        return [
            { name: 'open', types: node(Symbol.TypeOpen) },
            { name: 'types', types: list(node(Type)) },
            { name: 'close', types: optional(node(Symbol.TypeClose)) },
        ];
    }

    clone(replace?: Replacement) {
        return new TypeInputs(
            this.replaceChild('open', this.open, replace),
            this.replaceChild('types', this.types, replace),
            this.replaceChild('close', this.close, replace)
        ) as this;
    }

    computeConflicts() {}

    getNodeLocale(translation: Locale) {
        return translation.node.TypeInputs;
    }

    getGlyphs() {
        return Glyphs.Type;
    }
}
