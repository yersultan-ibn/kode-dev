import { Link } from "react-router-dom";
import { styled } from "styled-components";
import icon from "../../images/nothin-found.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Icon = styled.img``;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 16px;
  text-align: center;
`;

export const NothingFound = () => {
  return (
    <Wrapper>
      <Icon src={icon} alt="Not Found Icon" />
      <Title>Мы никого не нашли</Title>
      <SubTitle>Попробуй скорректировать запрос</SubTitle>
    </Wrapper>
  );
};
