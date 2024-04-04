// import React from 'react';

// export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {

//   return (
//     <ul>
//       {tasks.map((task) => (
//         <li key={task.id}>
//           <input
//             type="checkbox"
//             checked={task.done}
//             onChange={() => onChangeTask({ ...task, done: !task.done })}
//           />
//           <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
//             {task.text}
//           </span>
//           <button onClick={() => onDeleteTask(task.id)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   );
// }
import React from "react";
import Task from "./Task";

const TaskList = ({tasks,onChangeTask,onDeleteTask}) => {
  return (
    <>
    <ul>
      {tasks.map(task => (
        <li className="mb-5 bg-white rounded-md shadow-md shadow-gray-800" key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
   
    </>

  );
};

export default TaskList;
