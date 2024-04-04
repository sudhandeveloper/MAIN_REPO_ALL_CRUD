// todo.jsx
import React from "react";
import { useTodoContext } from "../context/context-todo";
import { useState } from "react";

// Import TodoContext

const Todo = (props) => {
  const { todos, setTodos } = useTodoContext();
  
  const [editing, setEditing] = useState(false);
  
  const [editedTitle, setEditedTitle] = useState(props.title);
  
  const todoId = props.id;
  const handleCheckboxChange = (e) => {
    // Assuming props.id contains the id of the todo item
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: e.target.checked } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("items", JSON.stringify(updatedTodos));
  };

  const handleDelete = () => {
    // Remove the item from localStorage by key
    localStorage.removeItem(todoId);
  
    // Filter out the todo item with the specified id
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
  
    // Update the todos state with the filtered array
    setTodos(filteredTodos);
  
    // Update local storage with the filtered array
    localStorage.setItem("items", JSON.stringify(filteredTodos));
  };
  // --------------------------------------------
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === props.id ? { ...todo, title: editedTitle } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("items", JSON.stringify(updatedTodos));
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTitle(props.title); // Reset the edited title to the original title
  };
  return (
    <>
    <div className="flex items-center justify-between px-6 py-3 mt-10">
      <input
        type="checkbox"
        checked={props.completed}
        onChange={handleCheckboxChange}
      />

      
      {editing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <div>{props.title}</div>
      )}

      
      {editing ? (
        <>
          <button
            className="px-5 py-2 text-white bg-green-500 rounded-lg"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="p-2 text-white bg-green-500 rounded-lg"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="px-5 py-2 text-white bg-green-500 rounded-lg"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="p-2 text-white bg-green-500 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      )}
    </div>
    
    {props.completed ? "Checked" : "  "}
  </>
  );
};

export default Todo;
