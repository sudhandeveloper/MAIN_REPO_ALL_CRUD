// Addtodo.js
import React, { useEffect } from "react";
import { useTodoContext } from "../context/context-todo";
import { v4 as uuidv4 } from "uuid";

const Addtodo = () => {
  const { title, setTitle, todos, setTodos } = useTodoContext();

  const handleOnChange = (e) => {
    setTitle(e.target.value); // Update title state with input value
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodoItem = {
      id: uuidv4(),
      title: title,
      completed:false,
    };
    const updatedTodoArr = [...todos, newTodoItem];
    localStorage.setItem("items", JSON.stringify(updatedTodoArr));
    setTodos(updatedTodoArr);
    setTitle("");
  };

  return (
    <div className="flex mt-10">
      <input
        type="text"
        className="p-2 rounded-lg outline-none"
        placeholder="Enter data"
        value={title} // Bind input value to title state
        onChange={handleOnChange} // Call handleOnChange when input changes
      />
      <button
        className="p-2 ml-2 text-white bg-green-500 rounded-lg"
        onClick={addTodo}
      >
        Add Data
      </button>
    </div>
  );
};

export default Addtodo;
