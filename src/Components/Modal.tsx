import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slice/taskSlice';
import { addColumn, addTaskToColumn } from '../redux/slice/columnSlice';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";

interface ModalProps {
  isOpen: boolean;
  modalValue: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalValue }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [columnName, setColumnName] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalValue !== "task") {
      const newColumnName = columnName;
      if (!newColumnName) return;

      dispatch(addColumn({ columnName: newColumnName }));
      onClose();
      return;
    }

    const newTask = {
      id: (tasks.length + 1).toString(), // Generate ID based on length of tasks array
      taskTitle,
      taskDescription,
    };

    // Add task to tasks slice
    dispatch(addTask(newTask));

    // Add task to "Not Started" column
    dispatch(addTaskToColumn({ columnName: 'Not Started', taskId: newTask.id }));

    // Close the modal
    onClose();
  };

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded w-1/3">
          <h2 className="text-xl font-bold mb-4">
            {modalValue === "task" ? "Add New Task" : "Add Column"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="taskTitle">
                {modalValue === "task" ? "Task Title" : "Enter Column Name"}
              </label>
              <input
                type="text"
                id={modalValue === "task" ? "taskTitle" : "columnName"}
                className="border border-gray-300 rounded px-3 py-2 w-full bg-white text-black"
                value={modalValue === "task" ? taskTitle : columnName}
                onChange={(e) => {
                  modalValue === "task" ? setTaskTitle(e.target.value) : setColumnName(e.target.value);
                }}
                required
              />
            </div>
            {modalValue === "task" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="taskDescription">
                  Task Description
                </label>
                <textarea
                  id="taskDescription"
                  className="border border-gray-300 rounded px-3 py-2 w-full bg-white text-black"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {modalValue === "task" ? "Add Task" : "Add Column"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
