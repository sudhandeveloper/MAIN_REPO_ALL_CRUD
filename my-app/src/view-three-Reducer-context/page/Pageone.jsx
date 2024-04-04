// // components/Pageone.js
// import React from "react";
// import { useTodoContext } from "../conext/contex";
// import AddTask from "../components/AddTask";
// import TaskList from "../components/TaskList";
// // import { TodoRedContext } from '../context-reducer/context';
// let nextId = 3;
// const Pageone = () => {

//   const { state, dispatch } = useTodoContext();

//   console.log(state.name);

//   function handleAddTask(text) {
//     dispatch({
//       type: "added",
//       id: nextId++,
//       text: text,
//     });
//   }

//   function handleChangeTask(task) {
//     dispatch({
//       type: "changed",
//       task: task,
//     });
//   }

//   function handleDeleteTask(taskId) {
//     dispatch({
//       type: "deleted",
//       id: taskId,
//     });
//   }

//   return (
//     <>
//       <div className="justify-center pt-10 ">
//         {/* Your component JSX */}
//         <h1>Prague itinerary</h1>
//         <AddTask onAddTask={handleAddTask} />
//         <TaskList
//           tasks={state}
//           onChangeTask={handleChangeTask}
//           onDeleteTask={handleDeleteTask}
//         />{" "}
//       </div>
//       <center></center>
//     </>
//   );
// };

// export default Pageone;
import React from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useTodoContext } from "../conext/contex";
let nextId = 0;
const Pageone = () => {
  const { state, dispatch } = useTodoContext();

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }
  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }
  return (
    <>
      <div className="flex items-center justify-center w-full p-5 pt-10 ">
        <div className="items-center p-5 border-2 border-black">
          {" "}
          <label
            htmlFor=""
            className="flex items-center justify-center w-full pb-5 text-3xl font-bold"
          >
            <span>TODO APP</span>
          </label>{" "}
          <AddTask onAddTask={handleAddTask} />
          <div className="p-5 mt-5 bg-white rounded-md shadow-md shadow-gray-800">
            {" "}
            <TaskList
              tasks={state}
              onChangeTask={handleChangeTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pageone;
