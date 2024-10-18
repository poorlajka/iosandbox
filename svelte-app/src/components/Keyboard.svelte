
<script lang="ts">
    import { Handle, Position, type NodeProps, useHandleConnections } from '@xyflow/svelte';
    import { Computer, computer } from "$lib/computer/computer"
    import { Keyboard } from "$lib/computer/keyboard"

    type $$Props = NodeProps;
    export let id: $$Props['id'];
    const connections = useHandleConnections({ nodeId: id, type: "target", id: "io0"});
    $: isConnectable = $connections.length === 0;
    export let selected: $$Props["selected"] = undefined; selected;

    let keyboard_device = new Keyboard();
    computer.add_device(Number(id.slice(3)), keyboard_device);

    let key_pressed = "<blank>";
    const get_input = (e: KeyboardEvent) => {
        if (selected) {
            keyboard_device.set_pin(0, Number(e.code.charCodeAt(e.code.length-1)));
            computer.trigger_interrupt(Number(id.slice(3)));
            key_pressed = "<" + e.code + ">";
        }
    }
    $: color = selected ? "rgba(255, 255, 255, 0.7)": "rgba(255, 255, 255, 0.1)"; 

</script>

<div class="memory" style="--color: {color};">
    {key_pressed}
    <Handle 
        id="io0"
        position={Position.Top} 
        {isConnectable}
        type="target">
    </Handle>
</div>

<svelte:window
    on:keydown={get_input}
/>

<style>
  .memory {
    font-family:monospace;
    font-size: 15pt;
    display: flex;
    justify-content: center;
    align-items: center;

    color: rgba(255,255,255,1);
    
    background: #0a0a0a;
    border: 1px solid var(--color);
    border-radius: 5px;
    height: 50px;
    width: 100px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
</style>
