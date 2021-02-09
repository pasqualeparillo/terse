import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import { addUrl } from "../utils/fetch";
import { regexp } from "../utils/emailRegex";
import Results from "../results/results";
import { useRecoilState } from "recoil";
import { linkState, messageState } from "../utils/state";
export default function LinkForm() {
  const [link, setLink] = useRecoilState(linkState);
  const [message, setMessage] = useRecoilState(messageState);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      url: "https://www.",
    },
    reValidateMode: "onSubmit",
  });

  function onFormSubmit(url_input) {
    let url = url_input.url;
    mutateUrl.mutate(url);
  }

  function onFormError(errors, e) {
    if (errors.url.type === "checkLength") {
      setMessageValue("Looks like you didn't enter anything");
    }
    if (errors.url.type === "checkPattern") {
      setMessageValue("Looks like you didn't enter a url");
    }
  }

  const mutateUrl = useMutation(addUrl, {
    onSuccess: (data) => {
      setLink({
        url: data.data.full_url,
        short_url: `Terse.dev/${data.data.url_hash}`,
      });
      setLoading(false);
    },
    onError: () => {
      setMessageValue();
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
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

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center self-center lg:w-1/2 md:w-3/4 w-11/12 mt-12 relative">
        <form
          className="w-full relative z-50"
          onSubmit={handleSubmit(onFormSubmit, onFormError)}
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
        <Results link={link} loading={loading} />
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
