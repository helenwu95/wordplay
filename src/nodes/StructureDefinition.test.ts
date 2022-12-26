import { test } from "vitest";
import { testConflict } from "../conflicts/TestUtilities";
import DuplicateLanguages from "../conflicts/DuplicateLanguages";
import RequiredAfterOptional from "../conflicts/RequiredAfterOptional";
import DuplicateTypeVariables from "../conflicts/DuplicateTypeVariables";
import StructureDefinition from "./StructureDefinition";
import DuplicateNames from "../conflicts/DuplicateNames";
import { Unimplemented } from "../conflicts/Unimplemented";
import { Implemented } from "../conflicts/Implemented";
import { DisallowedInputs } from "../conflicts/DisallowedInputs";
import Names from "./Names";
import Docs from "./Docs";
import TypeVariables from "./TypeVariables";
import NotAnInterface from "../conflicts/NotAnInterface";

test("Test custom type conflicts", () => {

    testConflict('a:1\n`hi`/eng`hola`/spa•Hi()', 'a:1\n`hi`/eng`hola`/eng•Hi() ', Docs, DuplicateLanguages);
    testConflict('•Cat,Dog(a b)', '•Cat,Cat(a b)', Names, DuplicateNames);
    testConflict('•Cat(a b)', '•Cat(a a)', StructureDefinition, DuplicateNames);
    testConflict('•Cat⸨T U⸩ ()', '•Cat⸨T T⸩ ()', TypeVariables, DuplicateTypeVariables);
    testConflict('•Cat(a•# b•#:1)', '•Cat(a•#:1 b•#)', StructureDefinition, RequiredAfterOptional);
    testConflict('•Animal() ( ƒ sound()•"" _)\n•Cat Animal() ( ƒ sound() "meow" )', '•Animal() ( ƒ sound()•"" _)\n•Cat Animal() ( ƒ speak() "meow" )', StructureDefinition, Unimplemented, 1);
    testConflict('•Animal() ( ƒ sound()•"" _ ƒ smell() _)', '•Animal() ( ƒ sound()•"" _ ƒ smell() 1)', StructureDefinition, Implemented, 0);
    testConflict('•Animal() ( ƒ sound()•"" _ ƒ smell() _)', '•Animal(name•"") ( ƒ sound()•"" _ ƒ smell() _)', StructureDefinition, DisallowedInputs, 0);
    testConflict(
        // Multiple levels of interface should work
        `
        •Form() (
            ƒ die()•"" _
        )
          
        •Animal Form() (
            ƒ poop()•"" _
        )
          
        •Cat Animal() (
            ƒ die() "mew"
            ƒ poop() "ploit"
            ƒ meow() "meow"
        )
        `, 
        // Multiple levels of interface should work
        `
        •Form() (
            ƒ die()•"" _
        )
          
        •Animal Form() (
            ƒ poop()•"" _
        )
          
        •Cat Animal() (
            ƒ die() "mew"
            ƒ meow() "meow"
        )
        `, 
        StructureDefinition, Unimplemented, 2
    );
    // Interfaces must be structure definitions
    testConflict(
        `
        •Cat() (
            ƒ poop() _
        )
        •Boomy Cat()
        `,
        `
        •Cat() (
            ƒ poop() _
        )
        A: 5
        •Boomy A()
        `,
        StructureDefinition, NotAnInterface, 1
    );

    // Interfaces must be interfaces
    testConflict(
        `
        •Cat() (
            ƒ poop() _
        )
        •Boomy Cat()
        `,
        `
        •Cat() (
            ƒ poop() "psssst"
        )
        •Boomy Cat()
        `,
        StructureDefinition, NotAnInterface, 1
    )

});