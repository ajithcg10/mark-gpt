import "../src/assets/css/style.css";
import MainRouter from "./components/routing/routers/MainRouter";
import History from "./components/screen/history/History";

function App() {
  return (
    <div className="App">
      <MainRouter />
      {/* <History /> */}
    </div>
  );
}

export default App;
