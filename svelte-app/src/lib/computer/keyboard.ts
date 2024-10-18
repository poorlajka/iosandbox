import { DeviceType, type Device } from "./device";
import { writable, type Writable } from "svelte/store";

class Keyboard implements Device {
    type: DeviceType;
    key_code: number;

    constructor() {
        this.type = DeviceType.Input;
        this.key_code = 0;
    }

    set_pin(pin_num: number, value: number): void {
        this.key_code = value;
    }

    read_pin(pin_num: number): number {
        return this.key_code;
    }

    update_external(): void {
        
    }
}

export { Keyboard };