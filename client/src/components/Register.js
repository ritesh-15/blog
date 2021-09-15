import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { apiCheckEmail, apiRegister } from "../api/axios";
import userContext from "../context/user/userContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const checkEmail = async () => {
    try {
      const { data } = await apiCheckEmail(email);
      setError("");
    } catch (error) {
      setError("Email id already exists!");
    }
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill information!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await apiRegister({ name, email, password });

      setUser(data.user);

      setLoading(false);
      setError("");
    } catch (error) {
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <Container>
      <form>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            value={email}
            onBlur={checkEmail}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Email address"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
          />
        </div>
        {error && <p>{error}</p>}
        <div>
          <button disabled={error || loading ? true : false} onClick={register}>
            {!loading ? "Register" : "Verifying..."}
          </button>
        </div>
      </form>
    </Container>
  );
}

export default Register;
const Container = styled.div`
  padding: 1rem;

  form {
    width: 100%;

    a {
      color: var(--primary);
      font-weight: 500;
    }

    button {
      padding: 0.8rem 2rem;
      background: var(--primary);
      border: none;
      outline: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 1rem;
      display: block;
      margin-left: auto;
      color: #fff;
      font-weight: 600;

      &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
      }
    }

    p {
      color: red;
    }

    div {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        width: 100%;
        padding: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.2);
        outline: none;
        font-size: 1rem;
        font-family: inherit;
        border-radius: 3px;

        &:focus-within {
          border-color: var(--primary);
        }
      }
    }
  }
`;
