import { AddOutlined } from "@material-ui/icons";
import styled from "styled-components";

const NewBlog = () => {
  return (
    <Container>
      <Image>
        <img src="https://source.unsplash.com/1600x900/?nature,water" alt="" />
        <div>
          <AddOutlined style={{ color: "#fff", fontSize: "1.8rem" }} />
        </div>
      </Image>

      <Title>
        <textarea placeholder="Title" />
      </Title>

      <Description>
        <textarea placeholder="Write your content here..."></textarea>
      </Description>
    </Container>
  );
};

export default NewBlog;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 1300px;
  padding-top: 1rem;
`;

const Image = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  animation: loading linear infinite 1s alternate-reverse;

  @media (max-width: 768px) {
    height: 200px;
  }

  div {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
    transition: all 250ms ease-in;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  margin-top: 1rem;
  width: 100%;

  textarea {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    padding: 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    resize: none;
    border-radius: 10px;

    &:focus {
      border-color: var(--primary);
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Description = styled.div`
  margin-top: 1rem;

  textarea {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    height: max-content;
    resize: none;
    border-radius: 10px;

    &:focus {
      border-color: var(--primary);
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
