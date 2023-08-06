import Block, { BlockKind } from '@nodes/Block';
import BooleanType from '@nodes/BooleanType';
import StructureDefinition from '@nodes/StructureDefinition';
import Bool from '@runtime/Bool';
import Text from '@runtime/Text';
import { createBasisConversion, createBasisFunction } from './Basis';
import type Value from '@runtime/Value';
import { getDocLocales } from '@locale/getDocLocales';
import { getNameLocales } from '@locale/getNameLocales';
import Evaluation from '@runtime/Evaluation';
import type Expression from '../nodes/Expression';
import type Locale from '../locale/Locale';
import type { FunctionText } from '../locale/Locale';
import type Type from '../nodes/Type';

export default function bootstrapBool(locales: Locale[]) {
    function createBooleanFunction(
        text: (locale: Locale) => FunctionText<any>,
        inputs: Type[],
        expression: (requestor: Expression, left: Bool, right: Bool) => Bool
    ) {
        return createBasisFunction(
            locales,
            text,
            undefined,
            inputs,
            BooleanType.make(),
            (requestor, evaluation) => {
                const left = evaluation.getClosure();
                const right: Value | undefined = evaluation.getInput(0);
                // This should be impossible, but the type system doesn't know it.
                if (!(left instanceof Bool))
                    return evaluation.getValueOrTypeException(
                        requestor,
                        BooleanType.make(),
                        left instanceof Evaluation ? undefined : left
                    );
                if (!(right instanceof Bool))
                    return evaluation.getValueOrTypeException(
                        requestor,
                        BooleanType.make(),
                        right
                    );
                return expression(requestor, left, right);
            }
        );
    }

    return StructureDefinition.make(
        getDocLocales(locales, (locale) => locale.basis.Boolean.doc),
        getNameLocales(locales, (locale) => locale.basis.Boolean.name),
        [],
        undefined,
        [],
        new Block(
            [
                createBooleanFunction(
                    (locale) => locale.basis.Boolean.function.and,
                    [BooleanType.make()],
                    (requestor, left, right) => left.and(requestor, right)
                ),
                createBooleanFunction(
                    (locale) => locale.basis.Boolean.function.or,
                    [BooleanType.make()],
                    (requestor, left, right) => left.or(requestor, right)
                ),
                createBasisFunction(
                    locales,
                    (locale) => locale.basis.Boolean.function.not,
                    undefined,
                    [],
                    BooleanType.make(),
                    (requestor, evaluation) => {
                        const left = evaluation.getClosure();
                        // This should be impossible, but the type system doesn't know it.
                        if (!(left instanceof Bool))
                            return evaluation.getValueOrTypeException(
                                requestor,
                                BooleanType.make(),
                                left
                            );
                        return left.not(requestor);
                    }
                ),
                createBooleanFunction(
                    (locale) => locale.basis.Boolean.function.equals,
                    [BooleanType.make()],
                    (requestor, left, right) =>
                        new Bool(requestor, left.isEqualTo(right))
                ),
                createBooleanFunction(
                    (locale) => locale.basis.Boolean.function.notequal,
                    [BooleanType.make()],
                    (requestor, left, right) =>
                        new Bool(requestor, !left.isEqualTo(right))
                ),
                createBasisConversion(
                    getDocLocales(
                        locales,
                        (locale) => locale.basis.Boolean.conversion.text
                    ),
                    '?',
                    "''",
                    (requestor, val: Value) =>
                        new Text(requestor, val.toString())
                ),
            ],
            BlockKind.Structure
        )
    );
}
