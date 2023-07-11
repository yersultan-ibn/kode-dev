import { styled } from "styled-components";
import avatar from "../../../images/details-avatar.png";
import arrow from "../../../images/left-arrow.png";
import icon from "../../../images/plug.png";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AiOutlineStar, AiOutlinePhone } from "react-icons/ai";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../../redux/users-slice";
import { useEffect } from "react";
import { NetworkStatus } from "../../NavigationBar/NetworkStatus/NetworkStatus";

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
  const { userId } = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const usersAll = useSelector((state: any) => state.users.users.list);
  const user = usersAll.find((item: any) => item.id === userId);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const formatPhoneNumber = (phoneNumber: any) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");

    const formattedNumber =
      "+7 " +
      cleanedNumber.slice(1, 4) +
      " " +
      cleanedNumber.slice(4, 7) +
      " " +
      cleanedNumber.slice(7, 9) +
      " " +
      cleanedNumber.slice(9, 11);

    return formattedNumber;
  };

  const calculateAge = (birthday: any) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formattedPhone = formatPhoneNumber(user.phone);
  const age = calculateAge(user.birthday);

  return (
    <>
      <NetworkStatus />
      <Top>
        <Container>
          <Link to="/">
            <Arrow />
          </Link>
        </Container>
        <User>
          <Icon src={icon} />
          <UserName>
            <Name>
              {user.firstName} {user.lastName}
            </Name>
            <Initial>
              {user.firstName[0].toLowerCase()}
              {user.lastName[0].toLowerCase()}
            </Initial>
          </UserName>
          <Job>{user.department}</Job>
        </User>
      </Top>
      <Wrapper>
        <Container>
          <Text>
            <Start>
              <TextIcon as={AiOutlineStar}></TextIcon>
              <Description>{user.birthday}</Description>
            </Start>
            <Age>{age} года</Age>
          </Text>
          <Text>
            <Start>
              <TextIcon as={AiOutlinePhone}></TextIcon>
              <Description>{formattedPhone}</Description>
            </Start>
          </Text>
        </Container>
      </Wrapper>
    </>
  );
};
