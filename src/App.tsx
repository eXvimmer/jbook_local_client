import * as esbuild from "esbuild-wasm";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function App() {
  const ref = useRef<esbuild.Service | null>(null);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "./esbuild.wasm",
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

    const result = await ref.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(result.code);
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
