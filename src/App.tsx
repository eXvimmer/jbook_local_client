import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

function App() {
  const ref = useRef<esbuild.Service | null>(null);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();

    // cleanup
    return () => {
      ref.current && ref.current.stop();
    };
  }, []);

  const onButtonClick = async () => {
    if (!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // result.outputFiles ? setCode(result.outputFiles[0].text) : setCode("");
    result.outputFiles && setCode(result.outputFiles[0].text);
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
