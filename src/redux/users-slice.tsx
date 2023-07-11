import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSelector,
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
    const url = `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all`;
    const response = await client.get(url);
    return response.data.items;
  }
);

interface UserState {
  status: string;
  error: null | boolean | unknown;
  list: Array<UserItem>;
  filteredList: Array<UserItem>; // Новое поле для отфильтрованного списка
  filteredUserList: Array<UserItem>; // Добавленное поле для сохранения фильтрации
}

const initialState: UserState = {
  status: "idle",
  error: null,
  list: [],
  filteredList: [], // Инициализация пустым списком
  filteredUserList: [],
};

export const usersSlice = createSlice({
  name: "@@users",
  initialState,
  reducers: {
    setFilteredList: (state, action: PayloadAction<Array<UserItem>>) => {
      state.filteredList = action.payload;
      state.filteredUserList = action.payload; // Сохранение фильтрованного списка
    },
    resetFilteredList: (state) => {
      state.filteredList = state.list;
      state.filteredUserList = state.list; // Сброс фильтрованного списка
    },
    filterByAlphabeticalSort: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        // Отфильтровать список пользователей по алфавиту
        state.filteredList = state.list.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
      } else {
        // Сбросить фильтр по алфавиту
        state.filteredList = [];
      }
    },
    filterByBirthdaySort: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        // Отфильтровать список пользователей по дню рождения
        state.filteredList = state.list.sort(
          (a, b) =>
            new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
        );
      } else {
        // Сбросить фильтр по дню рождения
        state.list = [];
      }
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

export const usersAll = (state: any) => state.users.list;

export const {
  filterByAlphabeticalSort,
  filterByBirthdaySort,
  setFilteredList,
} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectUsers = (state: any) => state.users.list;

export const selectFilteredUsers = (state: any) => state.users.filteredList;

export const selectFilteredUsersByDepartment = (department: any) =>
  createSelector(selectFilteredUsers, (users: any) =>
    users.filter((user: any) => user.department === department)
  );
