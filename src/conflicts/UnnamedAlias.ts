import type Alias from "../nodes/Alias";
import Conflict from "./Conflict";


export default class UnnamedAlias extends Conflict {
    readonly alias: Alias;
    constructor(alias: Alias) {
        super(true);
        this.alias = alias;
    }

    getConflictingNodes() {
        return [ this.alias ];
    }

    getExplanations() { 
        return {
            eng: `There should a name after me`
        }
    }

}
