
<script lang="ts">
    import { type Connection, Handle, Position, type NodeProps, useHandleConnections } from '@xyflow/svelte';
    import { Computer, computer } from "$lib/computer/computer"
    import Processor from './Processor.svelte';

    export let left = 10;
    export let position: Position = Position.Top;

    export let width = 10;
    export let height = 20;

    export let id: string;

    let color = "white";

    type $$Props = NodeProps;
    export let processor_id: string;
    const connections = useHandleConnections({ nodeId: processor_id, type: "source", id: id });
    $: isConnectable = $connections.length === 0;

    let conn_callback = (c: Connection[]) => {

        if (!c.length) { return; }

        computer.add_connection(
            Number(c[0].source!.slice(3)),
            Number(c[0].sourceHandle!.slice(2)),
            Number(c[0].target!.slice(3)),
            Number(c[0].targetHandle!.slice(2)),
        );
        color = "#B2FF66";
        
    }
    export let disc_callback = (c: Connection[]) => {
        if (!c.length) { return; }

        computer.remove_connection(
            Number(c[0].source!.slice(3)),
            Number(c[0].sourceHandle!.slice(2)),
            Number(c[0].target!.slice(3)),
            Number(c[0].targetHandle!.slice(2)),
        );
        color = "white";
    }

</script>

<Handle 
    type="source" 

    id={id}
    position={position}

    onconnect={conn_callback}
    ondisconnect={disc_callback}
    {isConnectable}
            
    style="
        left: {left}px;
        border-radius: 2px; 
        height: {height}px; 
        width: {width}px;
        border-color: {color};
    "
>
    {#if position === Position.Top}
        <div class="id_top" style="--height: {height*1.2}px">
            <p> {id} </p>
        </div>
    {:else if position === Position.Bottom}
        <div class="id_bot" style="--height: {-height*1.2}px">
            <p> {id} </p>
        </div>
    {:else if position === Position.Left}
        <div class="id_left" style="--height: {height*2.5}px">
            <p> {id} </p>
        </div>
    {:else if position === Position.Right}
        <div class="id_right" style="--height: {height}px">
            <p> {id} </p>
        </div>
    {/if}

</Handle>

<style>
    .id_bot,
    .id_top {
        font-family:monospace;
        font-size: 6pt;
        margin-top: var(--height);
    }
    .id_left,
    .id_right {
        font-family:monospace;
        font-size: 6pt;
        margin-left: var(--height);
    }
</style>
