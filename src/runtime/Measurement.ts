import Unit from "../nodes/Unit";
import Bool from "./Bool";
import Exception, { ExceptionType } from "./Exception";
import Value from "./Value";

export default class Measurement extends Value {

    readonly number: number;
    readonly unit: Unit;

    constructor(number: number, unit: Unit) {
        super();

        this.number = number;
        this.unit = unit;
    }

    // TODO Check the integer part once we implement it.
    isInteger() { return this.number === Math.floor(this.number); }

    evaluatePrefix(operator: string) {

        switch(operator) {
            case "-": return new Measurement(-this.number, this.unit);
            // TODO Fix the unit on square roots.
            case "√": return new Measurement(Math.sqrt(this.number), this.unit);
            default: return new Exception(ExceptionType.UNKNOWN_OPERATOR);
        }

    }

    evaluateInfix(operator: string, right: Value) {

        if(!(right instanceof Measurement)) 
            return new Exception(ExceptionType.EXPECTED_TYPE);
    
        switch(operator) {
            case "+":
                return this.unit.toString() === right.unit.toString() ?
                    new Measurement(this.number + right.number, this.unit) :
                    new Exception(ExceptionType.EXPECTED_TYPE)
            case "-":
                return this.unit.toString() === right.unit.toString() ?
                    new Measurement(this.number - right.number, this.unit) :
                    new Exception(ExceptionType.EXPECTED_TYPE)
            case "×":
            case "*":
            case "·":
                return new Measurement(
                    this.number * right.number, 
                    new Unit(
                        this.unit.numerator.concat(right.unit.numerator),
                        this.unit.denominator.concat(right.unit.denominator)
                    )
                )
            case "÷":
                return new Measurement(this.number / right.number, 
                    new Unit(
                        this.unit.numerator.concat(right.unit.denominator),
                        this.unit.denominator.concat(right.unit.numerator)
                    )
                );
            case "%": return new Measurement(this.number % right.number, this.unit);
            // TODO Implement
            case "^":
            case "<": return new Bool(this.number < right.number);
            case ">": return new Bool(this.number > right.number);
            case "≤": return new Bool(this.number >= right.number);
            case "≥": return new Bool(this.number <= right.number);
            case "=": return new Bool(this.number === right.number);
            case "≠": return new Bool(this.number !== right.number);
            default: return new Exception(ExceptionType.UNKNOWN_OPERATOR);
        }

    }

    toString() { return this.number.toString() + this.unit.toString(); }

}