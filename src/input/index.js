import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import { addUrl } from "../helpers/URI";
import { regexp } from "../helpers/emailRegex";

export default function LinkForm() {
  const [link, setLink] = useState({ url: "", short_url: "" });
  const [message, setMessage] = useState({
    status: false,
    message: "",
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      url: "https://www.",
    },
    reValidateMode: "onSubmit",
  });

  const mutateUrl = useMutation(addUrl, {
    onSuccess: (data, variables, context) => {
      setLink({
        url: data.data.full_url,
        short_url: `Terse.dev/${data.data.url_hash}`,
      });
    },
    onError: (error, variables, context) => {
      setMessageValue();
    },
  });
  function setMessageValue(
    value = "hmmmmm something went wrong, please try again"
  ) {
    setMessage({
      status: true,
      message: value,
    });
    setTimeout(() => setMessage({ status: false, message: "" }), 5000);
  }
  function onSubmit(url_input) {
    let url = url_input.url;
    mutateUrl.mutate(url);
  }
  function onError(errors, e) {
    if (errors.url.type === "checkLength") {
      setMessageValue("Looks like you didn't enter anything");
    }
    if (errors.url.type === "checkPattern") {
      setMessageValue("Looks like you didn't enter a url");
    }
  }
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center self-center lg:w-1/2 md:w-3/4 w-11/12 mt-12 relative">
        <form
          className="w-full relative z-50"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <input
            className="w-full py-4 px-6 rounded-xl border-2 border-black z-50 overflow-hidden focus:outline-none font-bold"
            type="text"
            name="url"
            ref={register({
              validate: {
                checkLength: (input) => input.length > 0,
                checkPattern: (value) => regexp.test(value),
              },
            })}
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
      <div className="flex flex-1 self-center w-full h-full relative justify-center z-40">
        <Results link={link} setMessageValue={setMessageValue} />
      </div>
      <div className="fixed right-0 bottom-0 h-screen lg:w-1/4 md:w-1/4 w-full flex justify-end items-end z-10">
        <AnimatePresence exitBeforeEnter>
          {message.message !== "" && (
            <motion.span
              className="w-full bg-white border-2 border-black rounded-xl lg:h-32 md:h-24 h-20 m-2 shadow-xl flex justify-center items-center lg:p-6 p-4"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              key={message.message}
            >
              <p className="font-bold">{message.message}</p>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
}

function Results({ link, setMessageValue }) {
  const copyToClipboard = () => {
    let data = "http://127.0.0.1:8000/url/" + link.short_url;
    const ta = document.createElement("textarea");
    ta.innerText = data;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    setMessageValue("Copied!");
  };
  return (
    <div className="-mt-8 flex border-black lg:w-1/2 md:w-3/4  w-11/12 overflow-hidden justify-start h-24 relative">
      <div className="pt-8 flex flex-1 bg-black rounded-b-xl pl-6 pr-24 relative max-w-full">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="flex flex-1 justify-between items-center w-full flex-wrap truncate"
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
