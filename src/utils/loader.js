import React from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Loader({ loading, clipBoard }) {
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
    <div className="-mt-8 flex border-black lg:w-1/2 md:w-3/4  w-11/12 overflow-hidden justify-start h-24 relative">
      <div className="pt-8 flex flex-1 bg-black rounded-b-xl pl-6 pr-24 relative max-w-full ">
        <AnimatePresence>
          <motion.div
            className="flex w-full h-full self-center justify-start items-center"
            variants={parent}
            initial="first"
            animate={loading ? "second" : "first"}
            key={loading}
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
        </AnimatePresence>
      </div>
      <motion.button
        className="flex absolute right-0 top-0 bottom-0 justify-center items-center px-4 mx-2 mb-2 mt-10 rounded-xl bg-white font-bold focus:outline-none"
        onClick={() => clipBoard()}
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 1 }}
      >
        Copy
      </motion.button>
    </div>
  );
}
