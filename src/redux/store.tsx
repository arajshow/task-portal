import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "./slice/taskSlice"
import columnReducer from "./slice/columnSlice"

// Configure the Redux store with the reducers
const store = configureStore({
  reducer: {
    tasks: taskReducer,   // Add taskReducer under the 'tasks' key
    columns: columnReducer,  // Add columnReducer under the 'columns' key
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {tasks: TaskState, columns: ColumnState}
export type AppDispatch = typeof store.dispatch;

export default store;
