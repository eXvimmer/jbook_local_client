import { useState } from "react";
import bundle from "./bundler";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  /*
  useEffect(() => {
    // move to top
    import { srevice } from "./bundler";
    // stop the service when componet unmounts
    return () => service.stop();
  }, []);
  */

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

export default App;
