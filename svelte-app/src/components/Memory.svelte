<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  //import Port from "./Port.svelte"

</script>

<div class="custom">
    <Handle position={Position.Left} type="target">

    </Handle>
  <div>
    RAM
  </div>
</div>

<style>
  .custom {
    display: flex;
  align-items: center;
  justify-content: center;
      font-family:monospace;
      font-size: 15pt;

    color: rgba(255,255,255,.70);
    
    background: #0A0A0A;
    border: 1px solid rgba(255,255,255,.40);
    border-radius: 8px;
    height: 200px;
    width: 50px;
  }
  #ports {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 30px;
      height: 5px;
      z-index: 55;
  }
</style>
