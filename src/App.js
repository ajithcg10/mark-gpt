import "../src/assets/css/style.css";
import { Route, Routes } from "react-router";
import AppRouter from "./components/routing/routers/AppRouter";
import PrivateRoute from "./components/routing/route/PrivateRoute";
import AuthRouter from "./components/routing/routers/AuthRouter";
import AuthRoute from "./components/routing/route/AuthRoute";
import MainRouter from "./components/routing/routers/MainRouter";

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route
          path="/auth/*"
          element={
            <AuthRoute>
              <AuthRouter />
            </AuthRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AppRouter />
            </PrivateRoute>
          }
        />
      </Routes> */}
      <MainRouter />
    </div>
  );
}

export default App;
