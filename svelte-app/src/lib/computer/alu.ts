import { type Data } from "./processor";

enum AluOp {
    Add = "Add",
    Sub = "Sub",

    Mul = "Mul",
    Pow = "Pow",
    IDiv = "IDiv",
    Mod = "Mod",
    Neg = "Neg",

    Or = "Or",
    And = "And",
    Xor = "Xor",

    LShift = "LShift",
    RShift = "RShift",
}

type FlagsRegister = {
    zero_flag: boolean;
    negative_flag: boolean;
};

class Alu {
    flags_register: FlagsRegister;

    constructor() {
        this.flags_register = {
            zero_flag: false,
            negative_flag: false,
        };
    }

    compute = (op: AluOp, lhs: Data, rhs: Data): Data => {
        const lvalue = lhs.value;
        const rvalue = rhs.value;
        let result = -1;
        switch (op) {
            case AluOp.Add: {
                result = lvalue + rvalue;
                break;
            }
            case AluOp.Sub: {
                result = lvalue - rvalue;
                break;
            }
            case AluOp.Mul: {
                result = lvalue * rvalue;
                break;
            }
            case AluOp.Pow: {
                result = lvalue ** rvalue;
                break;
            }
            case AluOp.IDiv: {
                result = lvalue / rvalue;
                break;
            }
            case AluOp.Mod: {
                result = lvalue % rvalue;
                break;
            }
            case AluOp.Neg: {
                result = -lvalue;
                break;
            }
            case AluOp.Or: {
                result = lvalue | rvalue;
                break;
            }
            case AluOp.And: {
                result = lvalue & rvalue;
                break;
            }
            case AluOp.Xor: {
                result = lvalue ^ rvalue;
                break;
            }

            case AluOp.LShift: {
                result = lvalue << rvalue;
                break;
            }
            case AluOp.RShift: {
                result = lvalue >>> rvalue;
                break;
            }
        }
        this.flags_register.zero_flag = result == 0;
        this.flags_register.negative_flag = result < 0;
        return { type: "Data", value: result };
    }
}

export { Alu, AluOp };

