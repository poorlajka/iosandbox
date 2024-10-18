<script lang="ts">
  import { useConnection } from '@xyflow/svelte';

  const connection = useConnection();

  let path = '';

  $: {
    const { sourceX, sourceY, targetX, targetY } = $connection;
    path = `M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`;
  }
</script>

{#if $connection.path}
  <path
    fill="none"
    stroke-width={3}
    class="animated"
    stroke={"white"}
    d={path}
  />
  <circle
    cx={$connection.targetX}
    cy={$connection.targetY}
    fill="none"
    r={4}
    stroke={"white"}
    stroke-width={2.5}
  />
{/if}

