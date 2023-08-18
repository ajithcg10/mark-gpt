import React from "react";
import Lottie from "react-lottie";
import loader from "../../assets/lottie/button.json";
import bg from "../../assets/image/Time.png";

export default function ButtonLoader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {},
  };
  return <Lottie options={defaultOptions} height={150} width={150} speed={6} />;
}
