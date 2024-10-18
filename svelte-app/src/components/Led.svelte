
<script lang="ts">
    import { Handle, Position, type NodeProps, useHandleConnections } from '@xyflow/svelte';
    import { Computer, computer } from "$lib/computer/computer"
    import { Led } from "$lib/computer/led"

    type $$Props = NodeProps;
    export let id: $$Props['id'];
    const connections = useHandleConnections({ nodeId: id, type: "target", id: "io0"});
    $: isConnectable = $connections.length === 0;

    let led_dev = new Led();
    //Number(c[0].source!.slice(3)),
    computer.add_device(Number(id.slice(3)), led_dev);
    let led_color = led_dev.color;

    $: color = $led_color === 1 ? "white" : "#0A0A0A";

</script>

<div class="memory" style="--color: {color};">
    <Handle 
        id="io0"
        position={Position.Bottom} 
        {isConnectable}
        type="target" style="top: 10px; border-radius: 1px; height: 20px; width: 2px;">
    </Handle>
</div>

<style>
  .memory {
      font-family:monospace;
      font-size: 15pt;

    color: rgba(255,255,255,1);
    
    background: var(--color);
    border: 1px solid rgba(255,255,255,1);
    border-radius: 5px;
    height: 25px;
    width: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
</style>
