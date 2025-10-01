import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface PageStatus {
  currentPage: string;
  previousPage: string | null;
  history: {
    page: string;
    timestamp: string;
  }[];
  searchInput:string|null;

}

const initialState: PageStatus = {
  currentPage: "",
  previousPage: null,
  history: [],
  searchInput:null
};

const activeStatusSlice = createSlice({
  name: "activeStatus",
  initialState,
  reducers: {
    updatePageStatus: (state, action: PayloadAction<string>) => {
      const newPage = action.payload;
      const timestamp = new Date().toISOString();

      if (state.currentPage !== newPage) {
        state.previousPage = state.currentPage;
        state.currentPage = newPage;

        state.history.push({
          page: newPage,
          timestamp,
        });
      }
    },
    search: (state, action: PayloadAction<string>) => {
      state.searchInput=action.payload;
    },
    resetSearch: (state, action: PayloadAction<string>) => {
      state.searchInput=action.payload;
    },
    resetStatus: () => initialState,
  },
});

export const { updatePageStatus, resetStatus,search,resetSearch } = activeStatusSlice.actions;
export default activeStatusSlice.reducer;
