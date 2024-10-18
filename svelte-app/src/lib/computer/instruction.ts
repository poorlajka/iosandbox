import { type Data, type Register, type Address } from "./processor";

type Instruction = {
    operator: Operator;
    operand_a?: Operand;
    operand_b?: Operand;
};

type Operand = Data | Register | Address;

enum Operator {
    mov = "mov",
    out = "out",
    in = "in",

    add = "add",
    sub = "sub",
    mul = "mul",
    div = "div",
    and = "and",
    or = "or",
    xor = "xor",

    cmp = "cmp",
    jmp = "jmp",
    je = "je",
    jne = "jne",
    jg = "jg",
    jge = "jge",
    jl = "jl",
    jle = "jle",

    push = "push",
    pop = "pop",

    call = "call",
    ret = "ret",

    int = "int",

    nop = "nop",
}

export {type Instruction, Operator, type Operand };
