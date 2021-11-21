import { createSlice } from '@reduxjs/toolkit';

export type TimeState = {
  startTime: number;
  duration: number;
  time: number;
};

const initialState: TimeState = {
  startTime: 0,
  duration: 0,
  time: 0,
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    startTimer(state) {
      state.time = 0;
      state.duration = 0;
      state.startTime = Date.now();
    },
    stopTimer(state) {
      state.duration = Date.now() - state.startTime;
    },
    tickTime: (state) => {
      state.time++;
    },
    resetTime: (state) => {
      state.time = 0;
    },
  },
});

export const { startTimer, stopTimer, tickTime, resetTime } = timeSlice.actions;

export const selectTime = (state: TimeState) => state.time;

export default timeSlice.reducer;
