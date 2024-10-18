import {writable, type Writable} from "svelte/store";

let instructions_store: Writable<string>[] = Array(20);
instructions_store[0] = writable("");
export {instructions_store};




