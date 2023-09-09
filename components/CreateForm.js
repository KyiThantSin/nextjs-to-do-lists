"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "reactstrap";
import { db } from "@/app/firebase";
import moment from "moment";
import { UserContext } from "./AuthProvider";

const CreateForm = () => {
  const user = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (title !== "" && user) {
      await addDoc(collection(db, `${user}`), {
        userId: user,
        title: title.trim(),
        details: details,
        status: false,
        date: moment().format("MMM DD YYYY, h:mm a"),
      });
      setTitle("");
      setDetails("");
    }
  };
  return (
    <form css={styles.formStyle} onSubmit={onSubmitHandler}>
      <section
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "9px",
          fontSize: "14px",
        }}>
        <b>{moment().format("MMM DD YYYY, h:mm a")}</b>
      </section>
      <div>
        <label htmlFor="title">
          Title <span>*</span>
        </label>
        <input
          id="title"
          name="title"
          aria-label="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          css={styles.inputStyle}
          required
        />
      </div>
      <div>
        <label htmlFor="details">Details</label>
        <textarea
          id="details"
          name="details"
          aria-label="details"
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          css={styles.inputStyle}
          rows={5}
        />
      </div>
      <section
        style={{ display: "flex", justifyContent: "flex-end", margin: "9px" }}>
        <Button
          id="create"
          name="create"
          aria-label="create"
          type="submit"
          css={styles.btn}>
          Create
        </Button>
      </section>
    </form>
  );
};

export default CreateForm;

const styles = {
  formStyle: css`
    margin-top: 9px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 9px;
    background: #fbfbfb;

    div {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    label {
      color: #000;
      font-weight: 500;
      font-size: 18px;
      padding-top: 15px;
    }
    span {
      color: red;
    }
  `,
  inputStyle: css`
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0.9px solid #aaacac;
    outline: none;
    color: #000;
    padding: 9px;
    background: transparent;
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
