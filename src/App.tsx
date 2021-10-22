import { Provider } from "react-redux";
import CellList from "./components/CellList";
import { store } from "./state";

function App() {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
