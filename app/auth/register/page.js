"use client";
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { css } from "@emotion/react";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  //validate email
  useEffect(() => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email && !emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }, [email]);

  //validate password
  useEffect(() => {
    if (password || confirmPassword) {
      if ((password && password.length < 6) || password?.includes(" ")) {
        setPasswordError(
          "Password must be at least 6 characters long and not include space."
        );
      } else if (confirmPassword && password !== confirmPassword) {
        setPasswordError("Password does not match!");
      } else if (password && password.length > 12) {
        setPasswordError("Password must be at most 12 characters long");
      } else {
        setPasswordError("");
      }
    }
  }, [confirmPassword, password]);

  const onCreateHandler = (e) => {
    e.preventDefault();
    if (email && password && confirmPassword && password === confirmPassword) {
      createUserWithEmailAndPassword(Auth, email, password, name)
        .then((user) => {
          toast("Account Created!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false, 
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setEmail("");
          setName("");
          setPassword("");
          setConfirmPassword("");
          //console.log("Success. The user is created in Firebase");
          router.push(`/lists/${user.user.uid}`);
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <section>
      <div css={styles.container}>
        <h4>Create Account</h4>
        <form css={styles.formStyle} onSubmit={onCreateHandler}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              aria-label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              css={styles.inputStyle}
            />
          </div>
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
              onChange={(e) => setEmail(e.target.value)}
              css={styles.inputStyle}
              required
            />
            {emailError && <p css={styles.errorMessage}>{emailError}</p>}
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
              onChange={(e) => setPassword(e.target.value)}
              css={styles.inputStyle}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">
              Confirm Password <span>*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              aria-label="confirmPassword"
              value={confirmPassword}
              css={styles.inputStyle}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordError && <p css={styles.errorMessage}>{passwordError}</p>}
          </div>
          {error && <p css={styles.errorMessage}>{error}</p>}
          <section css={styles.floatEnd}>
            <Button
              id="register"
              name="register"
              type="submit"
              css={styles.btn}>
              Register
            </Button>
          </section>
        </form>
      </div>
    </section>
  );
};

export default Register;

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
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
      color: #000;
      font-weight: 500;
      font-size: 18px;
    }

    span {
      color: red;
    }
  `,
  errorMessage: css`
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
    color: #000;
    padding: 9px;
  `,
  btn: css`
    background: #000;
    padding: 6px;
    border: none;

    &:hover {
      cursor: pointer;
      background: #000;
    }
  `,
};
