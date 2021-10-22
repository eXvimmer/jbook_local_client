import "./Preview.css";
import { useEffect, useRef } from "react";

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
      // General Error Handling Function
      const handleError = err => {
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }

      // Error handler for Async Code
      window.addEventListener("error", (e) => {
        e.preventDefault();
        handleError(e.error);
      });

      window.addEventListener("message", (e) => {
        try {
          eval(e.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
     </script>
    </body>
    </html>
  `;

interface PreviewProps {
  code: string;
  err: string;
}

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
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
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
