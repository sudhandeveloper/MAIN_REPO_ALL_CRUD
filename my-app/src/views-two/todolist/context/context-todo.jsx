// context-todo.js
import React, { createContext, useContext, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState(""); // Initialize title as an empty string

  return (
    <TodoContext.Provider value={{ todos, setTodos, title, setTitle }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
