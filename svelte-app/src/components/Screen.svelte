<script lang="ts">
    import { Computer, computer } from "$lib/computer/computer"
    import { Screen } from "$lib/computer/screen"
    import { slide } from "svelte/transition";
    import { Handle, Position, type NodeProps, useHandleConnections, NodeToolbar} from '@xyflow/svelte';

    type $$Props = NodeProps;
    export let id: $$Props['id'];
    const id_nr = Number(id.slice(3));

    let screen_dev = new Screen(10, 10);
    computer.add_device(Number(id.slice(3)), screen_dev);

    let screen_view: Array<Array<string>> = Array(screen_dev.height);
    for (let i = 0; i < screen_view.length; i++) {
        screen_view[i] = Array(screen_dev.width);
        for (let j = 0; j < screen_view.length; j++) {
        }
    }

    let pixels = screen_dev.pixels;

    const show_screen = (pixels: number[][]) => {
        for (let row = 0; row < pixels.length; row++) {
            for (let col = 0; col < pixels[0].length; col++) {
                screen_view[row][col] = "#" + pixels[row][col].toString(16).padStart(6, '0')
            }
        }
    }

    const clear_memory = () => {
        screen_dev.clear_memory();
    }

    $: show_screen($pixels);

    export let selected: $$Props["selected"] = undefined; selected;
    $: color = selected ? "rgba(255,255,255, 0.8)" : "rgba(255,255,255, 0.08)";
</script>

<NodeToolbar position={Position.Right}>
    <div id="processor_toolbar"
        transition:slide={{ duration: 100, delay: 50}}
    >
        <button class="processor_toolbar_button" on:click={clear_memory}>Clear memory</button>
        <button class="processor_toolbar_button">Show info</button>
    </div>
</NodeToolbar>
<div class="screen" style="--color: {color}">
    {#each {length: screen_dev.height} as _, y}
        <div class="row">
            {#each {length: screen_dev.width} as _, x}
                <div class="pixel" style="background:{screen_view[x][y]}">
                </div>
            {/each}
        </div>
    {/each}

</div>
    <div id="screen_ports" style="--color: {color}">
    <Handle 
        id="io0"
        position={Position.Bottom} 
        type="target"
        style="left: 10px; color: white; font-size: 7pt;"
    >
        <div class="screen_port_id">
            x_pos
        </div>
    </Handle>
    <Handle 
        id="io1"
        position={Position.Bottom} 
        type="target"
        style="left: 40px; color: white; font-size: 7pt;"
    >
        <div class="screen_port_id">
            y_pos
        </div>
    </Handle>
    <Handle 
        id="io2"
        position={Position.Bottom} 
        type="target"
        style="left: 70px; color: white; font-size: 7pt;"
    >
        <div class="screen_port_id">
            color
        </div>
    </Handle>
    <Handle 
        id="io3"
        position={Position.Bottom} 
        type="target"
        style="left: 90px; color: white; font-size: 7pt;"
    >
        <div class="screen_port_id" style="left: -1px">
            clk
        </div>
    </Handle>
</div>

<style>
    .screen {
        background: #0A0A0A;
        width: 100px;
        height: 100px;
        display: grid;
        grid-auto-flow: column;
        border: solid white 1px;
        border-radius: 6px;
        border: 1px solid var(--color);
        padding: 2px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    .pixel {
        width: 10px;
        height: 10px;
        margin-left: 0px;
        margin-top: 0px;
        background: none;
    }
    #screen_ports {
        width: 100px;
        height: 20px;
        position: absolute;
        left: 5px;
        border-radius: 5px;
        background: #0A0A0A;
    }
    .screen_port_id {
        position: absolute;
        top: -15px;
        left: -8px;
        width: 20px;
        font-size: 6pt;
        color: rgba(255,255,255,.70);
    }
    .processor_toolbar_button {
        text-align: left;
        background: #0A0A0A;
        color: rgba(255,255,255,.70);
        border: 1px solid rgba(255,255,255,.70);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 4px;
        padding: 8px;
        font-size: 13pt;
    }
    #processor_toolbar {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .processor_toolbar_button:hover {
        background-color: azure;
        color: black;
        border: 1px solid black;
    }
</style>


