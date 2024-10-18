
import { DeviceType, type Device } from "./device";
import { writable, type Writable } from "svelte/store";

class Screen implements Device {
    pixels: Writable<number[][]>;
    _pixels: number[][];
    x_pos: number;
    y_pos: number;
    color: number;
    width: number;
    height: number;
    type: DeviceType;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.x_pos = 0;
        this.y_pos = 0;
        this.color = 0;
        this._pixels = [];
        for (let row = 0; row < height; row++) {
            this._pixels[row] = [];
            for (let col = 0; col < width; col++) {
                this._pixels[row][col] = 0x0B0B0B;
            }
        }
        this.pixels = writable([])
        this.pixels.set(this._pixels);
        this.type = DeviceType.Output;
    }

    clear_memory = () => {
        for (let row = 0; row < this.height; row++) {
            this._pixels[row] = [];
            for (let col = 0; col < this.width; col++) {
                this._pixels[row][col] = 0x0B0B0B;
            }
        }
        this.pixels.set(this._pixels);
    }

    set_pin = (pin_num: number, value: number) => {
        switch (pin_num) {
            case 0:
                this.x_pos = value;
                break;
            case 1:
                this.y_pos = value;
                break;
            case 2:
                this.color = value;
                break;
            case 3:

                if (this.y_pos < this.height && 
                    this.x_pos < this.width
                && this.y_pos >= 0 
                && this.x_pos >= 0) {
                    
                    if (value === 1) {
                        this._pixels[this.y_pos][this.x_pos] = this.color;
                    }
                }
                break;
        }
    }

    read_pin(pin_num: number): number {
        return 0;
    }

    update_external = () => {
        this.pixels.set(this._pixels);
    }
}

export { Screen }