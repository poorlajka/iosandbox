import { type Instruction, Operator, type Operand} from "./instruction";

export namespace Parser {

    export const parse_program = (program: string[]): Instruction[] => {
        let [preprocessed_program, labels] = preprocess_program(program);

        let instructions: Instruction[] = [];
        for (const [i, line] of preprocessed_program.entries()) {
            instructions.push(parse_line(line, i+1, labels));
        }
        return instructions;
    }

    const preprocess_program = (program: string[]): [string[], Map<string, number>]=> {
        let labels = new Map();
        let line_nr = 1;
        while (line_nr < program.length) {
            if (program[line_nr].trim().endsWith(":")) {
                labels.set(program[line_nr].split(":")[0], line_nr);
                program.splice(line_nr, 1);
            }
            else {
                line_nr++;
            }
        }
        return [program, labels]; 
    }

    const parse_line = (line: string, line_nr: number, labels: Map<string, number>): Instruction => {
        const operator_str = line.substring(0, line.indexOf(" "));
        const operator = parse_operator(operator_str, line_nr);

        let operands_str = line
            .substring(line.indexOf(" ") + 1)
            .split(",")
            .map(s => s.replace(/\s+/g, ""));

        const [operand_a, operand_b] = parse_operands(operator, operands_str, line_nr, labels);

        return {
            operator: operator,
            operand_a: operand_a,
            operand_b: operand_b,
        };
    }

    const parse_operator = (operator_str: string, line_nr: number): Operator => {
        for (let op of Object.values(Operator)) {
            if (operator_str === op) {
                return op;
            }
        }
        throw new Error(`Parsing error on line ${line_nr}: Expected a valid operator instead got ${operator_str}`);
    }

    const parse_operands = (operator: Operator, 
        operands: string[], line_nr: number, labels: Map<string, number>): (Operand | undefined)[] => {
        return [parse_operand(operands[0], labels), parse_operand(operands[1], labels)];
    }

    const parse_operand = (operand: string, labels: Map<string, number>): Operand | undefined => {
        if (operand === undefined) {
            return operand;
        }
        if (labels.has(operand.trim())) {
            return { type: "Data", value: Number(labels.get(operand.trim()))};
        }
        if (operand.startsWith("r")) {
            return { type: "Register", id: Number(operand.split("r")[1])};
        }
        if (operand.startsWith("io")) {
            return { type: "Register", id: Number(operand.split("io")[1])};
        }
        if(operand.startsWith("0x")) {
            return { type: "Data", value: Number(operand)};
        }
        if(operand.startsWith("0b")) {
            return { type: "Data", value: Number(operand)};
        }
        else {
            return { type: "Data", value: Number(operand)};
        }
    }
}

