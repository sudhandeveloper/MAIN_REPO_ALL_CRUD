// Todolists.js
import React, { useEffect } from "react";
import Todo from "./todo"; 
import { useTodoContext } from "../context/context-todo";

const TodoLists = () => {
  const { todos, setTodos } = useTodoContext();

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem('items');
    if (itemsFromStorage) {
      setTodos(JSON.parse(itemsFromStorage));
    }
  }, []);
  return (
    <>
      {todos.length > 0 ? (
        todos.map((item) => (
          <Todo key={item.id} id={item.id} title={item.title} completed={item.completed} />
        ))
      ) : (
        <h4>No Todos found</h4>
      )}
    </>
  );
};

export default TodoLists;
