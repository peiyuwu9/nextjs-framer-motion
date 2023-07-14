"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";

export type SwitchBtnHandle = {
  isRequired: boolean;
  setIsRequired: (isRequired: boolean) => void;
};

const SwitchBtn = forwardRef(function ({}, ref) {
  const [isRequired, setIsRequired] = useState(false);

  useImperativeHandle(ref, () => ({
    isRequired,
    setIsRequired,
  }));

  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isRequired ? "bg-red-400" : "bg-gray-100"
      }`}
      onClick={() => {
        setIsRequired(!isRequired);
      }}
    >
      <div
        className={`h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out
          ${
            isRequired ? " bg-gray-100 transform translate-x-5" : " bg-gray-400"
          }`}
      ></div>
    </div>
  );
});

export default SwitchBtn;
