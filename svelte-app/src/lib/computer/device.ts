import { type Writable } from "svelte/store";

enum DeviceType {
    Input = "Input",
    Output = "Output",
}

interface Device {
    type: DeviceType;
    set_pin(pin_num: number, value: number): void;
    read_pin(pin_num: number): number;
    update_external(): void;
}

export { type Device, DeviceType }