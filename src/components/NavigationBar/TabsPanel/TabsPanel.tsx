import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { UserItem, selectUsers } from "../../../redux/users-slice";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setFilteredList } from "../../../redux/users-slice";

const Tabs = styled.div`
  display: flex;
  justify-content: space-beetwen;
  align-items: center;
`;

const Tab = styled.p<{ active: boolean }>`
  color: ${({ active }) => (active ? "#6534ff" : "#97979b")};
  color: #97979b;
  font-size: 15px;
  margin-right: 10px;
  cursor: pointer;
  border-bottom: 3px solid
    ${({ active }) => (active ? "#6534ff" : "transparent")};

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    border-bottom: 3px solid #6534ff;
  }
`;

export const TabsPanel = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const usersAll = useSelector((state: any) => state.users.users);
  const userList = usersAll.list;
  const userDepartments = Array.from(
    new Set(userList.map((u: any) => u.department))
  );
  const [selectedDepartment, setSelectedDepartment] = useState("");
  // const userDepartments = userList.reduce((departments, user) => {
  //   if (!departments.includes(user.department)) {
  //     departments.push(user.department);
  //   }
  //   return departments;
  // }, []);

  const handleTabClick = (department: any) => {
    if (department === "Все") {
      // Если выбран "Все", сбросить фильтрацию и показать всех пользователей

      dispatch(setFilteredList([]));
    } else {
      // Фильтрация данных по выбранному отделу
      const filteredUsers = userList.filter(
        (user: any) => user.department === department
      );
      dispatch(setFilteredList(filteredUsers));
    }
    setSelectedDepartment(department);
  };

  return (
    <Tabs>
      <Tab
        key="all"
        onClick={() => handleTabClick("Все")}
        active={"Все" === selectedDepartment}
      >
        Все
      </Tab>
      {userDepartments.map((department: any) => (
        <Tab
          key={department.toString()}
          onClick={() => handleTabClick(department)}
          active={department === selectedDepartment}
        >
          {department}
        </Tab>
      ))}
    </Tabs>
  );
};
