import { createSlice } from '@reduxjs/toolkit';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: { teams: [], loading: false },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTeams, setLoading } = teamsSlice.actions;

export default teamsSlice.reducer;