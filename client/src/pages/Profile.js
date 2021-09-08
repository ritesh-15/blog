import { useContext, useState } from "react";
import styled from "styled-components";
import {
  apiCheckEmail,
  apiLogOut,
  apiUpdateProfile,
  apiUpdateProfileImage,
} from "../api/axios";
import Blogs from "../components/Blogs";
import userContext from "../context/user/userContext";

function Profile() {
  const { user, setUser } = useContext(userContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [error, setError] = useState("");

  const logOut = async () => {
    try {
      const { data } = await apiLogOut();
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async (e) => {
    if (name == user.name && email == user.email) {
      setError("No changes found!");
      return;
    }

    if (email != user.email) {
      try {
        await apiCheckEmail(email);
      } catch (err) {
        setError("Email id already exists!");
        return;
      }
    }

    const changes = {
      name,
      email,
    };

    console.log(changes);

    try {
      const { data } = await apiUpdateProfile(changes);
      setUser(data.user);
      setError("");
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  const changeImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formdata = new FormData();

      formdata.append("file", file);

      const { data } = await apiUpdateProfileImage(formdata);
      setUser(data.user);
    } catch (err) {}
  };

  return (
    <Container>
      <Details>
        <Image>
          <label htmlFor="image">
            <img
              src={
                !user.avatar
                  ? "https://source.unsplash.com/1600x900/?nature,water"
                  : user.avatar
              }
              alt=""
            />
          </label>
          <input
            id="image"
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={changeImage}
          />
        </Image>
        <Info>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            maxLength={20}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p>{error}</p>}
          <div>
            <button onClick={updateProfile}>Update Profile</button>
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  animation: loading linear infinite 1s alternate;
  overflow: hidden;
  margin-bottom: 1rem;

  input {
    display: none;
  }

  img {
    width: 100%;
    cursor: pointer;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }

  input {
    display: block;
    margin-bottom: 1rem;
    font-size: 1rem;
    padding: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    outline: none;
    font-weight: 600;
    width: 100%;

    &:first-child {
      text-transform: capitalize;
    }

    &:focus {
      border-color: var(--primary);
    }
  }

  p {
    margin-bottom: 1rem;
    color: red;
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
`;
