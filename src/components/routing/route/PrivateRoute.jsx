import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyContext } from "../../contexts/Context";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const {
    state: { user_data },
  } = useContext(MyContext);

  return user_data.is_verified ? (
    children
  ) : (
    <Navigate
      to={location.pathname ? `auth/?next=${location.pathname}` : "/auth/"}
    />
  );
}
