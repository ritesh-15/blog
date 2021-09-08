import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { apiForgotPassword } from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendLink = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      const { data } = await apiForgotPassword({ email });
      console.log(data);
    } catch (err) {
      setError("Something went wrong please try again!");
    }
  };

  return (
    <Container>
      <form>
        <h1>Forgot password</h1>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Email address"
          />
        </div>

        <h5>Forgot password link is sent to your email</h5>
        {error && <p>{error}</p>}

        <div>
          <Link to="/login">Login</Link>
          <button onClick={sendLink}>Send Link</button>
        </div>
      </form>
    </Container>
  );
}

export default ForgotPassword;

const Container = styled.div`
  padding: 1rem;
  width: 95%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 6rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  form {
    width: 100%;

    h1 {
      margin-bottom: 1rem;
      font-weight: 600;
    }

    h5 {
      color: green;
      margin-bottom: 1rem;
    }

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
