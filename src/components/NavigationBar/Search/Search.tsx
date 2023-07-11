import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserItem,
  filterByAlphabeticalSort,
  filterByBirthdaySort,
  setFilteredList,
} from "../../../redux/users-slice";
import { debounce } from "lodash";
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

export const Search = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const usersAll = useSelector((state: any) => state.users.users);
  const userList = usersAll.list;
  const [searchValue, setSearchValue] = useState(" ");

  const filteredList = useSelector((state: any) => state.users.filteredList);
  const user = userList.find((item: any) => item.id);
  const [alphabeticalSort, setAlphabeticalSort] = useState(false);
  const [birthdaySort, setBirthdaySort] = useState(false);

  // console.log("user", user);
  const handleAlphabeticalSort = () => {
    dispatch(filterByAlphabeticalSort(!alphabeticalSort));
  };

  const handleBirthdaySort = () => {
    dispatch(filterByBirthdaySort(!birthdaySort));
  };

  const searchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const debouncedSearchUser = debounce(() => {
      const filteredList = userList.filter(
        (user: UserItem) =>
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase()) ||
          user.department.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setFilteredList(filteredList));
    }, 1000);

    debouncedSearchUser();

    return debouncedSearchUser.cancel;
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
        <Input
          onChange={searchUser}
          value={searchValue}
          placeholder="Введите имя, тег, почту..."
        />
        <MenuIcon onClick={handleModal} />
      </InputWrapper>
      <ModalWrapper show={showModal}>
        <Modal>
          <ModalTop>
            <ModalTitle>Сортировка</ModalTitle>
            <ModalClose onClick={handleModal}>x</ModalClose>
          </ModalTop>
          <Tab>
            <Checkbox onClick={() => handleAlphabeticalSort()}/>
            <TabName>По алфавиту</TabName>
          </Tab>
          <Tab>
            <Checkbox onClick={() => handleBirthdaySort()}/>
            <TabName>По дню рождения</TabName>
          </Tab>
        </Modal>
      </ModalWrapper>
    </>
  );
};
