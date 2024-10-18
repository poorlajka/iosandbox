<script lang="ts">
    import { Computer, computer } from "$lib/computer/computer";
    import { instructions_store } from "$lib/instructions_store";
    import { SelectedTool, type EditorState, editor_state} from "$lib/editor_state";
    import { slide } from "svelte/transition";

    import cpu_icon from "$lib/images/cpu.png";
    import hand_icon from "$lib/images/palm-of-hand.png";
    import led_icon from "$lib/images/led.png";
    import menu_icon from "$lib/images/menu_icon.png";
    import pen_icon from "$lib/images/pen_icon.png";
    import screen_icon from "$lib/images/screen.png";
    import keyboard_icon from "$lib/images/keyboard.png";
    import cursor_icon from "$lib/images/palm-of-hand.png";
    import play_button from "$lib/images/play-button.png";
    import stop_button from "$lib/images/stop-button.png";
    import logout_icon from "$lib/images/logout.png";
    import projects_icon from "$lib/images/Projects.png";
    import themes_icon from "$lib/images/Theme.png";
	import type { Writable } from "svelte/store";
	import { goto } from "$app/navigation";

    let processor_instructions = instructions_store[0];

    let simulation_speed = 1;
    $: steps = simulation_speed/20
    let running = false;
    let interval = 0;
    const run = () => {
        if (interval === 0) {
            //computer.load_program($processor_instructions);
            running = true;
            interval = setInterval(() => computer.step(steps), 1000/simulation_speed);
        }
        else {
            clearInterval(interval);
            interval = 0;
            running = false;
        }
    }

    let title_width: string;
    $: title_width = $project_name.length < 1 ? "30" : ($project_name.length * 18).toString();

    const select_default = (e: MouseEvent) => {
        editor_state.selected_tool = SelectedTool.Default;
    }

    const select_led = (e: MouseEvent) => {
        editor_state.selected_tool = SelectedTool.CreateLed;
    }

    const select_screen = (e: MouseEvent) => {
        editor_state.selected_tool = SelectedTool.CreateScreen;
    }

    const select_processor = (e: MouseEvent) => {
        editor_state.selected_tool = SelectedTool.CreateProcessor;
    }

    const select_keyboard = (e: MouseEvent) => {
        editor_state.selected_tool = SelectedTool.CreateKeyboard;
    }

    $: def_but_color =  editor_state.selected_tool == SelectedTool.Default ? "rgba(255,255,255,0.2)" : "#0B0B0B";
    $: led_but_color = editor_state.selected_tool == SelectedTool.CreateLed ? "rgba(255,255,255,0.2)" : "#0B0B0B";
    $: screen_but_color = editor_state.selected_tool == SelectedTool.CreateScreen ? "rgba(255,255,255,0.2)" : "#0B0B0B";
    $: processor_but_color = editor_state.selected_tool == SelectedTool.CreateProcessor ? "rgba(255,255,255,0.2)" : "#0B0B0B";
    $: keyboard_but_color =  editor_state.selected_tool == SelectedTool.CreateKeyboard ? "rgba(255,255,255,0.2)" : "#0B0B0B";

    export let project_name: Writable<string>; 

    let show_options = false;
    const toggle_options = () => {
        show_options = !show_options;
    }
</script>


<div class="nav">
    <div class="nav_left">
        <button class="cursor_selection"
            on:click={select_default}
            style="--color: {def_but_color};" 
        >
            <img 
                src={cursor_icon}
                style="filter: invert(1);"
                alt="screen icon" 
                width="25px" 
                height="25px"
            />
        </button>

        <button class="cursor_selection"
            on:click={select_processor}
            style="--color: {processor_but_color};" 
        >
            <img 
                src={cpu_icon} 
                style="filter: invert(1);"
                alt="cpu icon" 
                width="30px" 
                height="30px"
            />
        </button>

        <button class="cursor_selection"
            on:click={select_led}
            style="--color: {led_but_color};" 
        >
            <img 
                src={led_icon}
                style="filter: invert(1);"
                alt="led icon" 
                width="30px" 
                height="30px"
            />
        </button>

        <button class="cursor_selection"
            on:click={select_screen}
            style="--color: {screen_but_color};" 
        >
            <img 
                src={screen_icon}
                style="filter: invert(1);"
                alt="screen icon" 
                width="30px" 
                height="30px"
            />
        </button>

        <button class="cursor_selection"
            on:click={select_keyboard}
            style="--color: {keyboard_but_color};" 
        >
            <img 
                src={keyboard_icon}
                style="filter: invert(1);"
                alt="screen icon" 
                width="30px" 
                height="30px"
            />
        </button>
    </div>

    <div class="nav_center">
        <input 
            type="text"
            class="project_title" 
            bind:value={$project_name} 
            spellcheck="false"
            style="--title_width:{title_width}px"
        />
    </div>

    <div class="nav_right">
        <p id="speed_title">
            Sim speed
        </p>
        <input bind:value={simulation_speed} type="number" id="quantity" name="quantity" min="1" max="100000">
        <button class="play" on:click={run}>
            {#if !running}
                <img 
                    src={play_button}
                    alt="screen icon" 
                    width="35px" 
                    height="35px"
                />
            {:else}
                <img 
                    src={stop_button}
                    alt="screen icon" 
                    width="35px" 
                    height="35px"
                />
            {/if}
        </button>

        <button id="burger_menu" class="cursor_selection" on:click={toggle_options}>
            <img 
                src={menu_icon}
                alt="menu icon" 
                width="30px" 
                height="30px"
            />
        </button>
    </div>

</div>

{#if show_options}
    <div id="options" transition:slide={{ duration: 100, delay: 50}}>
        <button class="option_button" on:click={() => {
            clearInterval(interval);
            interval = 0;
            running = false;
            goto("/projects");
        }}>
            <img 
                src={projects_icon}
                style="filter: invert(1);"
                alt="screen icon" 
                width="25px" 
                height="25px"
            />
            Back to projects
        </button>
        <button class="option_button">
            <img 
                src={themes_icon}
                style="filter: invert(1);"
                alt="screen icon" 
                width="25px" 
                height="25px"
            />
            Change theme
        </button>
        <button class="option_button" on:click={() => goto("/logout")}>
            <img 
                src={logout_icon}
                style="filter: invert(1);"
                alt="screen icon" 
                width="25px" 
                height="25px"
            />
           Sign out 
        </button>
    </div>
{/if}

<style>
    .nav {
        position: fixed;
        top: 0;
        z-index: 666;

        width: 100%;
        height: 70px;

        background-color: #0B0B0B;

        display: grid;
        grid-template-columns: 30% 40% 30%;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }

    .nav_left {

        height: 70px;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .cursor_selection {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        width: 20%;
        background-color: var(--color);
        border: none;
        border-right: 1px solid rgba(0, 0, 0, .5);
    }

    .cursor_selection:hover {
        background: rgba(255,255,255,0.2);
    }

    .nav_center {

        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .project_title {
        height: 30px;

        font-family:monospace;
        font-size: 21pt;

        color: rgba(255,255,255,.90);

        background-color: transparent;
        border: none;
        outline: none;

        overflow:hidden;
        resize:none;
        width: var(--title_width);
    }
    .nav_right {

        height: 70px;
        display: flex;
        justify-content: right;
        align-items: center;
    }

    .play {
        background: none;
        border: none;
        margin: 20px;
        margin-top: 25px;
        margin-right: 30%;
        filter: invert(1);
    }
    .play:hover {
        filter: invert(80%);
    }

    #burger_menu {
        width: 130px;

    }

    #options {
        position: absolute;
        right: 10px;
        top: 90px;
        height: 400px;
        width: 300px;
        z-index: 5;
        background-color: #0B0B0B;
        border-radius: 15px;
        border: 1px solid rgba(255,255,255, 0.08);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 100px;
        font-size: 20pt;
    }

    .option_button {
        background: none;
        border: none;
        color: rgba(255,255,255,.70);
        font-size: 17pt;
        font-weight: bolder;
        text-align: left;
        height: 70px;

        width: 100%;
        padding-left: 20px;
        display: flex;
        align-items: center;
        column-gap: 20px;
    }
    .option_button:hover{
        background: rgba(255,255,255,0.2);
    }
    #quantity {
        border: none;
        border: 1px solid rgba(255,255,255, 0.08);
        border-radius: 8px;
        padding: 3px;
        text-align: center;
        font-size: 18pt;
        font-weight: bolder;
        background-color: #0B0B0B;
        color: rgba(255,255,255,.90);

    }
    #speed_title {
        color: rgba(255,255,255,.90);
        text-align: center;
        font-size: 13pt;
        margin-right: 10px;
    }
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
</style>
