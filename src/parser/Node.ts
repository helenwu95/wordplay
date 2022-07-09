export default abstract class Node {

    constructor() {

    }

    /** Returns the children in the node, in order. Needed for batch operations on trees. */
    abstract getChildren() : Node[];
    
    toString(depth: number=0): string {
        const tabs = "\t".repeat(depth);
        return `${tabs}${this.constructor.name}\n${this.getChildren().map(n => n.toString(depth + 1)).join("\n")}`;
    }

    toWordplay() { this.getChildren().map(t => t.toWordplay()).join(""); }

}