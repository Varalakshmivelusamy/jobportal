
import { createSlice } from '@reduxjs/toolkit';

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: {
    searchQuery: '',
    showApplySuccess: false,
    currentPage: 1,
    jobsPerPage: 6,
    totalPages: 1,
    selectedJob: null,
    jobs: [],
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setShowApplySuccess: (state, action) => {
      state.showApplySuccess = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setJobsPerPage: (state, action) => {
      state.jobsPerPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setShowApplySuccess,
  setCurrentPage,
  setJobsPerPage,
  setTotalPages,
  setSelectedJob,
  setJobs,
} = mainPageSlice.actions;

export const selectMainPage = (state) => state.mainPage;
export default mainPageSlice.reducer;
