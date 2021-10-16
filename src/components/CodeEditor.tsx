import { FC, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null); // TODO: change any

  const onEditorDidMount: EditorDidMount = (getEditorValue, editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(getEditorValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier.format(unformatted, {
      parser: "babel",
      singleQuote: false,
      useTabs: false,
      semi: true,
      plugins: [parser],
    });

    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>format</button>
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
    </div>
  );
};

export default CodeEditor;