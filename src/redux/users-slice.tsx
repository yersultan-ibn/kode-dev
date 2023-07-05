import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export interface UserItem {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: string;
  position: string;
  birthday: string;
  phone: string;
}

export const loadUsers = createAsyncThunk(
  "@@users/load-users",
  async (_, { extra: { client } }: any) => {
    const url = `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__dynamic=true`;
    const response = await client.get(url);
    return response.data.items;
  }
);

interface UserState {
  status: string;
  error: null | boolean | unknown;
  list: Array<UserItem>;
  filteredList: Array<UserItem>; // Новое поле для отфильтрованного списка
}

const initialState: UserState = {
  status: "idle",
  error: null,
  list: [],
  filteredList: [], // Инициализация пустым списком
};

export const usersSlice = createSlice({
  name: "@@users",
  initialState,
  reducers: {
    setFilteredList: (state, action: PayloadAction<Array<UserItem>>) => {
      state.filteredList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = "received";
        state.list = action.payload;
      });
  },
});
export const { setFilteredList } = usersSlice.actions; // Export the setFilteredList action creator

export const usersReducer = usersSlice.reducer;
export const usersAll = (state: any) => state.users.list;
