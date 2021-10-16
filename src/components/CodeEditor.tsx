import { FC } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(getEditorValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      language="javascript"
      height="500px"
      theme="dark"
      options={{
        minimap: {
          enabled: false,
        },
        wordWrap: "on",
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
