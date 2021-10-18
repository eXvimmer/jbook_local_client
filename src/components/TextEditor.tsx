import "./TextEditor.css";

import MDEditor from "@uiw/react-md-editor";
import { FC, useEffect, useRef, useState } from "react";

const TextEditor: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={"# Markdown Editor"} />
    </div>
  );
};

export default TextEditor;
