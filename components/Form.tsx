"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  questions: Array<object>;
}

interface QuestionObj {
  question: string;
  type: string;
  isRequired: boolean;
  tempId: string;
}

function Form({ title, questions }: Props) {
  const router = useRouter();

  function handleCancel() {
    router.push("/form/list");
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="text-gray-600 mb-6">{title}</div>
      </div>
      <form className="w-full flex flex-col items-center" action="/api/brief" method="POST">
        {questions.map((item: QuestionObj, index) => {
          const { question, type, isRequired, tempId } = item;
          return (
            <div key={tempId} className={`w-10/12 flex items-center mb-3 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]`} style={{ animationDelay: `${0.2 * index}s` }}>
              <label
                className="block w-1/3 text-gray-600 text-right"
                htmlFor={tempId}
              >
                {question}
              </label>
              <span className="w-0.5 mr-4 text-red-500">
                {isRequired ? "*" : ""}
              </span>
              <input
                className="w-2/3 input-basic text-gray-600 h-8"
                id={tempId}
                type={type}
                required={isRequired}
              />
            </div>
          );
        })}
        <div
          id="button-group"
          className="flex justify-end items-center w-full translate-y-3 translate-x-2"
        >
          <button
            type="submit"
            className="text-gray-600 bg-gray-100 hover:bg-teal-500 hover:text-white font-medium rounded-full text-sm px-5 py-2.5 text-center m-1"
          >
            Save
          </button>
          <button
            type="button"
            className="text-gray-600 bg-gray-100 hover:bg-red-400 hover:text-white font-medium rounded-full text-sm px-5 py-2.5 text-center m-1"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
