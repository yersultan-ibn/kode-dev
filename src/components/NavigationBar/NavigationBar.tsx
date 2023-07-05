import { styled } from "styled-components";
import { Search } from "./Search/Search";
import { TabsPanel } from "./TabsPanel/TabsPanel";

const Title = styled.h1`
  font-size: 30px;
`;

// interface NavigationBarProps {
//   userList: any; // Replace 'any' with the actual type of the 'userList' prop
// }
export const NavigationBar = (): any => {
  return (
    <>
      <Title>Поиск</Title>
      <Search />
      <TabsPanel />
    </>
  );
};
