import "./Preview.css";
import { FC, useEffect, useRef } from "react";

const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Code Sandbox</title>
      <style>html {background-color: white;}</style>
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

interface PreviewProps {
  code: string;
}

const Preview: FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // refresh the content of the iframe.
    if (iframe.current) iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current?.contentWindow?.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="Code Sandbox"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
