import { styled } from "styled-components";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { UserList } from "./UserList/UserList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./NotFound/NotFound";
import { UserDetails } from "./UserList/UserDetails/UserDetails";
import { usersAll } from "../redux/users-slice";
import { useSelector } from "react-redux";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const UserListPage = () => {
  return (
    <Container>
      <NavigationBar />
      <UserList />
    </Container>
  );
};

export const HomePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/user-details/:userId" element={<UserDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
