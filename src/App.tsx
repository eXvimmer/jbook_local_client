import { Provider } from "react-redux";
import TextEditor from "./components/TextEditor";
import { store } from "./state";

function App() {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
}

export default App;
