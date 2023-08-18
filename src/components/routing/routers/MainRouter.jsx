import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import AuthRouter from "./AuthRouter";
import AuthRoute from "../route/AuthRoute";
import PrivateRoute from "../route/PrivateRoute";
import AppRouter from "./AppRouter";
import { useSearchParams } from "react-router-dom";
import { MyContext } from "../../contexts/Context";

export default function MainRouter() {
  const {
    state: { user_data, segment_data },
    dispatch,
  } = useContext(MyContext);

  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_SEARCH_PARAMS",
      payload: currentParams,
    });
  }, []);

  // auth
  useEffect(() => {
    async function fetchUserData() {
      let promise = new Promise((resolve, reject) => {
        let user_data = localStorage.getItem("user_data");
        user_data = JSON.parse(user_data);

        dispatch({
          type: "UPDATE_USER_DATA",
          payload: { ...user_data },
        });
      });

      let result = await promise;
    }

    fetchUserData();
  }, []);

  // useEffect(() => {
  //   async function fetchSocial_Data() {
  //     let promise = new Promise((resolve, reject) => {
  //       let social_cart = localStorage.getItem("social_cart");
  //       segment_data = JSON.parse(segment_data);

  //       dispatch({
  //         type: "Add_Social",
  //         payload: { ...segment_data },
  //       });
  //     });

  //     let result = await promise;
  //   }

  //   fetchSocial_Data();
  // }, []);

  return (
    <div>
      <Routes>
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
      </Routes>
    </div>
  );
}
