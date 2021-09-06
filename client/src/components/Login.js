import styled from "styled-components";
import userContext from "../context/user/userContext";
import { useContext, useState, useEffect } from "react";
import { apiLogin } from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!email || !password) return;

    try {
      const { data } = await apiLogin({ email, password });

      setLoading(false);
      setUser(data.user);
    } catch (err) {
      setLoading(false);
      setError("Wrong credentials!");
    }
  };

  return (
    <Container>
      <form>
        <div>
          <input
            value={email}
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
          <a href="">Forgot password ?</a>
          <button disabled={loading ? true : false} onClick={login}>
            {!loading ? "Login" : "Verifying..."}
          </button>
        </div>
      </form>
    </Container>
  );
}

export default Login;

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
      color: #fff;
      font-weight: 600;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      &:disabled {
        opacity: 0.5;
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
