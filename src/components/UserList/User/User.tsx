import { styled } from "styled-components";
import avatar from "../../../images/avatar.png";
import icon from "../../../images/plug.png";

const UserWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  margin-right: 16px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

const UserTextWrapper = styled.div``;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  margin: 0 10px 0 0;
`;

const UserInital = styled.span`
  color: #ccc;
`;

const UserJob = styled.p`
  color: #7d7d7d;
`;

interface UserProps {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  birthday: string;
  phone: string;
}

export const User: React.FC<UserProps> = ({
  avatarUrl,
  firstName,
  lastName,
  department,
  position,
  birthday,
  phone,
}) => {
  return (
    <UserWrapper>
      <UserImg
        src={
          avatarUrl === "https://api.lorem.space/image/face?w=120&h=120"
            ? icon
            : ""
        }
      />
      <UserTextWrapper>
        <UserNameWrapper>
          <UserName>
            {firstName} {lastName}
          </UserName>
          <UserInital>
            {firstName[0]}
            {lastName[0]}
          </UserInital>
        </UserNameWrapper>
        <UserJob>{department}</UserJob>
      </UserTextWrapper>
    </UserWrapper>
  );
};
