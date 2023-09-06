import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async () => {
    const {request} = useHttp();
    return await request('http://localhost:3001/heroes');
  }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroCreated: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
      // state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
      // state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
        // state.heroes = action.payload;
      })
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  }
});

export default heroesSlice.reducer;
export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted,
} = heroesSlice.actions;

