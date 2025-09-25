import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import filtersSlice from './slices/filtersSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    filters: filtersSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;