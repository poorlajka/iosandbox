import { DeviceType, type Device } from "./device";
import { writable, type Writable } from "svelte/store";

class Led implements Device {
    color: Writable<number>;
    _color: number;
    type: DeviceType;

    constructor() {
        this._color = 0;
        this.color = writable(0);
        this.type = DeviceType.Output;
    }

    set_pin = (pin_num: number, value: number) => {
        if (pin_num === 0) {
            this._color = value;
        }
    }

    read_pin(pin_num: number): number {
        return 0;
    }

    update_external = () => {
        this.color.set(this._color);
    }
}

export { Led }