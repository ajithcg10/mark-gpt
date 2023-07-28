import React, { Suspense } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { Route, Routes } from "react-router";
import AuthOptions from "../../screen/authsection/AuthOptions";
import SignPage from "../../screen/authsection/SignPage";
import Siginup from "../../screen/authsection/Siginup";

export default function AuthRouter() {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Suspense
      fallback={
        <div style={style}>
          <RotatingTriangles
            visible={true}
            height="100"
            width="100"
            ariaLabel="rotating-triangels-loading"
            wrapperStyle={{}}
            wrapperClass="rotating-triangels-wrapper"
          />
        </div>
      }
    >
      <Routes>
        <Route path="/" exact element={<AuthOptions />} />
        <Route path="/signin" exact element={<SignPage />} />
        <Route path="/signup" exact element={<Siginup />} />
      </Routes>
    </Suspense>
  );
}
