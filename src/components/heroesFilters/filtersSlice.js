import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
};

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () => {
    const {request} = useHttp();
    return await request("http://localhost:3001/filters");
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = "idle";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  }
});

export default filtersSlice.reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = filtersSlice.actions;
