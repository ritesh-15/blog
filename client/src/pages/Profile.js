import { useContext } from "react";
import styled from "styled-components";
import { apiLogOut } from "../api/axios";
import Blogs from "../components/Blogs";
import userContext from "../context/user/userContext";

function Profile() {
  const { user, setUser } = useContext(userContext);

  const logOut = async () => {
    try {
      const { data } = await apiLogOut();
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Details>
        <Image>
          <img
            src="https://source.unsplash.com/1600x900/?nature,water"
            alt=""
          />
        </Image>
        <Info>
          <h1>{user.name}</h1>
          <h3>{user.email}</h3>
          <div>
            <button>Update Profile</button>
            <button onClick={logOut}>Log out</button>
          </div>
        </Info>
      </Details>

      <Blogs />
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  width: 95%;
  max-width: 1300px;
  margin: 1rem auto;
`;

const Details = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Image = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    cursor: pointer;
    height: 100%;
  }
`;

const Info = styled.div`
  margin-left: 2rem;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.7rem 2rem;
    background: transparent;
    border: none;
    border-radius: 3px;
    color: rgba(255, 0, 0, 0.7);
    cursor: pointer;
    font-size: 1rem;
    border: 1px solid rgba(255, 0, 0, 0.7);
    transition: all 0.25s ease-in;
    font-weight: 500;

    &:first-child {
      background: var(--primary);
      border: none;
      color: #fff;
      margin-right: 1rem;

      &:hover {
        opacity: 0.7;
        background: var(--primary);
        color: #fff;
      }
    }

    &:hover {
      background: rgba(255, 0, 0, 0.7);
      color: #fff;
    }
  }

  h1 {
    font-size: 1.5rem;
    text-transform: capitalize;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;
