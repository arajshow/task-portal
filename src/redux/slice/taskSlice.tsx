import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a task
interface Task {
  id: string; // Unique identifier for each task
  taskTitle: string;
  taskDescription: string;
}

// Initial state for tasks: an array of tasks with unique IDs
const initialState: Task[] = [
  { id: '1', taskTitle: 'task1', taskDescription: 'description of task 1' },
  { id: '2', taskTitle: 'task2', taskDescription: 'description of task 2' },
  { id: '3', taskTitle: 'task3', taskDescription: 'description of task 3' },
  { id: '4', taskTitle: 'task1', taskDescription: 'description of task 14' },
];

// Create the task slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ id: string; taskTitle: string; taskDescription: string }>) => {
      state.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      return state.filter(task => task.id !== taskId);
    },
  },
});

// Export actions for use in components
export const { addTask, removeTask} = taskSlice.actions;

// Export the reducer to configure the store
export default taskSlice.reducer;
