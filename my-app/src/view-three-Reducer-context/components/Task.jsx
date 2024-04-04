import React, { useState } from "react";

const Task = ({ task, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = (e) => {
    onChange({
      ...task,
      done: e.target.checked,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-3">
        <div>
          {" "}
          <input
            type="checkbox"
            checked={task.done}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="">
          {isEditing ? (
            <>
              <td className="ml-10 border-black border-3">
                <input
                  value={task.text}
                  onChange={(e) => {
                    onChange({
                      ...task,
                      text: e.target.value,
                    });
                  }}
                />
              </td>
              <td>
                <button
                  className="px-3 ml-3 text-white bg-red-500 border-2 border-black"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </td>
            </>
          ) : (
            <>
              <span className="ml-10">{task.text}</span>

              <button
                className="px-3 ml-3 mr-3 text-white bg-red-500 border-2 border-black"
                onClick={handleEditClick}
              >
                Edit
              </button>

              <button
                className="px-3 text-white bg-red-500 border-2 border-black"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Task;
