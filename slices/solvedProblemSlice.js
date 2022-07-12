import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  solved: [],
};

export const solvedSlice = createSlice({
  name: "solved",
  initialState,
  reducers: {
    addProblem: (state, action) => {
      let indexOfProblem = state.solved.indexOf(action.payload);
      if (indexOfProblem == -1) {
        console.log("Adding to cart");
        state.solved = [...state.solved, action.payload];
      } else {
        console.log("removing from cart");
        state.solved = state.solved.filter((item) => item != action.payload);
      }
      console.log("New State : ", state.solved);
    },
    removeProblem: (state, action) => {
      state.solved = state.solved.filter((item) => item != action.payload);
    },
  },
});

export const { addProblem, removeProblem } = solvedSlice.actions;
export const selectProblemSolved = (state) => state.solvedProblem.solved;

export default solvedSlice.reducer;
