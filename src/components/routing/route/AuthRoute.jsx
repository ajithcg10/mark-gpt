import React, { useContext, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { MyContext } from "../../contexts/Context";

export default function AuthRoute({ children }) {
  const [searchParams] = useSearchParams();
  const nextPath = searchParams.get("next") ? searchParams.get("next") : "/";
  const {
    state: { user_data },
    dispatch,
  } = useContext(MyContext);

  return !user_data.is_verified ? children : <Navigate to={nextPath} />;
}
