import "../src/assets/css/style.css";
import MyComponent from "./components/helpers/MyComponent";

import MainRouter from "./components/routing/routers/MainRouter";

function App() {
  return (
    <div className="App">
      <MainRouter />
      {/* <MyComponent /> */}

      {/* <History /> */}
    </div>
  );
}

export default App;
