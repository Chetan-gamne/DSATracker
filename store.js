import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import SolvedReducer from "./slices/solvedProblemSlice";
import NotificationReducer from "./slices/NotificationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    solvedProblem: SolvedReducer,
    notification: NotificationReducer,
  },
});
