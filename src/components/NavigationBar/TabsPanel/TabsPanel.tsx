import { styled } from "styled-components";

const Tabs = styled.div`
  display: flex;
  justify-content: space-beetwen;
  align-items: center;
`;

const Tab = styled.p`
  color: #97979b;
  font-size: 15px;
  margin-right: 10px;
  cursor: pointer;

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    border-bottom: #6534ff;
  }
`;

export const TabsPanel = () => {
  const jobs = ["Все", "Designers", "Analysts", "Managers", "IOS", "Android"];

  return (
    <Tabs>
      {jobs.map((job) => (
        <Tab>{job}</Tab>
      ))}
    </Tabs>
  );
};
