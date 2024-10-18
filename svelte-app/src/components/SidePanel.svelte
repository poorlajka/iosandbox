<script lang="ts">
    import { slide } from "svelte/transition";
    import { instructions_store } from "$lib/instructions_store";
    import { writable, type Writable } from "svelte/store";

    let code = "";

    $: instructions_store[0].set(code);

    export let show_editor: Writable<boolean>;

</script>


$: {#if $show_editor}
    <div id="panel" transition:slide={{ delay: 200, duration: 150, axis: "x"}}>


        <div class="button right open" on:click={() => show_editor.set(!$show_editor)} transition:slide={{ delay: 350, duration: 150, axis: "x"}}>
            <div class="triangle-right"></div>
        </div>


        <div class="linenrs"><p><p> </div>
        <textarea class="code" bind:value={code} spellcheck="false"/> -->
    </div>
{:else}

    <div class="button right" on:click={() => show_editor.set(!$show_editor)} transition:slide={{ delay: 350, duration: 150, axis: "x"}}>
        <div class="triangle-left"></div>
    </div>
{/if}

<style>
    .button{ 
      position: absolute;
        right: 0px;
        top: 50vh;
      color: #fff;
      cursor: pointer;
      padding: 30px 10px 30px 10px;
      background: #2EC4B6;
      background: white;
        background: rgba(255, 255, 255, .7);
        z-index: 0;
    }

    .button:hover { 
    background: rgba(255, 255, 255);
    }
    .left{
      border-radius: 0 100px 100px 0;
    }
    .right{
      border-radius: 100px 0 0 100px;
    }
    .open {
        right: 100%;
    }

    .triangle-right{
      width: 0;
      height: 0;
      border: 0 solid transparent;
      border-top-width: 20px;
      border-bottom-width: 20px;
      border-left: 10px solid rgba(0, 0, 0, .7);
    }

    .triangle-left{
          width: 0;
          height: 0;
          border: 0 solid transparent;
          border-top-width: 20px;
          border-bottom-width: 20px;
          border-right: 10px solid rgba(0, 0, 0, .7);
    }

    .code {
        padding-top: 120px;
        height: 100%;
        margin-left: 40px;
        color: white;
        font-size: 20px;
        background: #0A0A0A;
        border: none;
        outline: none;
        width: 100%;
    }
    .linenrs {
        padding-top: 120px;
        border-right: 1px solid rgba(255,255,255,0.2);
        width: 50px;
        height: 100%;
    }
    #panel {
        display: flex;
        margin-top: 0px;
        height: 100%;
        width: 700px;
        background: #0A0A0A;
        z-index: 1;
        position: absolute;
        top: 0px;
        font-family:monospace;
        /*border-left: 1px dotted rgba(255,255,255,0.2);*/
        right: 0px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    .line {
        margin-top: 0px;
        margin-bottom: 3px;
        margin-left: 20px;
    }

</style>
