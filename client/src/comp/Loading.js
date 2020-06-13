import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffle } from "lodash";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300
};

export const Loading = () => {
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    setTimeout(() => setColors(shuffle(colors)), 1000);
  }, [colors]);

  return (
    <ul>
      {colors.map(background => (
        <motion.li
          key={background}
          layoutTransition={spring}
          style={{ background }}
        />
      ))}
    </ul>
  );
};

const initialColors = ["#f70d1a", "#ff726f", "#ffc0cb", "#ffcccb "];

export default Loading;