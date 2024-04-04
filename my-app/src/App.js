import "./App.css";
import { NewTodoContextProvider } from "./view-three-Reducer-context/conext/contex";
// import { TodoRedrContexts } from "./view-three-Reducer-context/context-reducer/context";
import Pageone from "./view-three-Reducer-context/page/Pageone";

import "./views/components/todolist/todolist.css";
import Addtodo from "./views-two/todolist/components/Addtodo";
import { TodoContextProvider } from "./views-two/todolist/context/context-todo";
import Todolists from "./views-two/todolist/components/todolis";
import Todolist from "./views/components/todolist/todo-list.jsx";
import PageOne from "./views/pages/page-one.jsx";
import CrudOperation from "./views/components/curd-form/crud-operation.jsx";
import CrudformTwo from "./views/components/crud-form-2/CrudformTwo.jsx";
function App() {
  return (
    <>
      <Todolist />
      <div className="flex flex-col items-center justify-center p-10 mt-10 bg-gray-800 h-fit">
        <div className="p-10 text-white bg-gray-700 rounded-md shadow-md shadow-white">
          <h1 className="text-3xl">TODO LIST</h1>
          <TodoContextProvider>
            <Addtodo />
            <Todolists />
          </TodoContextProvider>
        </div>
      </div>
      <CrudformTwo />
      <NewTodoContextProvider>
        <Pageone />
      </NewTodoContextProvider>
    </>
  );
}

export default App;
