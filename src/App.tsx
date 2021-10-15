import * as esbuild from "esbuild-wasm";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

function App() {
  const ref = useRef<esbuild.Service | null>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState("");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Code Sandbox</title>
    </head>
    <body>
     <div id="root"></div> 
     <script>
      window.addEventListener("message", (e) => {
        try {
          eval(e.data);
        } catch (err) {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
      }, false);
     </script>
    </body>
    </html>
  `;

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

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onButtonClick = async () => {
    if (!ref.current) return;

    // refresh the content of the iframe.
    if (iframe.current) iframe.current.srcdoc = html;

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
    // result.outputFiles && setCode(result.outputFiles[0].text);
    iframe.current?.contentWindow?.postMessage(result.outputFiles[0].text, "*");
  };

  return (
    <div>
      <CodeEditor />
      <textarea value={input} onChange={onTextAreaChange}></textarea>
      <div>
        <button onClick={onButtonClick}>Submit</button>
      </div>
      <iframe
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        title="code sandbox"
      />
    </div>
  );
}

export default App;
