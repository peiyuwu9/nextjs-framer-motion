"use client";
import React, {
  forwardRef,
  MouseEvent,
  useImperativeHandle,
  useState,
} from "react";

interface Props {
  options: Array<string>;
  className: string;
}

export type DropdownBtnHandle = {
  selected: string;
  setSelected: (selected: string) => void;
};

const DropdownBtn = forwardRef(function ({ options, className }: Props, ref) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("Type");

  function handleShow() {
    setShow(!show);
  }

  function handleBlur() {
    setShow(false);
  }

  function handleSelect(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const divTarget = event.target as HTMLElement;
    setSelected(divTarget.innerText);
    setShow(false);
  }

  useImperativeHandle(ref, () => ({
    selected,
    setSelected,
  }));

  return (
    <div className={className + " relative"}>
      <button
        className="text-gray-600 bg-gray-100 focus:outline-none font-medium rounded-full text-sm px-4 text-center inline-flex items-center"
        type="button"
        onClick={handleShow}
        onBlur={handleBlur}
      >
        {selected}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`z-10 bg-gray-100 rounded-lg shadow w-44 ${
          show ? "block" : "hidden"
        }`}
        style={{
          position: "absolute",
          inset: "0px auto auto 0px",
          margin: "0px",
          transform: `translate(${
            selected === "Options" ? "0px" : "12px"
          }, 50px)`,
        }}
      >
        <ul
          className="max-h-48 overflow-y-auto py-2 text-sm text-gray-70"
        >
          {options.map((option) => {
            return (
              <li>
                <div
                  className="block px-4 py-2 hover:bg-gray-200"
                  onMouseDown={handleSelect}
                >
                  {option}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default DropdownBtn;
