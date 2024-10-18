import { type Device } from "./device";
import { type Address, type Data } from "./processor";

class Memory implements Device {
    data: Data[];

    constructor() {
        this.data = [];
    }

    read_address = (address: Address): Data => {
        return { type: "Data", value: -1, };
    }

    write_address = (address: Address) => {

    }
};

export { type Memory };
