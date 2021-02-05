import React from "react";
import { motion } from "framer-motion";
export default function Loader() {
  const parent = {
    first: {
      opacity: 0,
    },
    second: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  const child = {
    first: {
      y: 0,
    },
    second: {
      y: 6,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      className="flex"
      variants={parent}
      initial="first"
      animate="second"
    >
      <motion.span
        className="w-8 h-8 rounded-full bg-red-500 border-2 border-black z-10"
        variants={child}
      />
      <motion.span
        className="w-8 h-8 rounded-full bg-green-500 border-2 border-black -ml-4 z-20"
        variants={child}
      />
      <motion.span
        className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-black -ml-4 z-30"
        variants={child}
      />
      <motion.span
        className="w-8 h-8 rounded-full bg-purple-500 border-2 border-black -ml-4 z-40"
        variants={child}
      />
    </motion.div>
  );
}
