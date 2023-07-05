import { useDispatch, useSelector } from "react-redux";
import { User } from "./User/User";
import { loadUsers, usersAll } from "../../redux/users-slice";
import { useEffect } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";

export const UserList = (): any => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  // const userList = useSelector(usersAll);
  const usersAll = useSelector((state: any) => state.users.users);
  const filteredUserList = useSelector((state: any) => state);
  const userList = usersAll.list;
  const filteredAll = filteredUserList.users.users.filteredList;

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <>
      {filteredAll.length > 0
        ? filteredAll.map((user: any) => <User key={user.id} {...user} />)
        : userList.map((user: any) => <User key={user.id} {...user} />)}
    </>
  );
};
