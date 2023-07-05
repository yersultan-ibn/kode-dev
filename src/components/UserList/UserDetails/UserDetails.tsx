import { styled } from "styled-components";
import avatar from "../../../images/details-avatar.png";
import arrow from "../../../images/left-arrow.png";

import { AiOutlineStar, AiOutlinePhone } from "react-icons/ai";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const Arrow = styled(MdOutlineKeyboardArrowLeft)`
  font-size: 30px;
  cursor: pointer;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Top = styled.div`
  background: #f7f7f8;
  padding: 60px 0px 30px 0px;
`;

const User = styled.div`
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 100px;
  margin: auto; /* Center the image horizontally */
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.p`
  margin-right: 10px;
  text-align: center;
`;

const Initial = styled.span`
  color: #ccc;
  text-align: center;
`;

const Job = styled.p`
  color: #55555c;
  text-align: center;
`;

const Wrapper = styled.div``;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Start = styled.div`
  display: flex;
  align-items: center;
`;

const TextIcon = styled(AiOutlineStar)`
  font-size: 20px;
  margin-right: 10px;
`;

const Description = styled.p``;

const Age = styled.span`
  color: #ccc;
`;

export const UserDetails = () => {
  return (
    <>
      <Top>
        <Container>
          <Link to="/">
            <Arrow />
          </Link>
        </Container>
        <User>
          <Icon src={avatar} />
          <UserName>
            <Name>Алиса Иванова</Name>
            <Initial>ai</Initial>
          </UserName>
          <Job>Designer</Job>
        </User>
      </Top>
      <Wrapper>
        <Container>
          <Text>
            <Start>
              <TextIcon as={AiOutlineStar}></TextIcon>
              <Description>5 июна 1996</Description>
            </Start>
            <Age>24 года</Age>
          </Text>
          <Text>
            <Start>
              <TextIcon as={AiOutlinePhone}></TextIcon>
              <Description>+7 (999) 900 90 90</Description>
            </Start>
          </Text>
        </Container>
      </Wrapper>
    </>
  );
};
