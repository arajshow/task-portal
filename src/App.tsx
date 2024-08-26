import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "./redux/store";
import { addTask, removeTask} from "./redux/slice/taskSlice";
import { addColumn, addTaskToColumn, removeTaskFromColumn, moveTask } from './redux/slice/columnSlice';
import './App.css'
import Modal from './Components/Modal';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  // Access tasks from the Redux store
  const tasks = useSelector((state: RootState) => state.tasks);

  // Access columns from the Redux store
  const columns = useSelector((state: RootState) => state.columns);

  // Example function to add a new task
  const handleAddTask = () => {
    const newTask = {
      id: new Date().toISOString(), // Use a timestamp as a unique ID
      taskTitle: 'New Task',
      taskDescription: 'Description of the new task',
    };
    dispatch(addTask(newTask)); // Dispatch the addTask action
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Heading Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Personal</h1>
        <p className="text-sm text-gray-600">A journal to manage your personal tasks</p>
      </div>

      {/* Search and Buttons Section */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="border border-gray-800 bg-white rounded px-4 py-2 w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setModalValue("task")
              setIsModalOpen(true)
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Add Task
          </button>
          <button
            onClick={() => {
              setModalValue("column")
              setIsModalOpen(true)
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Column
          </button>
        </div>
      </div>

      {/* Columns Section */}
      <div className="flex gap-4">
        {Object.entries(columns).map(([columnName, columnContent]) => (
          <div key={columnName} className="bg-green-100 p-4 rounded shadow-md w-1/4">
            <h3 className="text-lg font-semibold mb-2">
              {columnName} ({columnContent.columnTasks.length})
            </h3>
            <ul className="space-y-2">
              {columnContent.columnTasks.map((taskId) => {
                const task = tasks.find((t) => t.id === taskId);
                return task ? (
                  <li key={task.id} className="bg-white p-2 rounded shadow-sm">
                    <h4 className="font-bold">{task.taskTitle}</h4>
                    <p className="text-sm text-gray-600">{task.taskDescription}</p>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal for Adding Task */}
      <Modal isOpen={isModalOpen} modalValue={modalValue} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
