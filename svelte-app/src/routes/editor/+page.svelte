<script lang="ts">
    import SimulationDiagram from "../../components/SimulationDiagram.svelte"
    import Nav from "../../components/Nav.svelte";

    import SidePanel from "../../components/SidePanel.svelte";
    import { writable, type Writable } from "svelte/store"

    import { SvelteFlowProvider } from '@xyflow/svelte';
    export let data;
    let project_name = writable(data.project_name);
</script>

<main>
    <Nav {project_name}/> 
    <SvelteFlowProvider>
        <SimulationDiagram {project_name} project_data={data.project_data} project_id={data.project_id}/> 
    </SvelteFlowProvider>
</main>


<style>
    :global(body) { /* this will apply to <body> */ margin: 0; padding: 0; }
    :root {
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
