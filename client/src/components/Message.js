import { Warning } from "@material-ui/icons";
import styled from "styled-components";

const Message = ({ open, message }) => {
  return (
    <Container className={!open ? "close-message" : ""}>
      <div>
        <Warning />
        <p>{message}</p>
      </div>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  position: fixed;
  z-index: 150;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 10px;
  height: 100%;
  transition: all 250ms ease-in;

  div {
    background: #ffc31f;
    padding: 1rem;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 3px;

    p {
      margin-left: 1rem;
      font-weight: 600;
    }
  }
`;
