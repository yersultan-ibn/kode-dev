import { configureStore, createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

// import * as api from "../features/books/booksAPI";
import axios from "axios";
import { UserItem } from "./users-slice";
// export interface AppState {
//   users: {
//     users: {
//       status: string;
//       error: null | boolean;
//       list: UserItem[];
//     };
//   };
// }
export const store = configureStore({
  reducer: {
    users: rootReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      thunk: {
        extraArgument: {
          client: axios,
        },
      },
      serializableCheck: false,
    }),
});
