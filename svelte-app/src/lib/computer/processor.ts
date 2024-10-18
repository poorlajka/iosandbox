import { type Memory } from "./memory";
import { type Instruction, Operator, type Operand } from "./instruction";
import {Alu, AluOp} from "./alu";

type Data = {
    type: "Data";
    value: number;
};

type Register = {
    type: "Register";
    id: number;
};

type Address = {
    type: "Address";
    value: number;
};

interface Processor {
    load_instructions(instructions: Instruction[]): void;
    run_cycle(): void;
    finished_running(): boolean;
    read_pin(id: number): number;
    set_pin(id: number, value: number): void;
    trigger_interrupt(jmp_id: number): void;
    reset(): void;
    goto_start(): void;
}

const new_processor = (): Processor => {
    return new _Processor();
}

class _Processor implements Processor {
    program_counter: number;
    instructions: Instruction[];
    gen_registers: Data[];
    io_registers: Data[];
    memory?: Memory;
    alu: Alu;
    interrupt_vector: number[];

    constructor() {
        this.program_counter = 0;
        this.instructions = [];
        this.gen_registers = Array(20).fill({ type: "Data", value: 0 });
        this.io_registers = Array(20).fill({ type: "Data", value: 0 });
        this.memory = undefined;
        this.alu = new Alu();
        this.interrupt_vector = Array(20).fill(-1);
    }

    goto_start(): void {
        this.program_counter = 0;
        this.gen_registers = Array(20).fill({ type: "Data", value: 0 });
        this.io_registers = Array(20).fill({ type: "Data", value: 0 });
        this.interrupt_vector = Array(20).fill(-1);
    }

    trigger_interrupt = (jmp_id: number) => {
        const instruction = this.interrupt_vector[jmp_id];
        console.log("interrupt called");
        if (instruction > 0) {
        console.log("interrupt jumped");
        console.log(this.instructions[instruction].operator);
            this.program_counter = instruction;
        }
    }

    register_interrupt = (jmp_id: number, interrupt_location: number) => {

        console.log("interrupt registerd");
        console.log(jmp_id);
        console.log(interrupt_location);
        this.interrupt_vector[jmp_id] = interrupt_location;
    }

    read_pin = (id: number): number => {
        return this.io_registers[id].value;
    }

    set_pin = (id: number, value: number): void => {
        this.io_registers[id] = { type: "Data", value: value };
    }

    reset = () => {
        this.program_counter = 0;
    }

    finished_running = (): boolean => {
        return this.program_counter >= this.instructions.length; 
    }

    load_instructions = (instructions: Instruction[]) => {
        this.instructions = instructions;
        this.program_counter = 0;
    }

    run_cycle = () => {

        const fetched_instruction = this.instructions[this.program_counter++];

        const jump = this.execute(fetched_instruction);
        if (jump !== undefined) {
            this.program_counter = jump;
        }
    } 

    execute = (instruction: Instruction): number | undefined => {

        let jump: number | undefined = undefined;

        switch (instruction.operator) {
            case Operator.mov: {
                this.mov(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.out: {
                this.out(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.in: {
                this.in(instruction.operand_a!, instruction.operand_b!);
                break;
            }

            case Operator.add: {
                this.add(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.sub: {
                this.sub(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.mul: {
                this.mul(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.div: {
                this.idiv(instruction.operand_a!, instruction.operand_b!);
                break;
            }

            case Operator.and: {
                this.and(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.or: {
                this.or(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.xor: {
                this.xor(instruction.operand_a!, instruction.operand_b!);
                break;
            }

            case Operator.cmp: {
                this.cmp(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.int: {
                this.int(instruction.operand_a!, instruction.operand_b!);
                break;
            }
            case Operator.jmp: {
                this.jmp(instruction.operand_a!);
                break;
            }
            case Operator.je: {
                this.je(instruction.operand_a!);
                break;
            }
            case Operator.jne: {
                this.jne(instruction.operand_a!);
                break;
            }
            case Operator.jg: {
                this.jg(instruction.operand_a!);
                break;
            }
            case Operator.jge: {
                this.jge(instruction.operand_a!);
                break;
            }
            case Operator.jl: {
                this.jl(instruction.operand_a!);
                break;
            }
            case Operator.jle: {
                this.jle(instruction.operand_a!);
                break;
            }

            case Operator.push: {
                this.push(instruction.operand_a!);
                break;
            }
            case Operator.pop: {
                this.pop(instruction.operand_a!);
                break;
            }

            case Operator.call: {
                this.call(instruction.operand_a!);
                break;
            }
            case Operator.ret: {
                break;
            }

            case Operator.nop: {
                break;
            }
        }

        return jump;
    }

    get_data = (op: Operand): Data => {
        switch (op.type) {
            case "Data": {
                return op;
            }
            case "Address": {
                return { type: "Data", value: 0 };
                //return this.memory!.read_address(op.value);
            }
            case "Register": {
                return this.gen_registers[op.id];
            }
        }
    }

    mov = (destination: Operand, source: Operand) => {
        switch (destination.type) {
            case "Data": {
                throw new Error("Incorrect output from parser, mov instruction got data as it's first operand!");
            }
            case "Register": {
                this.gen_registers[destination.id] = this.get_data(source);
                break;
            }
            case "Address": {
                //this.memory![destination.value].data = this.get_data(source);
                break;
            }
        }
    }
    out = (destination: Operand, source: Operand) => {
        switch (destination.type) {
            case "Data": {
                throw new Error("Incorrect output from parser, mov instruction got data as it's first operand!");
            }
            case "Register": {
                this.io_registers[destination.id] = this.get_data(source);
                break;
            }
            case "Address": {
                //this.memory![destination.value].data = this.get_data(source);
                break;
            }
        }
    }

    in = (destination: Operand, source: Operand) => {
        switch (destination.type) {
            case "Data": {
                throw new Error("Incorrect output from parser, mov instruction got data as it's first operand!");
            }
            case "Register": {
                switch (source.type) {
                    case "Register":
                        this.gen_registers[destination.id] = this.io_registers[source.id];
                        console.log("helelelel");
                        console.log(this.io_registers);
                        console.log(this.gen_registers);
                        break;
                }
                break;
            }
            case "Address": {
                //this.memory![destination.value].data = this.get_data(source);
                break;
            }
        }
    }

    add = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.Add, lhs, rhs);
        this.mov(destination, result);
    }

    int = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);
        this.register_interrupt(lhs.value, rhs.value);
    }

    sub = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.Sub, lhs, rhs);
        this.mov(destination, result);
    }

    mul = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.Mul, lhs, rhs);
        this.mov(destination, result);
    }

    idiv = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.IDiv, lhs, rhs);
        this.mov(destination, result);
    }
    

    and = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.And, lhs, rhs);
        this.mov(destination, result);
    }

    or = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.Or, lhs, rhs);
        this.mov(destination, result);
    }

    xor = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.Xor, lhs, rhs);
        this.mov(destination, result);
    }

    lshift = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.LShift, lhs, rhs);
        this.mov(destination, result);
    }

    rshift = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);

        const result = this.alu.compute(AluOp.LShift, lhs, rhs);
        this.mov(destination, result);
    }

    cmp = (destination: Operand, source: Operand) => {
        const lhs = this.get_data(destination);
        const rhs = this.get_data(source);
        console.log(lhs);
        console.log(rhs);
        this.alu.compute(AluOp.Sub, lhs, rhs);
    }

    jmp = (location: Operand) => {
        this.program_counter = this.get_data(location).value;
    }

    je = (location: Operand) => {
        if (this.alu.flags_register.zero_flag) {
            this.jmp(location);
        }
    }

    jne = (location: Operand) => {
        if (!this.alu.flags_register.zero_flag) {
            this.jmp(location);
        }
    }

    jg = (location: Operand) => {
        if (!this.alu.flags_register.zero_flag && !this.alu.flags_register.negative_flag) {
            this.jmp(location);
        }
    }

    jge = (location: Operand) => {
        if (!this.alu.flags_register.negative_flag) {
            this.jmp(location);
        }
    }

    jl = (location: Operand) => {
        if (this.alu.flags_register.negative_flag) {
            this.jmp(location);
        }
    }

    jle = (location: Operand) => {
        if (this.alu.flags_register.zero_flag || this.alu.flags_register.negative_flag) {
            this.jmp(location);
        }
    }

    push = (source: Operand) => {
    }

    pop = (destination: Operand) => {
    }

    call = (procedure: Operand) => {
    }
}

export { type Processor, new_processor, type Register, type Data, type Address};
