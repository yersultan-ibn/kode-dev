import { Link } from "react-router-dom";
import { styled } from "styled-components";
import icon from "../../images/not-found-icon.png";

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

const RetryLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
`;

export const NotFound = () => {
  return (
    <Wrapper>
      <Icon src={icon} alt="Not Found Icon" />
      <Title>Какой-то сверхразум все сломал</Title>
      <SubTitle>Постараемся быстро починить</SubTitle>
      <RetryLink to="/">Попробовать снова</RetryLink>
    </Wrapper>
  );
};
