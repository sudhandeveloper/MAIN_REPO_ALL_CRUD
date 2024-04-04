// import React, { useState } from 'react';

// export default function AddTask({ onAddTask }) {
//   const [text, setText] = useState('');

//   // function handleSubmit(e) {
//   //   e.preventDefault();
//   //   if (!text.trim()) return;
//   //   onAddTask(text);
//   //   setText('');
//   // }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Add new task"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button type="submit">Add Task</button>
//     </form>
//   );
// }
import React, { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          name=""
          id=""
          className="border-2 border-black"
        />
        <button
          onClick={() => {

            onAddTask(text);
            setText("");
          }}
          className="ml-3 font-bold text-white bg-red-600 border-2 border-red-900 rounded-md "
        >
          ADD DATA
        </button>
      </>
    </div>
  );
};

export default AddTask;
