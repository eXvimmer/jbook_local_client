import * as esbuild from "esbuild-wasm";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  }, []);

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

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

    result.outputFiles ? setCode(result.outputFiles[0].text) : setCode("");
  };

  return (
    <div>
      <textarea value={input} onChange={onTextAreaChange}></textarea>
      <div>
        <button onClick={onButtonClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
