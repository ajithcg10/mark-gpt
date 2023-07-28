import React, { useState, useEffect, useRef } from "react";

export default function TypingEffect(text, duration) {
  const [current, setCureent] = useState(0);
  const index = useRef(0);

  useEffect(() => {
    const intervel_id = setInterval(() => {
      console.log("hi");
      setCureent((value) => value + 2);
      index.current += 1;
      if (index.current > text?.length) {
        clearInterval(intervel_id);
      }
    }, duration);
    return () => {
      clearInterval(intervel_id);
      index.current = 0;
      setCureent(0);
    };
  }, [duration]);
  return text?.substring(0, current);
}
