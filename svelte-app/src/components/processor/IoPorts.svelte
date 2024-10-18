<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
    import IoPort from "./IoPort.svelte"
    
    export let nr_of_ports: number;
    export let position: Position = Position.Top;
    export let width = 0;
    export let starting_id: number;
    export let processor_id: string;

</script>

{#each {length: nr_of_ports} as _, i}
    <IoPort 
        id="io{starting_id + i}" 
        left={i * width/nr_of_ports + width/(nr_of_ports*2.9)}
        position={position}
        width={width/(nr_of_ports*2.4)}
        height={25}
        {processor_id}
    />
{/each}
