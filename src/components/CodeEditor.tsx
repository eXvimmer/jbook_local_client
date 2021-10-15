import { FC } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor: FC = () => {
  return <MonacoEditor height="500px" theme="dark" />;
};

export default CodeEditor;
