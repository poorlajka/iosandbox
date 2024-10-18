<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Writable } from "svelte/store";

    export let selected_project: Writable<number>;
    export let project_id: string;
    export let project_index: number;
    export let project_name: string;

    $: bg_color = $selected_project === project_index ? "rgba(255, 255, 255, 0.8)" : "#0A0A0A";
    $: bg_hover_color = $selected_project === project_index ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.2)";
    $: text_color = $selected_project === project_index ? "black" : "rgba(255, 255, 255, 0.8)";

    const select_project = () => {
        if ($selected_project === project_index) {

        }
        selected_project.set(project_index);
    }

    const open_project = async () => {
        let cow = await fetch("http://localhost:5173/api/open_project");
        console.log(cow);
        goto(`/editor?project_id=${project_id}`);
    }
</script>

<button
    class="project" 
    on:click={select_project} 
    on:dblclick={open_project}
    style="--text_color: {text_color}; --bg_color: {bg_color}; --bg_hover_color: {bg_hover_color};"
>

    <div>{project_index}.</div> <div>{project_name}</div>
</button>

<style>
    .project {
        font-size: 50pt;
        all: unset;
        width: 80%;
        height: 60px;
        padding-left: 30px;
        background: var(--bg_color);
        color: var(--text_color);
        display: flex;
        column-gap: 30px;
        align-items: center;
    }
    .project:hover {
        background: var(--bg_hover_color);
    }
</style>