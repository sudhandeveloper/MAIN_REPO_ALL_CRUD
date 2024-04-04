// context-todo.js
import React, { createContext, useContext, useReducer, useState } from "react";
import { initialState, reducer,  } from "../reduce/reducer";

export const NewodoContext = createContext();

export const NewTodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewodoContext.Provider value={{state, dispatch}} >
      {children}
    </NewodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(NewodoContext);
