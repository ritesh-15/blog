import { useState } from "react";
import styled from "styled-components";
import Login from "../components/Login";
import Register from "../components/Register";

const tabs = {
  1: Login,
  2: Register,
};

function Auth() {
  const [tab, setTab] = useState(1);

  const Component = tabs[tab];

  return (
    <Container>
      <Card>
        <Tabs>
          <button
            onClick={(e) => setTab(1)}
            className={tab == 1 ? "active-btn" : ""}
          >
            Login
          </button>
          <button
            className={tab == 2 ? "active-btn" : ""}
            onClick={(e) => setTab(2)}
          >
            Register
          </button>
        </Tabs>
        <Component />
      </Card>
    </Container>
  );
}

export default Auth;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 95%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  height: fit-content;
  margin-top: 6rem;
  border-radius: 10px;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  button {
    width: 100%;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.02);
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1rem;
    border-top: 5px solid transparent;
  }
`;
