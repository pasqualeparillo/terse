import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../utils/loader";
import { linkState, messageState } from "../utils/state";
import { useRecoilState } from "recoil";

export default function Results({ loading }) {
  // eslint-disable-next-line
  const [message, setMessage] = useRecoilState(messageState);
  const [link] = useRecoilState(linkState);
  const copyToClipboard = () => {
    let data = link.short_url;
    const ta = document.createElement("textarea");
    ta.innerText = data;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    setMessage({
      status: true,
      message: "Copied",
    });
    setTimeout(() => setMessage({ status: false, message: "" }), 5000);
  };
  if (loading) return <Loader clipBoard={copyToClipboard} />;
  return (
    <div className="-mt-8 flex border-black lg:w-1/2 md:w-3/4  w-11/12 overflow-hidden justify-start h-24 relative">
      <div className="pt-8 flex flex-1 bg-black rounded-b-xl pl-6 pr-24 relative max-w-full ">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="flex flex-1 justify-between items-center w-full flex-wrap truncate"
            animate={{ y: 0 }}
            initial={{ y: -50 }}
            exit={{ y: 50 }}
            key={link.short_url}
          >
            <p className="text-white font-bold text-xs lg:w-1/2 w-full truncate flex lg:justify-start justify-start">
              {link.url}
            </p>
            <div className="flex flex-1 lg:justify-end justify-start">
              <a
                className="text-yellow-200 font-bold text-xs truncate"
                href={link.short_url}
              >
                {link.short_url}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.button
        className="flex absolute right-0 top-0 bottom-0 justify-center items-center px-4 mx-2 mb-2 mt-10 rounded-xl bg-white font-bold focus:outline-none"
        onClick={() => copyToClipboard()}
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
