export const authReducer = (state, action) => {
  switch (action.type) {
    case "Add_Segmaents":
      return {
        ...state,
        segemnt_cart: [...state.segemnt_cart, action.payload],
      };
    case "Remove_Segmaents":
      return {
        ...state,
        segemnt_cart: state.segemnt_cart.filter((p) => p !== action.payload),
      };
    case "Add_Points":
      return {
        ...state,
        points_cart: [...state.points_cart, action.payload],
      };
    case "Remove_Points":
      return {
        ...state,
        points_cart: state.points_cart.filter((p) => p !== action.payload),
      };
    case "Add_Social":
      return {
        ...state,
        social_cart: [...state.social_cart, action.payload],
      };

    case "Remove_Social":
      return {
        ...state,
        social_cart: state.social_cart.filter((p) => p !== action.payload),
      };
    case "UPDATE_USER_DATA":
      const user_data = { ...state.user_data, ...action.payload };
      localStorage.setItem("user_data", JSON.stringify(user_data));
      return {
        ...state,
        user_data: user_data,
      };
    case "UPDATE_SEGMENT_DATA":
      const segment_data = { ...state.segment_data, ...action.payload };
      localStorage.setItem("segment_data", JSON.stringify(segment_data));
      return {
        ...state,
        segment_data: segment_data,
      };
    case "UPDATE_SOCIAL_DATA":
      const social_data = { ...state.social_data, ...action.payload };
      localStorage.setItem("social_data", JSON.stringify(social_data));
      return {
        ...state,
        social_data: social_data,
      };
    // case "UPDATE_SOCIAL_DATA":
    //   const social_cart = { ...state.social_cart, ...action.payload };
    //   localStorage.setItem("social_cart", JSON.stringify(social_cart));
    //   return {
    //     ...state,
    //     social_cart: social_cart,
    //   };
    case "UPDATE_SEARCH_PARAMS":
      return {
        ...state,
        currentParams: action.payload,
      };
    case "UPDATE_PLAN_MODAL":
      return {
        ...state,
        plan_modal: { ...state.plan_modal, ...action.payload },
      };

    default:
      break;
  }
};
