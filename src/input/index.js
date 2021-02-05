import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import { addUrl } from "../helpers/URI";
import { regexp } from "../helpers/emailRegex";

export default function LinkForm() {
  const [link, setLink] = useState({ url: "", short_url: "" });
  const { register, handleSubmit } = useForm();

  const mutateUrl = useMutation(addUrl, {
    onSuccess: (data, variables, context) => {
      setLink({ url: data.data.full_url, short_url: data.data.url_hash });
    },
    onError: (error, variables, context) => {},
  });

  function onSubmit(url_input) {
    let url = url_input.url;
    mutateUrl.mutate(url);
  }

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center self-center lg:w-1/2 md:w-3/4 w-11/12 mt-12 relative">
        <form
          className="w-full relative z-50"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="w-full py-4 px-6 rounded-xl border-2 border-black z-50 overflow-hidden focus:outline-none font-bold"
            type="text"
            name="url"
            ref={register({ pattern: regexp })}
          ></input>
          <motion.button
            className="absolute right-0 top-0 bottom-0 flex items-center px-4 mx-1 my-1 rounded-xl bg-black text-white font-bold focus:outline-none"
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 1 }}
          >
            Shorten
          </motion.button>
        </form>
      </div>
      <div className="flex flex-1 self-center w-full h-full relative justify-center">
        <Results link={link} />
      </div>
    </React.Fragment>
  );
}

function Results({ link }) {
  const copyToClipboard = () => {
    let data = "http://127.0.0.1:8000/url/" + link.short_url;
    const ta = document.createElement("textarea");
    ta.innerText = data;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  };
  return (
    <div className="-mt-8 flex border-black lg:w-1/2 md:w-3/4  w-11/12 overflow-hidden justify-start h-24 relative">
      <div className="pt-8 flex flex-1 bg-black rounded-b-xl pl-6 pr-24 relative">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="flex flex-1 justify-between items-center w-full flex-wrap"
            animate={{ y: 0 }}
            initial={{ y: -50 }}
            exit={{ y: 50 }}
            key={link.url}
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
