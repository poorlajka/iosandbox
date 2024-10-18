import { type Processor, new_processor } from "./processor";
import { DeviceType, type Device } from "./device";
import { writable, type Writable } from "svelte/store";
import { type Instruction, Operator, type Operand } from "./instruction";
import { Parser } from "./parser";

type Connection = {
    processor_id: number,
    processor_port_id: number,
    device_id: number,
    device_port_id: number,
};

class Computer {
    processors: Map<number, Processor>;
    code: string[][];
    devices: Map<number, Device>;
    connections: Connection[];

    constructor() {
        this.processors = new Map();
        this.code = [];
        this.devices = new Map();
        this.connections = [];
    }

    add_processor = (id: number) => {
        this.processors.set(id, new_processor());
    }

    add_device = (id: number, device: Device) => {
        this.devices.set(id, device);
    }

    add_connection = (
        processor_id: number, 
        processor_port_id: number,
        device_id: number, 
        device_port_id: number, 
    ) => {
        this.connections.push({
            processor_id: processor_id,
            processor_port_id: processor_port_id,
            device_id: device_id,
            device_port_id: device_port_id,
        });
    }

    goto_start = () => {
        this.processors
                .forEach((p) => p.goto_start())
    }

    remove_connection = (
        processor_id: number, 
        processor_port_id: number,
        device_id: number, 
        device_port_id: number, 
    ) => {

        for (let [i, c] of this.connections.entries()) {
            if (
                c.processor_id === processor_id &&
                c.processor_port_id === processor_port_id &&
                c.device_id === device_id &&
                c.device_port_id === device_port_id
            ) {
                this.connections.splice(i);
                break;
            }
        }
    }
    
    step = (cycles: number) => {

        for (let i = 0; i < cycles; ++i) {
            for (let connection of this.connections) {
                const { 
                    processor_id, 
                    processor_port_id, 
                    device_id, 
                    device_port_id 
                } = connection;
                const processor = this.processors.get(processor_id)!;
                const device = this.devices.get(device_id)!;
                switch (device.type) {
                    case DeviceType.Output:
                        const output = processor.read_pin(processor_port_id);
                        device.set_pin(device_port_id, output);
                        break;
                    case DeviceType.Input:
                        const input = device.read_pin(device_port_id);
                        processor.set_pin(processor_port_id, input);
                        break;
                }
            }

            this.processors
                .forEach((p) => {
                    if (!p.finished_running()) {
                        p.run_cycle()
                    }
                }
            );

        }
        this.devices.forEach((d) => d.update_external());
    }

    load_program = (id: number, program: string) => {
        try {
            let program_lines = program
                .split(/\r?\n|\r|\n/g)
                .map((s) => s.trim())
                .filter((s) => /\S/.test(s));

            let instructions = Parser.parse_program(program_lines);
            this.processors.get(id)!.load_instructions(instructions);
        }
        catch(e) {
            console.log("parsing failed!!!");
            console.log(e);
        }
    }

    trigger_interrupt = (trigger_device_id: number) => {
        for (let connection of this.connections) {
            const { 
                processor_port_id, 
                device_id, 
                processor_id,
            } = connection;
            if (device_id === trigger_device_id) {
                this.processors.get(processor_id)!.trigger_interrupt(processor_port_id);
            }
        }

    }
}

export { Computer, type Connection};
export let computer = new Computer();
