enum SelectedTool {
    Default = "Default",
    CreateLed = "CreateLed",
    CreateScreen = "CreateScreen",
    CreateKeyboard = "CreateKeyboard",
    CreateProcessor = "CreateProcessor",
}

type EditorState = {
    selected_tool: SelectedTool,
};

let editor_state: EditorState = {selected_tool: SelectedTool.Default};

export { SelectedTool, type EditorState, editor_state };


