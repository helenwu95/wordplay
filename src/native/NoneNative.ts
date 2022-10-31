import FunctionDefinition from "../nodes/FunctionDefinition";
import StructureDefinition from "../nodes/StructureDefinition";
import Text from "../runtime/Text";
import Bool from "../runtime/Bool";
import None from "../runtime/None";
import Block from "../nodes/Block";
import Bind from "../nodes/Bind";
import NativeExpression from "./NativeExpression";
import BooleanType from "../nodes/BooleanType";
import TypeException from "../runtime/TypeException";
import NoneType from "../nodes/NoneType";
import type Value from "../runtime/Value";
import { createNativeConversion } from "./NativeBindings";
import { TRANSLATE, WRITE, WRITE_DOCS } from "../nodes/Translations";
import type Translations from "../nodes/Translations";
import type Node from "../nodes/Node";

export default function bootstrapNone() {

    function createNativeNoneFunction(docs: Translations, names: Translations, expression: (requestor: Node, left: None, right: None) => Value) {
        return new FunctionDefinition(
            docs,
            names,
            [],
            [ new Bind(
                {
                    eng: WRITE,
                    "😀": WRITE
                }, 
                {
                    eng: "val",
                    "😀": TRANSLATE
                }, 
                new BooleanType()
            ) ],
            new NativeExpression(
                new BooleanType(), 
                (requestor, evaluation) => {
                    const left = evaluation.getContext();
                    const right = evaluation.resolve("val");
                    // This should be impossible, but the type system doesn't know it.
                    if(!(left instanceof None)) return new TypeException(evaluation.getEvaluator(), new NoneType(), left);
                    if(!(right instanceof None)) return new TypeException(evaluation.getEvaluator(), new NoneType(), right);
                    return expression(requestor, left, right);
                },
                {
                    "😀": TRANSLATE, 
                    eng: "Native none operation." 
                }
            ),
            new BooleanType()
        );
    }
    
    return new StructureDefinition(
        {
            eng: WRITE,
            "😀": WRITE
        },
        {
            eng: "none",
            "😀": TRANSLATE
        }, 
        [], [], [],
        new Block([ 
            createNativeConversion(WRITE_DOCS, "!", "''", (requestor, val: None) => new Text(requestor, val.toString())),
            createNativeNoneFunction(
                {
                    eng: WRITE,
                    "😀": WRITE
                },
                {
                    eng: "equals",
                    "😀": "="
                }, 
                (requestor: Node, left: None, right: None) => new Bool(requestor, left.isEqualTo(right))
            ),
            createNativeNoneFunction(
                {
                    eng: WRITE,
                    "😀": WRITE
                },
                {
                    eng: "not-equal",
                    "😀": "≠"
                }, 
                (requestor: Node, left: None, right: None) => new Bool(requestor, !left.isEqualTo(right))
            )
        ], false, true)
    );

}