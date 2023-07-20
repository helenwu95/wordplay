import type Conflict from '@conflicts/Conflict';
import { UnparsableConflict } from '@conflicts/UnparsableConflict';
import type { NativeTypeName } from '../native/NativeConstants';
import type Locale from '@locale/Locale';
import Node, { list, type Grammar, type Replacement, node } from './Node';
import Type from './Type';
import Glyphs from '../lore/Glyphs';

export default class UnparsableType extends Type {
    readonly unparsables: Node[];

    constructor(nodes: Node[]) {
        super();

        this.unparsables = nodes;
    }

    acceptsAll(): boolean {
        return false;
    }

    getNativeTypeName(): NativeTypeName {
        return 'unparsable';
    }

    getGrammar(): Grammar {
        return [{ name: 'unparsables', kind: list(node(Node)) }];
    }

    computeConflicts(): void | Conflict[] {
        return [new UnparsableConflict(this)];
    }

    clone(replace?: Replacement): this {
        return new UnparsableType(
            this.replaceChild('unparsables', this.unparsables, replace)
        ) as this;
    }

    getNodeLocale(translation: Locale) {
        return translation.node.UnparsableType;
    }

    getGlyphs() {
        return Glyphs.Unparsable;
    }
}
