import { FC } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor: FC = () => {
  return (
    <MonacoEditor
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
