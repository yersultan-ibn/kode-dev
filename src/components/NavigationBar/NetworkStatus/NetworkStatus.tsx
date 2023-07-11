import { styled } from "styled-components";
import { Container } from "../../HomePage";
import { useNetworkStatus } from "react-network-status";
import { useState, useEffect } from "react";

interface WrapperProps {
  online: boolean;
  showMessage: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background: ${(props) => (props.online ? "#00d41a" : "#f44336")};
  padding: 20px 0px;
  color: #fff;
  display: ${(props) =>
    props.showMessage
      ? "block"
      : "none"}; /* Показывать компонент только при showMessage=true */
`;

const Title = styled.h2`
  font-size: 30px;
`;

const Text = styled.p``;

export const NetworkStatus = (): JSX.Element => {
  const [networkStatus, setNetworkStatus] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState("Секундочку, гружусь...");

  const config = {
    timeout: 5000,
    interval: 1000,
  };

  useNetworkStatus((networkStatusUpdate) => {
    setNetworkStatus(networkStatusUpdate);
  }, config);

  useEffect(() => {
    if (networkStatus) {
      setText("Соединение сети активно");
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } else {
      setText("Не могу обновить данные. Проверь соединение с интернетом.");
      setShowMessage(true);
    }
  }, [networkStatus]);

  return (
    <Wrapper online={networkStatus} showMessage={showMessage}>
      <Container>
        <Title>Поиск</Title>
        <Text>{text}</Text>
      </Container>
    </Wrapper>
  );
};
