import { Provider } from "react-redux";
import { store } from "../Redux/store";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";

import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Aside />
        <Main />
      </div>
    </Provider>
  );
};

export default App;
