import Stream from "./Stream";
import type Value from "./Value";
import Time from "../native/Time";
import StructureDefinitionValue from "./StructureDefinitionValue";
import Verse from "../native/Verse";
import Phrase from "../native/Phrase";
import Group from "../native/Group";
import MouseButton from "../native/MouseButton";
import MousePosition from "../native/MousePosition";
import Keyboard from "../native/Keyboard";
import type StructureDefinition from "../nodes/StructureDefinition";
import type Evaluator from "./Evaluator";
import Layout, { Vertical } from "../native/Layout";
import Microphone from "../native/Microphone";

export default class Shares {

    readonly values: Map<string, Value>;
    readonly defaults: Record<string, StructureDefinitionValue | Stream> = {}

    readonly evaluator: Evaluator;
    readonly time: Time;
    readonly mouseButton: MouseButton;
    readonly mousePosition: MousePosition;
    readonly keyboard: Keyboard;
    readonly microphone: Microphone;

    constructor(evaluator: Evaluator, bindings?: Record<string, Value>) {

        this.evaluator = evaluator;
        this.values = new Map();

        if(bindings)
            Object.keys(bindings).forEach(name => this.bind(name, bindings[name]));

        this.addStructureDefinition(Verse);
        this.addStructureDefinition(Phrase);
        this.addStructureDefinition(Group);
        this.addStructureDefinition(Vertical);
        this.addStructureDefinition(Layout);

        // Share a timer stream for programs to listen to.
        this.time = new Time(evaluator);
        Object.values(this.time.getNames()).forEach(name => this.bind(name, this.time));

        // Share a mouse button stream for programs to listen to.
        this.mouseButton = new MouseButton(evaluator);
        Object.values(this.mouseButton.getNames()).forEach(name => this.bind(name, this.mouseButton));

        // Share a mouse position stream for programs to listen to.
        this.mousePosition = new MousePosition(evaluator);
        Object.values(this.mousePosition.getNames()).forEach(name => this.bind(name, this.mousePosition));
        
        // Share a keyboard button stream for programs to listen to.
        this.keyboard = new Keyboard(evaluator);
        Object.values(this.keyboard.getNames()).forEach(name => this.bind(name, this.keyboard));

        // Share the microphone.
        this.microphone = new Microphone(evaluator);
        Object.values(this.microphone.getNames()).forEach(name => this.bind(name, this.microphone));
        
    }

    addStructureDefinition(def: StructureDefinition) {
        const val = new StructureDefinitionValue(this.evaluator.getProgram(), def);
        def.names.names.forEach(a => {
            const name = a.getName();
            if(name !== undefined) {
                this.bind(name, val);
                this.defaults[name] = val;
            }
        });

    }

    getDefaultShares() { 
        return this.defaults;
    }

    getDefinitions() { 
        return  Array.from(this.values.values())
                .filter(v => v instanceof StructureDefinitionValue || v instanceof Stream)
                .map(v => v instanceof StructureDefinitionValue ? v.definition : v) as (Stream | StructureDefinition)[] }

    getStreams(): Stream[] {
        return Array.from(this.values.values()).filter(v => v instanceof Stream) as Stream[];
    }

    getMouseButton(): MouseButton { return this.mouseButton; }
    getMousePosition(): MousePosition { return this.mousePosition; }
    getKeyboard(): Keyboard { return this.keyboard; }

    bind(name: string, value: Value): undefined {
        this.values.set(name, value);
        return undefined;
    }

    /** Handle version. */
    resolve(name: string): Value | undefined {
        return this.values.has(name) ? this.values.get(name) as Value : undefined;
    }

}