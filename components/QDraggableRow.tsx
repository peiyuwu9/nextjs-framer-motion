import React, { MouseEventHandler } from "react";
// import { Draggable } from "react-beautiful-dnd";

interface Props {
  item: {
    tempId: string;
    question: string;
    type: string;
    isRequired: boolean;
  };
  index: number;
  isDraggingAny: boolean;
  handleRemoveQuestion: MouseEventHandler<HTMLDivElement>;
}

function QDraggableRow({
  item,
  index,
  isDraggingAny,
  handleRemoveQuestion,
}: Props) {
  function getItemClass(isDragging: boolean) {
    let className =
      "flex text-gray-600 text-sm font-light border-b border-gray-200";
    if (isDraggingAny && !isDragging) return className;
    className += isDragging
      ? " bg-gray-100 shadow-md"
      : " hover:bg-gray-100 hover:shadow-md";
    return className;
  }

  return (
    <Draggable key={item.tempId} draggableId={item.tempId} index={index}>
      {(provided, snapshot) => {
        // console.log(provided.draggableProps.style);
        return (
          <div
            className={getItemClass(snapshot.isDragging)}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              top: 102 + 43 * index + "px",
              left: "20px",
            }}
          >
            <div className="w-6/12 py-3 px-6 text-left">{item.question}</div>
            <div className="w-2/12 py-3 px-6 text-center">{item.type}</div>
            <div className="w-2/12 py-3 px-6 text-center text-red-500 scale-125">
              {item.isRequired && "*"}
            </div>
            <div className="w-2/12 py-3 px-6 flex item-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 mx-1 transform hover:text-teal-500 hover:scale-110 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              <svg
                id={item.tempId}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 mx-1 transform hover:text-red-500 hover:scale-110 hover:cursor-pointer"
                onClick={handleRemoveQuestion}
              >
                <path
                  id={item.tempId}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default QDraggableRow;
