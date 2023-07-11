import { useDispatch, useSelector } from "react-redux";
import { User } from "./User/User";
import { loadUsers, usersAll } from "../../redux/users-slice";
import { useEffect } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { NothingFound } from "../NothingFound/NothingFound";
import { Link } from "react-router-dom";

export const UserList = (): any => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const usersAll = useSelector((state: any) => state.users.users);
  const filteredUserList = useSelector(
    (state: any) => state.users.users?.filteredUserList
  );
  const userList = usersAll.list;

  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <>
      {filteredUserList.length > 0
        ? filteredUserList.map((user: any) => (
            <Link to={`/user-details/${user.id}`}>
              <User key={user.id} {...user} />
            </Link>
          ))
        : userList.map((user: any) => (
            <Link to={`/user-details/${user.id}`}>
              <User key={user.id} {...user} />
            </Link>
          ))}
    </>
  );
};
