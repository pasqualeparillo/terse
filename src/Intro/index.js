import React from "react";

export default function Intro() {
  return (
    <div className="flex flex-col flex-wrap self-center items-center lg:mt-0 md:mt-0 mt-24">
      <div className="flex items-end">
        <p className="lg:text-6xl md:text-5xl text-5xl font-bold px-2 text-center">
          Links
        </p>
        <Icon />
      </div>
      <div className="flex items-center text-center">
        <p className="lg:text-6xl md:text-5xl text-3xl mt-4">
          lets keep them short
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="flex">
      <span className="w-12 h-12 rounded-full bg-red-500 border-2 border-white" />
      <span className="w-12 h-12 rounded-full bg-green-500 border-2 border-white -ml-4" />
      <span className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-white -ml-4" />
      <span className="w-12 h-12 rounded-full bg-purple-500 border-2 border-white -ml-4" />
    </div>
  );
}
