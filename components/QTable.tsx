"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";
import DropdownBtn, { DropdownBtnHandle } from "./DropdownBtn";
import QDraggableRow from "./QDraggableRow";
import SwitchBtn, { SwitchBtnHandle } from "./SwitchBtn";

function appendQuestionId(list: Array<object>) {
  const newList = [...list];
  newList.forEach((item, index: number) => (item.tempId = "q-" + index));
  return newList;
}

function QTable() {
  const defaultList = appendQuestionId([]);
  // React state to track order of items
  const [itemList, setItemList] = useState(defaultList);
  const [isDraggingAny, setIsDraggingAny] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null!);
  const questionRef = useRef<HTMLInputElement>(null!);
  const typeRef = useRef<DropdownBtnHandle>(null!);
  const requiredRef = useRef<SwitchBtnHandle>(null!);
  const router = useRouter();

  function handleDrag() {
    setIsDraggingAny(true);
  }

  // Function to update list on drop
  function handleDrop(droppedItem) {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
    setIsDraggingAny(false);
  }

  function handleAddQuestion() {
    const question = questionRef.current.value;
    const type = typeRef.current.selected;
    const isRequired = requiredRef.current.isRequired;
    if (!question || !type || type === "Type") return;
    setItemList((prevItemList) => [
      ...prevItemList,
      { question, type, isRequired, tempId: "q-" + itemList.length },
    ]);
    questionRef.current.value = "";
    typeRef.current.setSelected("Type");
    requiredRef.current.setIsRequired(false);
  }

  function handleRemoveQuestion(event: MouseEvent<HTMLDivElement>) {
    const updatedList = [...itemList];
    const divTarget = event.target as HTMLElement;
    const index = itemList.findIndex((item) => item.tempId === divTarget.id);
    updatedList.splice(index, 1);
    setItemList(updatedList);
  }

  async function handleSave() {
    const title = titleRef.current.value.trim();
    if (!title || itemList.length === 0) return;
    const reqBody = {
      title,
      questions: itemList,
    };
    const res = await fetch("/api/form", {
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const { id } = await res.json();
    router.push("/form/list");
  }

  function handleCancel() {
    router.push("/form/list");
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-w-max w-full table-auto bg-transparent my-2 relative">
      <div className="flex">
        <span className="ml-1 mr-2 my-1 text-gray-600 uppercase text-md">title</span>
        <input
          ref={titleRef}
          className="input-basic"
        />
      </div>
      <div className="text-gray-600 uppercase text-sm leading-normal flex border-b border-gray-200">
        <div className="w-6/12 py-3 mx-1 text-left">question</div>
        <div className="w-2/12 py-3 text-center">type</div>
        <div className="w-2/12 py-3 text-center">required</div>
        <div className="w-2/12 py-3 text-center">action</div>
      </div>
      {isMounted ? (
        <DragDropContext onDragStart={handleDrag} onDragEnd={handleDrop}>
          <Droppable droppableId="input-table">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {itemList.map((item, index) => (
                  <QDraggableRow
                    key={index}
                    item={item}
                    index={index}
                    isDraggingAny={isDraggingAny}
                    handleRemoveQuestion={handleRemoveQuestion}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <></>
      )}
      <div className="text-gray-600 flex">
        <input
          ref={questionRef}
          className="input-basic w-6/12 my-1 mx-1"
        />
        <DropdownBtn
          ref={typeRef}
          options={["Text", "Options", "Date"]}
          className="w-2/12 flex item-center justify-center h-9 my-1"
        />
        <div className="w-2/12 flex justify-center my-auto">
          <SwitchBtn ref={requiredRef} />
        </div>
        <div className="w-2/12 flex item-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="2 3 20 20"
            stroke="currentColor"
            className="w-6 transform hover:text-teal-600 hover:scale-110 hover:cursor-pointer"
            onClick={handleAddQuestion}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div
        id="button-group"
        className="flex justify-end items-center translate-y-5 translate-x-2"
      >
        <button
          type="button"
          className="text-gray-600 bg-gray-100 hover:bg-teal-500 hover:text-white font-medium rounded-full text-sm px-5 py-2.5 text-center m-1"
          onClick={handleSave}
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
    </div>
  );
}

export default QTable;
