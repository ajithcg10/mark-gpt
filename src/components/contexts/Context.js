import React, { useReducer } from "react";
import { authReducer } from "./Reducer";
import { point } from "../helpers/Object";
import { social_media } from "../helpers/Object";
export const MyContext = React.createContext();

export default function Context({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user_data: {
      is_verified: false,
      access_token: "",
      name: "",
    },
    plan_modal: {
      isPlan: false,
    },
    currentParams: {},
    segment_data: {
      segment: "",
    },
    social_data: {},

    // segment: segment,
    point: point,
    social_media: social_media,
    segemnt_cart: [],
    points_cart: [],
    social_cart: [],
  });

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}
