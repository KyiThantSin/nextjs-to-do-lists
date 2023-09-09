"use client";
/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { css } from "@emotion/react";
import { Button } from "reactstrap";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(Auth, email, password)
        .then((user) => {
          console.log("login res", user.user.uid)
          setEmail('');
          setPassword('');
          router.push(`/lists/${user.user.uid}`)
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <section>
      <div css={styles.container}>
        <h4>Welcome</h4>
        <form css={styles.formStyle} onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              aria-label="email"
              value={email}
              required
              css={styles.inputStyle}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              aria-label="password"
              value={password}
              required
              css={styles.inputStyle}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p css={styles.errorMsg}>{error}</p>}
          <section css={styles.floatEnd}>
            <Button id="login-btn" name="login-btn" color="primary" type="submit">
              Log in
            </Button>
          </section>
        </form>
      </div>
    </section>
  );
};

export default Login;

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:90px;
  `,
  formStyle: css`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
    width: 30%;

    @media (max-width: 1000px) {
      width: 90%;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 9px;
    }

    label {
      color: #4e4f4f;
      font-weight: 500;
      font-size: 20px;
    }

    span {
      color: red;
    }
  `,
  errorMsg: css`
    color: red;
    font-size: 14px;
    font-weight: 500;
    text-wrap: wrap;
  `,
  floatEnd: css`
    display: flex;
    margin-top: 9px;
    justify-content: flex-end;
  `,
  inputStyle: css`
    border-radius: 9px;
    border: 0.9px solid #aaacac;
    outline: none;
    color: #4e4f4f;
    padding: 9px;
  `,
};
