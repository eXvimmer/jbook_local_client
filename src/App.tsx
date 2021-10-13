import { ChangeEvent, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  // code is the output of transpiling and bundling
  const [code, setCode] = useState("");

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onButtonClick = () => {
    console.log(input);
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
