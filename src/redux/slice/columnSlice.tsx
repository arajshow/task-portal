import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of each column's content
interface ColumnContent {
  columnTasks: string[]; // Array of task IDs
  columnCount: number;
}

// Define the shape of the entire slice state
interface ColumnState {
  [key: string]: ColumnContent;
}

// Initial state with predefined columns and randomly distributed tasks
const initialState: ColumnState = {
  "Not Started": {
    columnTasks: ['1', '3'], // Example task IDs assigned to this column
    columnCount: 2,
  },
  "In Progress": {
    columnTasks: ['2'], // Example task IDs assigned to this column
    columnCount: 1,
  },
  "Blocked": {
    columnTasks: [], // No tasks initially
    columnCount: 0,
  },
  "Done": {
    columnTasks: ['4'], // Example task IDs assigned to this column
    columnCount: 1,
  },
};

// Create the column slice
const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<{ columnName: string }>) => {
      const { columnName } = action.payload;

      // Check if the column already exists
      if (!state[columnName]) {
        state[columnName] = { columnTasks: [], columnCount: 0 };
      } else {
        console.error(`Column with name "${columnName}" already exists.`);
      }
    },
    addTaskToColumn: (state, action: PayloadAction<{ columnName: string; taskId: string }>) => {
      const { columnName, taskId } = action.payload;
      if (state[columnName]) {
        if (!state[columnName].columnTasks.includes(taskId)) {
          state[columnName].columnTasks.push(taskId);
          state[columnName].columnCount = state[columnName].columnTasks.length;
        } else {
          console.error(`Task with ID "${taskId}" is already in column "${columnName}".`);
        }
      } else {
        console.error(`Column with name "${columnName}" does not exist.`);
      }
    },
    removeTaskFromColumn: (state, action: PayloadAction<{ columnName: string; taskId: string }>) => {
      const { columnName, taskId } = action.payload;
      if (state[columnName]) {
        state[columnName].columnTasks = state[columnName].columnTasks.filter(id => id !== taskId);
        state[columnName].columnCount = state[columnName].columnTasks.length;
      } else {
        console.error(`Column with name "${columnName}" does not exist.`);
      }
    },
    moveTask: (state, action: PayloadAction<{ fromColumn: string; toColumn: string; taskId: string }>) => {
      const { fromColumn, toColumn, taskId } = action.payload;
      if (state[fromColumn] && state[toColumn]) {
        // Remove task from the original column
        state[fromColumn].columnTasks = state[fromColumn].columnTasks.filter(id => id !== taskId);
        state[fromColumn].columnCount = state[fromColumn].columnTasks.length;

        // Add task to the new column
        state[toColumn].columnTasks.push(taskId);
        state[toColumn].columnCount = state[toColumn].columnTasks.length;
      } else {
        console.error(`One of the columns does not exist.`);
      }
    },
  },
});

// Export actions for use in components
export const { addColumn, addTaskToColumn, removeTaskFromColumn, moveTask } = columnSlice.actions;

// Export the reducer to configure the store
export default columnSlice.reducer;
