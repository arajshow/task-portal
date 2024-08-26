import React from 'react';

// Define the type for the task prop
interface TaskProps {
  task: {
    id: string;
    taskTitle: string;
    taskDescription: string;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div
      key={task.id}
      className="bg-white p-3 rounded-md shadow-sm border border-black transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <h4 className="font-bold text-left">{task.taskTitle}</h4>
      <p className="text-sm text-gray-600 text-left mt-1">{task.taskDescription}</p>
    </div>
  );
};

export default Task;
