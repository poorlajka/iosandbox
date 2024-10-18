<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { useNodes, useEdges, useHandleConnections, NodeToolbar, Handle, Position, type NodeProps, type Viewport, useSvelteFlow} from '@xyflow/svelte';
    import { Computer, computer } from '$lib/computer/computer';
    import ConnectionLine from './ConnectionLine.svelte';
    import  Screen  from "./Screen.svelte";
    import { SelectedTool, type EditorState, editor_state} from "$lib/editor_state"
    import { onMount } from "svelte";

    import "@xyflow/svelte/dist/style.css"
    import {
        SvelteFlow,
        Background,
        Controls,
        BackgroundVariant,
        type Edge,
        type Node,
    } from "@xyflow/svelte";

    import Processor from "./processor/Processor.svelte";
    import Led from "./Led.svelte";
    import Keyboard from "./Keyboard.svelte";

    const component_types = {
        processor: Processor,
        led: Led,
        screen: Screen,
        keyboard: Keyboard,
    }

    type ProcessorState = {
        id: string,
        pos: {
            x: number,
            y: number,
        },
        code: string,
    };

    type DeviceState = {
        type: string,
        id: string,
        pos: {
            x: number,
            y: number,
        },
    };

    type ConnectionState = {
        id: string,
        source: string,
        target: string,
        sourceHandle: string,
        targetHandle: string,
    };

    type SimulationState = {
        processors: ProcessorState[],
        devices: DeviceState[],
        connections: ConnectionState[],
        avail_device_id: number,
        avail_processor_id: number,
    };

    export let project_data;
    export let project_id;
    export let project_name: Writable<string>;
    let simulation_state: SimulationState = project_data;

    const get_simulation_nodes = (simulation_state: SimulationState): Node[] => {
        const {
            processors,
            devices,
        } = simulation_state;

        let nodes: Node[] = [];
        for (let processor of processors) {
            const processor_node: Node = {
                type: "processor",
                id: processor.id,
                position: processor.pos,
                width: 200,
                data: { 
                    code: processor.code, 
                },
            };
            nodes.push(processor_node);
        }

        for (let device of devices) {
            switch (device.type) {
                case "led":
                    nodes.push({
                        type: "led",
                        id: device.id,
                        position: device.pos,
                        data: {},
                    });
                    break;
                case "screen":
                    nodes.push({
                        type: "screen",
                        id: device.id,
                        position: device.pos,
                        data: {},
                    });
                    break;
                case "keyboard":
                    nodes.push({
                        type: "keyboard",
                        id: device.id,
                        position: device.pos,
                        data: {},
                    });
                    break;
            }
        }
        return nodes;
    }

    let get_simulation_edges = (simulation_state: SimulationState): Edge[] => {
        let edges: Edge[] = [];
        for (let connection of simulation_state.connections) {
            edges.push({
                id: connection.id,
                source: connection.source,
                target: connection.target,
                sourceHandle: connection.sourceHandle,
                targetHandle: connection.targetHandle,
            });
            computer.add_connection(
                Number(connection.source.slice(3)),
                Number(connection.sourceHandle!.slice(2)),
                Number(connection.target.slice(3)),
                Number(connection.targetHandle.slice(2)),
            );
        }
        return edges;
    }

    const components = writable<Node[]>(get_simulation_nodes(simulation_state))
    const connections = writable<Edge[]>(get_simulation_edges(simulation_state));

    let viewport = writable<Viewport>({ x: 400, y: 400, zoom: 1.2 });

    const { screenToFlowPosition } = useSvelteFlow();

    /*
        Create new component where the user clicks based
        on the currently selected tool.
    */
    let handle_pane_click = (e: CustomEvent) => {

        if (e.type == "paneclick") {
            const flow_pos = screenToFlowPosition({x: e.detail.event.x, y: e.detail.event.y});
            switch (editor_state.selected_tool) {
                case SelectedTool.CreateLed:
                    components.update((c) => c.concat([
                        {
                            type: "led",
                            id: "DEV" + String(simulation_state.avail_device_id),
                            position: flow_pos,
                            data: {},
                        }
                    ]));
                    simulation_state.avail_device_id++;
                    break;
                case SelectedTool.CreateScreen:
                    components.update((c) => c.concat([
                        {
                            type: "screen",
                            id: "DEV" + String(simulation_state.avail_device_id),
                            position: flow_pos,
                            data: {},
                        }
                    ]));
                    simulation_state.avail_device_id++;
                    break;
                case SelectedTool.CreateKeyboard:
                    components.update((c) => c.concat([
                        {
                            type: "keyboard",
                            id: "DEV" + String(simulation_state.avail_device_id),
                            position: flow_pos,
                            data: {},
                        }
                    ]));
                    simulation_state.avail_device_id++;
                    break;
                case SelectedTool.CreateProcessor:
                    components.update((c) => c.concat([
                        {
                            type: "processor",
                            id: "CPU" + String(simulation_state.avail_processor_id),
                            position: flow_pos,
                            width: 200,
                            data: { 
                                code: "", 
                            },
                        }
                    ]));
                    simulation_state.avail_processor_id++;
                    break;
            }
        }
    }

    /*
        Save the local editor state to the online db
        every couple of seconds.
        Don't await the response promise since we don't use it and
        setInterval doesn't play nice with async.
    */
   const node_store = useNodes();
   const edge_store = useEdges();
   onMount(() => {
        setInterval(() => {
            let project_s: SimulationState = {
                processors: [],
                devices: [],
                connections: [],
                avail_device_id: simulation_state.avail_device_id,
                avail_processor_id: simulation_state.avail_processor_id,
            };
            $node_store.forEach(
                (n) => {
                    switch (n.type) {
                        case "led":
                        case "screen":
                        case "keyboard":
                            project_s.devices.push(
                                {
                                    id: n.id,
                                    pos: n.position,
                                    type: n.type,
                                }
                            );
                            break;
                        case "processor":
                            project_s.processors.push(
                                {
                                    id: n.id,
                                    pos: n.position,
                                    code: String(n.data.code),
                                }
                            );
                            break;

                    }
                }
            );

            $edge_store.forEach(
                (e) => {
                    project_s.connections.push(
                        {
                            id: e.id,
                            source: e.source,
                            target: e.target,
                            sourceHandle: String(e.sourceHandle),
                            targetHandle: String(e.targetHandle),
                        }
                    );
                }
            );

            /*
                This is a safety net to make sure we don't
                update the state when transitioning away from the page
                or something similar (which happens and essentially deletes the project!).
            */
            if (project_s.connections.length === 0
                && project_s.devices.length === 0
                && project_s.processors.length === 0) {
                    return;
            }

            fetch("http://localhost:5173/api/editor_save", {
                method: "POST",
                body: JSON.stringify({
                    project_name: $project_name,
                    project_data: project_s,
                    project_id: project_id,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }, 500);
    });

</script>

<div style:height="100vh">
        <SvelteFlow 
            nodes={components} 
            edges={connections} 
            nodeTypes={component_types} 
            viewport={viewport}
            initialViewport={$viewport}
            proOptions={{hideAttribution: true}}
            panOnDrag={true}
            on:paneclick={handle_pane_click} 
        >
            <ConnectionLine slot="connectionLine" />

            <Background 
                variant={BackgroundVariant.Dots} 
                bgColor="#0A0A0A"
                gap={40}
                size={1}
            />

        </SvelteFlow>
</div>
