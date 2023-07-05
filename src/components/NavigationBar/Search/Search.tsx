import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserItem, setFilteredList } from "../../../redux/users-slice";

const InputWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(BsSearch)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ccc;
`;

const MenuIcon = styled(CiMenuFries)`
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  background: #f7f7f7;
  padding: 20px 20px 20px 40px;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  ::placeholder {
    color: #ccc;
  }
`;

const ModalWrapper = styled.div<{ show: boolean }>`
  margin: 0 auto;
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0;
  bottom: 0;
  background: #636363ab;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 9999;
`;

const Modal = styled.div`
  width: 375px;
  max-width: 300px;
  margin: 100px auto;
  background: #fff;
  padding: 20px;
  border-radius: 20px;
`;

const ModalTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.p`
  text-align: center;
  width: 300px;
`;

const ModalClose = styled(GrFormClose)`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  border-radius: 50%;
  background: #f7f7f8;
  color: #ccc;
  font-size: 30px;
  cursor: pointer;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #6534ff;
  background-color: transparent;
  outline: none;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:checked {
    border: 6px solid #6534ff;
  }
`;

const TabName = styled.p``;

// interface SearchProps {
//   userList: UserItem[]; // Replace 'UserItem' with the actual type of the 'userList' prop
// }

export const Search = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const usersAll = useSelector((state: any) => state.users.users);
  const userList = usersAll.list;
  const [searchValue, setSearchValue] = useState("");


  const searchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const filteredList = userList.filter((user: UserItem) =>
      user.firstName.toLowerCase().includes(value.toLowerCase())
    );

    dispatch(setFilteredList(filteredList));
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  if (showModal === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  return (
    <>
      <InputWrapper>
        <SearchIcon />
        <Input onChange={searchUser} placeholder="Введите имя, тег, почту..." />
        <MenuIcon onClick={handleModal} />
      </InputWrapper>
      <ModalWrapper show={showModal}>
        <Modal>
          <ModalTop>
            <ModalTitle>Сортировка</ModalTitle>
            <ModalClose onClick={handleModal}>x</ModalClose>
          </ModalTop>
          <Tab>
            <Checkbox />
            <TabName>По алфавиту</TabName>
          </Tab>
          <Tab>
            <Checkbox />
            <TabName>По дню рождения</TabName>
          </Tab>
        </Modal>
      </ModalWrapper>
    </>
  );
};
