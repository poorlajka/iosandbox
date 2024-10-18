
<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { slide } from "svelte/transition";
    import { useEdges, useHandleConnections, NodeToolbar, Handle, Position, type NodeProps } from '@xyflow/svelte';
    import '@xyflow/svelte/dist/base.css';
    import { Computer, computer } from "$lib/computer/computer"
    import IoPorts from "./IoPorts.svelte";
    import HiddenIoPorts from "./HiddenIoPorts.svelte";

    type $$Props = NodeProps;
    export let width: $$Props["width"] = undefined; width;
    export let selected: $$Props["selected"] = undefined; selected;
    export let id: $$Props["id"];

    export let nr_of_ports = 7;
    computer.add_processor(Number(id.slice(3)));

    //export let active: Writable<boolean>;

    $: color = selected ? "rgba(255,255,255, 0.8)" : "rgba(255,255,255, 0.08)";

    export let data: { 
        code: string,
    };
    
    let show_code = false;
    $: computer.load_program(Number(id.slice(3)), data.code);

</script>

{#if show_code} 
    <div id="processor_code_window" 
    >
        <button id="processor_code_window_close_button" on:click={() => {show_code = false}}>
            x
        </button>
        <textarea 
            id="processor_code_window_editor" 
            bind:value={data.code}
            spellcheck="false"
        />

    <div id="hidden_ports">
    <HiddenIoPorts 
        width={width} 
        nr_of_ports={nr_of_ports} 
        starting_id={0}
        position={Position.Top}
        processor_id={id}
    />

    <HiddenIoPorts 
        width={width} 
        starting_id={nr_of_ports}
        nr_of_ports={nr_of_ports} 
        position={Position.Bottom}
        processor_id={id}
    />
    </div>
    </div>
{:else}
    <NodeToolbar position={Position.Right}>
        <div id="processor_toolbar"
            transition:slide={{ duration: 100, delay: 50}}
        >
            <button class="processor_toolbar_button" on:click={() => {show_code = true}}>
                Edit code
            </button>
            <button class="processor_toolbar_button">View registers</button>
            <button class="processor_toolbar_button">Show help</button>
        </div>
    </NodeToolbar>

    <div 
        class="processor" 
        style="--width: {width}; --color: {color}" 
    >

        
        <Handle 
            type="source" 
            id="ff"
            position={Position.Left}
            style="top: 45px;"
        >
            <p class="text">
                clk
            </p>
        </Handle>
        <Handle 
            type="source" 
            id="fff"
            position={Position.Left}
            style="top: 70px;"
        >
            <p class="text">
                memory
            </p>
        </Handle>


        <p>
            {id}
        </p>
        <IoPorts 
            width={width} 
            nr_of_ports={nr_of_ports} 
            starting_id={0}
            position={Position.Top}
            processor_id={id}
        />

        <IoPorts 
            width={width} 
            starting_id={nr_of_ports}
            nr_of_ports={nr_of_ports} 
            position={Position.Bottom}
            processor_id={id}
        />

    </div>
{/if}

<style>
    .processor {
        width: var(--width)px;
        height: 120px;

        display: flex;
        align-items: center;
        justify-content: center;
        font-family:monospace;
        font-size: 15pt;

        color: rgba(255,255,255,.70);

        background: #0A0A0A;
        border: 1px solid var(--border_color);
        border: 1px solid var(--color);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 8px;
    }
    .text {
        font-size: 5pt;
        margin-left: 11px;
        margin-top: -1px;
    }

    #processor_toolbar {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
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

    .processor_toolbar_button:hover {
        background-color: azure;
        color: black;
        border: 1px solid black;
    }

    #processor_code_window {
        position: relative;
        top: -150px;
        left: -50px;
        height: 500px;
        width: 400px;
        background: #0A0A0A;
        color: rgba(255,255,255,.70);
        border: 1px solid rgba(255,255,255,.70);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 4px;
        padding: 8px;
        font-size: 13pt;
    }
    #processor_code_window_close_button {
        position: absolute;
        top: 0px;
        right: 10px;
        background: none;
        color: white;
        border: none;
        font-size: 23pt;
        font-weight: bolder;
    }
    #processor_code_window_close_button:hover {
        color: red;
    }
    #processor_code_window_editor {
        border: none;
        overflow: auto;
        outline: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        resize: none; /*remove the resize handle on the bottom right*/
        color: white;
        background: none;
        height: 90%;
        width: 100%;
        padding: 20px;
        font-size: 14pt;
        overflow-y: scroll; /* Show vertical scrollbar */
        white-space: nowrap;
        overflow: auto;
    }
    textarea::-webkit-scrollbar {
        background-color: rgba(255,255,255,.70);
        border: 1px solid rgba(255,255,255,.70);
        background: #0A0A0A;
    }

    textarea::-webkit-scrollbar-thumb {
        background-color: rgba(255,255,255,.90);
    }
    #hidden_ports {
        height: 120px;
        position: absolute;
        top: 145px;
    }
</style>
