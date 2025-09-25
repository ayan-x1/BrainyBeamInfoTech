import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterType = 'all' | 'active' | 'completed';

interface FiltersState {
  currentFilter: FilterType;
  searchQuery: string;
}

const initialState: FiltersState = {
  currentFilter: 'all',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.currentFilter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.currentFilter = 'all';
      state.searchQuery = '';
    },
  },
});

export const { setFilter, setSearchQuery, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;