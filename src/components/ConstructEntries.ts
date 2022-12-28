import Bind from "../nodes/Bind"
import Block from "../nodes/Block"
import Changed from "../nodes/Changed"
import Conditional from "../nodes/Conditional"
import ConversionDefinition from "../nodes/ConversionDefinition"
import Convert from "../nodes/Convert"
import ExpressionPlaceholder from "../nodes/ExpressionPlaceholder"
import FunctionDefinition from "../nodes/FunctionDefinition"
import Names from "../nodes/Names"
import type Node from "../nodes/Node"
import Reaction from "../nodes/Reaction"
import StructureDefinition from "../nodes/StructureDefinition"
import TypePlaceholder from "../nodes/TypePlaceholder"

/** An ordered list of construct categories */
export const constructCategories = [
    "names",
    "streams",
    "choosing",
    "evaluation",
    "conversion"
] as const;

export type ConstructEntry = {
    category: typeof constructCategories[number],
    example: Node
}

export const constructs: ConstructEntry[] = [
    { 
        category: "names",
        example: Bind.make(undefined, Names.make([ "_" ]), undefined, new ExpressionPlaceholder())
    },
    {
        category: "names",
        example: Block.make([ ExpressionPlaceholder.make() ])
    },
    {
        category: "names",
        example: StructureDefinition.make(undefined, Names.make(["_"]), [], undefined, [], Block.make([]))
    },
    {
        category: "choosing",
        example: Conditional.make(ExpressionPlaceholder.make(), ExpressionPlaceholder.make(), ExpressionPlaceholder.make())
    },
    {
        category: "evaluation",
        example: FunctionDefinition.make(undefined, Names.make(["_"]), undefined, [], ExpressionPlaceholder.make())
    },
    {
        category: "streams",
        example: Changed.make(ExpressionPlaceholder.make())
    },
    {
        category: "streams",
        example: Reaction.make(ExpressionPlaceholder.make(), ExpressionPlaceholder.make())
    },
    {
        category: "conversion",
        example: ConversionDefinition.make(undefined, new TypePlaceholder(), new TypePlaceholder(), ExpressionPlaceholder.make())
    },
    {
        category: "conversion",
        example: Convert.make(ExpressionPlaceholder.make(), new TypePlaceholder())
    },
];