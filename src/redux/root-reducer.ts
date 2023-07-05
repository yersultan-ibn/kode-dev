import { combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./users-slice";
export const rootReducer = combineReducers({
  users: usersReducer,
});
