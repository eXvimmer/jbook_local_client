import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

function CodeCell() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onButtonClick = async () => {
    const output = await bundle(input);

    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="console.log('Welcome');"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onButtonClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
