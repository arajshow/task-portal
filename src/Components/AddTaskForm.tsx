import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux/store" // Import RootState type
import { addTask } from '../redux/slice/taskSlice';
import { addTaskToColumn } from '../redux/slice/columnSlice';

const AddTaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask = {
      id: (tasks.length + 1).toString(), // Generate ID based on length of tasks array
      taskTitle,
      taskDescription,
    };

    // Add the new task to the tasks slice
    dispatch(addTask(newTask));

    // Add the new task to the "Not Started" column
    dispatch(addTaskToColumn({ columnName: 'Not Started', taskId: newTask.id }));

    // Clear the form fields
    setTaskTitle('');
    setTaskDescription('');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Task Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
