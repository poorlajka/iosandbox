<script lang="ts">
    import Project from './Project.svelte';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
    import { slide } from "svelte/transition";
    import {
        Background,
    } from "@xyflow/svelte";

    export let data;
    export let form: {project_name: string, project_exists: boolean};
    

    let show_create_form = false;
    const toggle_create_form = () => {
        show_create_form = !show_create_form;
    }

    let selected_project = writable(0);
</script>

<div id="projects_page">
    <div id="top_menu">
        <h2 id="current_user">
            Signed in as: {data.user?.username}
        </h2>
        <button 
            class="top_menu_button"
            on:click={() => goto("/logout")}
        >
            Logout
        </button>
    </div>

    <div id="mid_section">
        <h1 id="projects_page_title" >
            {#if !show_create_form}
                <p transition:slide={{ duration: 100, delay: 50}}>
                    Currently saved <br> projects
                </p>
            {:else}
                <p transition:slide={{ duration: 100, delay: 50}}>
                    Enter name  <br> for new project
                </p>
            {/if}
        </h1>
        <div>
        <div id="projects_center">
            {#if !show_create_form}
                <div id="projects"
                    transition:slide={{ duration: 100, delay: 50}}
                >
                {#each data.project_names as project_name, i}
                    <Project 
                        project_index={i} 
                        project_id={data.project_names[i][1]}
                        {selected_project}
                        project_name={project_name[0]}
                    />
                {/each}
                </div>
            {:else}
                <form 
                    method="POST" 
                    action="?/create_project"
                    id="create_form"
                    transition:slide={{ duration: 100, delay: 50}}
                >

                    <div>
                        <label for="project_name">
                            <span>
                                Name: 
                            </span>
                        </label>
                        <input 
                            type="text" 
                            name="project_name" 
                            value={form?.project_name ?? ""}
                            autocomplete="off"
                            id="project_name"
                        />
                    </div>
                    <button id="create_form_button"> 
                        Create
                    </button>
                    {#if form?.project_exists ?? false}
                        There already exists a project with that name :)
                    {/if}
                </form>
            {/if}
        </div>

        <button id="create_new_project_button" on:click={toggle_create_form}>
            {#if !show_create_form}
                Create new project
            {:else}
                Cancel
            {/if}
        </button>
        </div>
    </div>

    <h2 id="xyflow_credit">
        Implemented using xyflow
    </h2>
</div>

<style>
    :global(body) { /* this will apply to <body> */ margin: 0; padding: 0; }

    #projects_page{
        background: #0A0A0A;
        width: 100%;
        height: 100vh;
        top: 0px;
        left: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #projects_center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        width: 500px;
        height: 300px;
        font-size: 17pt;
        font-weight: normal;
        border: 1px solid rgba(255,255,255,.010);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 7px;
        padding-bottom: 50px;
        padding-top: 20px;
    }
    #projects {
        width: 500px;
        height: 300px;
        overflow-y: auto;
        scrollbar-color: #0A0A0A #0A0A0A;
        padding-top: 20px;
        padding-bottom: 50px;
        padding-top: 20px;
        margin-left: 20%;
    }
    div::-webkit-scrollbar {
        background-color: rgba(255,255,255,.70);
        border: 1px solid rgba(255,255,255,.70);
        background: #0A0A0A;
    }

    div::-webkit-scrollbar-thumb {
        background-color: rgba(255,255,255,.90);
    }

    #projects_page_title {
        color: rgba(255,255,255,.90);
        font-size: 30pt;
        width: 300px;
        font-weight: bold;
        text-align: center;
    }
    #current_user {
        color: rgba(255,255,255,.90);
        font-weight: normal;
        font-size: 20pt;


    }
    #create_new_project_button {
        background: none;
        border: none;
        font-size: 19pt;
        color: rgba(255,255,255,.90);
        margin-top: 25px;
        text-align: center;
        width: 100%;
    }
    #create_new_project_button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    #xyflow_credit {
        position: absolute;
        bottom: 0px;
        color: rgba(255,255,255,.70);
        font-size: 18pt;
        width: 400px;
        text-align: center;
        font-weight: normal;
    }
    #top_menu {
        position: absolute;
        top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 30px;
        color: white;
    }
    .top_menu_button {
        background: none;
        border: none;
        color: white;
        font-size: 20pt;
    }
    .top_menu_button:hover {
        background: white;
        color: black;
    }
    #create_form {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        color: rgba(255,255,255,.70);
        font-size: 20pt;
        font-weight: bold;
    }
    #project_name {
        background: none;
        color: rgba(255,255,255,.90);
        border: 1px solid rgba(255, 255, 255, 0.3);
        font-size: 18pt;
        border-radius: 6px;
        margin-left: 15px;
    }
    #project_name:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    #create_form_button {
        background: none;
        border: none;
        font-size: 19pt;
        color: rgba(255,255,255,.90);
        margin-top: 10px;
    }
    #create_form_button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    #mid_section {
        display: flex;
        column-gap: 50px;
        width: 90%;
        padding-left: 80px;
        padding-right: 80px;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
    }
</style>

