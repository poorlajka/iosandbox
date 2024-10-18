<script lang="ts">
	import { goto } from "$app/navigation";
    import { slide } from "svelte/transition";
    export let form;
    let show_login = form?.failedLogin ?? false;
    let show_signup = form?.failedSignup ?? false;
</script>

<div id="landing_page">
    <div id="top_menu">
        <button 
            class="top_menu_button" 
            on:click={() => {
                if (show_login && show_signup) {
                    show_signup = false;
                }
                else {
                    show_login = !show_login;
                }
            }}
        >
            Login
        </button>
        <button class="top_menu_button">
            Use as guest
        </button>
    </div>
    <div id="mid_section">
        <div
            transition:slide={{ duration: 100, delay: 50}}
        >
            <h1 id="title">
                Assembly Simulation <br>
                Playground
            </h1>
            <h2 id="description">
                A small web-based playground for writing small Assembly
                programs with io.
            </h2>
        </div>
        {#if show_login}
            <div 
                id="login_box"
                transition:slide={{ duration: 500, delay: 50}}
            >
                <div id="login_title">
                    {#if !show_signup}
                        Login
                    {:else}
                        Sign up
                    {/if}
                </div>
                {#if !show_signup}
                    <form method="POST" action="?/login" id="login_form">
                        <div class="login_form_item">
                            <label for="username">
                                <span>
                                    Username or email address
                                </span>
                            </label>
                            <input 
                                type="text" 
                                name="username" 
                                value={form?.username ?? ""}
                                autocomplete="off"
                                id="username"
                                class="login_form_input"
                            />
                        </div>

                        <div class="login_form_item">
                            <label for="password">
                                <span>
                                    Password
                                </span>
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                autocomplete="off"
                                value={form?.password ?? ""}
                                id="password"
                                class="login_form_input"
                            />
                        </div>

                        <button id="login_form_button">
                            Sign in
                        </button>
                        {#if form?.failedLogin ?? false}
                            Incorrect username or password :)
                        {/if}
                        
                    </form>
                {:else}
                    <form method="POST" action="?/register" id="login_form">
                        <div class="login_form_item">
                            <label for="email">
                                <span>
                                    Email address
                                </span>
                            </label>
                            <input 
                                type="text" 
                                name="email" 
                                value={form?.email ?? ""}
                                autocomplete="off"
                                id="email"
                                class="login_form_input"
                            />
                        </div>
                        <div class="login_form_item">
                            <label for="username">
                                <span>
                                    Username 
                                </span>
                            </label>
                            <input 
                                type="text" 
                                name="username" 
                                value={form?.username ?? ""}
                                autocomplete="off"
                                id="username"
                                class="login_form_input"
                            />
                        </div>

                        <div class="login_form_item">
                            <label for="password">
                                <span>
                                    Password
                                </span>
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                autocomplete="off"
                                value={form?.password ?? ""}
                                id="password"
                                class="login_form_input"
                            />
                        </div>

                        <button id="login_form_button">
                            {#if !show_signup}
                                Sign in
                            {:else}
                                Register 
                            {/if}
                        </button>
                        {#if form?.failedLogin ?? false}
                            Incorrect username or password :)
                        {/if}
                        
                    </form>
                {/if}
                <div id="register_box">
                    <div id="register_message">
                        {#if !show_signup}
                            Don't have an account?
                        {:else}
                            Already have an account?
                        {/if}
                    </div>
                    <button 
                        id="register_button"
                        on:click={() => show_signup = !show_signup}
                    >
                        {#if !show_signup}
                            Create one today!
                        {:else}
                            Sign in instead!
                        {/if}
                    </button>
                </div>
            </div>
        {/if}
    </div>
    <h2 id="xyflow_credit">
        Implemented using xyflow
    </h2>
</div>

<style>
    :global(body) { /* this will apply to <body> */ margin: 0; padding: 0; }

    #landing_page {
        height: 100vh;
        width: 100%;
        margin-top: 0px;
        position: absolute;
        background: #0A0A0A;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #title {
        color: white;
        font-size: 35pt;
        text-align: center;
    }
    #description {
        color: rgba(255,255,255,.70);
        font-size: 19pt;
        font-weight: normal;
        width: 500px;
        text-align: center;
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
    #xyflow_credit {
        position: absolute;
        bottom: 0px;
        color: rgba(255,255,255,.70);
        font-size: 18pt;
        width: 400px;
        text-align: center;
        font-weight: normal;
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
    #login_box {
        width: 400px;
    }
    #login_form {
        color: rgba(255,255,255,.90);
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
        background: #0A0A0A;
        padding: 40px 0px;
        width: 300px;
        border: 1px solid rgba(255,255,255,.005);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border-radius: 7px;
        font-size: 14pt;
    }
    .login_form_item {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        width: 85%;
    }
    .login_form_input {
        border-radius: 6px;
        height: 30px;
        border: 1px solid rgba(255, 255, 255, .5);
        background-color: #0B0B0B;
        color: rgba(255, 255, 255, 0.7);
        font-size: 13pt;
        padding: 2px 10px;
    }

    #login_form_button {
        width: 85%;
        height: 40px;
        font-size: 13pt;
        font-weight: bold;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, .5);
        margin-top: 7px;
        color: white;
        background-color: #0B0B0B;
    }
    
    #login_form_button:hover {
        background:rgba(255, 255, 255, .9);
        color: black;
    }
    #login_form_button:active {
        background: orange;
    }

    #register_box {
        border-radius: 70px;
        padding: 15px 0px;
        width: 300px;
        display: flex;
        margin-top: 20px;
        height: 50px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #register_message {
        color: white;
    }
    #login_title {
        color: rgba(255,255,255,.70);
        font-size: 20pt;
        font-weight: bolder;
        text-align: center;
        width: 300px;
        margin-bottom: 10px;
    }

    #register_button {
        background: none;
        border: none;
        width: 85%;
        height: 40px;
        font-weight: bolder;
        font-size: 13pt;
        border-radius: 6px;
        font-weight: bold;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
    #register_button:hover {
        text-decoration: underline;
    }
</style>