"use client";
/** @jsxImportSource @emotion/react */
import React, { useContext, useState } from "react";
import { db } from "@/app/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { css } from "@emotion/react";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Input } from "reactstrap";
import { UserContext } from "./AuthProvider";

const Card = ({ data }) => {
  const user = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(data.status);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data.title);
  const [editedDetails, setEditedDetails] = useState(data?.details);

  //console.log(data);
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `${user}`, id));
  };

  //task status
  const handleStatusChange = async (id) => {
    setIsChecked((isChecked) => !isChecked);
    if (data.title) {
      await updateDoc(doc(db, `${user}`, id), {
        ...data,
        title: editedTitle,
        details: editedDetails,
        status: !isChecked,
        date: moment().format("MMM DD YYYY, h:mm a"),
      });
    }
  };

  const handleEditItem = async (id) => {
    if (data.title) {
      await updateDoc(doc(db, `${user}`, id), {
        ...data,
        title: editedTitle,
        details: editedDetails,
        date: moment().format("MMM DD YYYY, h:mm a"),
      });
    }
    setIsEditing(false);
  };
  return (
    <div css={styles.wrapper}>
      {isChecked && <div css={styles.statusStyle}>Done</div>}
      <div css={styles.cardWrapper}>
        <div css={styles.infoWrapper}>
          <div css={styles.checkBoxStyle}>
            <Input
              type="checkbox"
              id="status"
              name="status"
              checked={isChecked}
              style={{ border: '2px solid #000' }}
              onChange={() => handleStatusChange(data.id)}
            />
          </div>
          <div css={styles.taskInfoStyle}>
            {isEditing ? (
              <input
                id="title"
                name="title"
                aria-label="title"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                css={styles.inputStyle}
              />
            ) : (
              <h5>{data.title}</h5>
            )}
            <span>{data.date}</span>
            {data && data.details && (
              <div>
                {isEditing ? (
                  <textarea
                    id="details"
                    name="details"
                    aria-label="details"
                    type="text"
                    value={editedDetails}
                    onChange={(e) => setEditedDetails(e.target.value)}
                    css={styles.inputStyle}
                    rows={3}
                  />
                ) : (
                  <p>
                    {" "}
                    <b>Details: </b> {data.details}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        <div css={styles.actions}>
          <Button
            id="update"
            name="update"
            css={styles.updateBtn}
            onClick={() => handleEditItem(data.id)}>
            Update
          </Button>
          <Button
            id="cancel"
            name="cancel"
            onClick={() => setIsEditing(false)}
            outline
            css={styles.cancelBtn}>
            Cancel
          </Button>
        </div>
      )}
      {!isEditing && (
        <div css={styles.actions}>
          <FiEdit2
            size={22}
            color="#222e50"
            css={styles.actionBtn}
            onClick={() => setIsEditing(true)}
          />
          <AiOutlineDelete
            size={22}
            color="#B50F0F"
            onClick={() => handleDelete(data.id)}
            css={styles.actionBtn}
          />
        </div>
      )}
    </div>
  );
};

export default Card;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    border: 0.6px solid lightgrey;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    flex-wrap: wrap;
    border-radius: 9px;
    background: #fbfbfb;
  `,
  cardWrapper: css`
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 1000px) {
      flex-direction: column;
    }
  `,
  infoWrapper: css`
    display: flex;
    width: 90%;
    flex-direction: row;
    gap: 9px;
    span {
      color: #929393;
    }

    p {
      display: flex;
      flex-direction: row;
      gap: 20px;
      font-size: 16px;
    }
  `,
  actionBtn: css`
    &:hover {
      cursor: pointer;
    }
  `,
  updateBtn: css`
    background: #000;
    padding: 6px;
    border: none;
    font-size: 14px;

    &:hover {
      cursor: pointer;
      background: #000;
    }
  `,
  cancelBtn: css`
    background: #fff;
    border: 1px solid #000;
    padding: 6px;
    font-size: 14px;

    &:hover {
      cursor: pointer;
      color: #000;
      background: #fff;
      border: 1px solid #000;
    }
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 100%;
    height: 5%;
    gap: 9px;

    @media (max-width: 1000px) {
      justify-content: flex-end;
    }
  `,
  inputStyle: css`
    width: 100vh;
    padding: 9px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0.9px solid #aaacac;
    background: transparent;
    outline: none;
    gap: 9px;
    color: #4e4f4f;
    @media (max-width: 1000px) {
      width: 100%;
    }
  `,
  checkBoxStyle: css`
    padding: 10px;
    font-size: 20px;

    @media (max-width: 1000px) {
      font-size: 15px;
      padding: 8px;
    }
  `,
  taskInfoStyle: css`
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
    flex-direction: column;

    p {
      margin-top: 9px;
      font-size: 16px;
    }
    span {
      margin-top: 9px;
    }
  `,
  statusStyle: css`
    margin-left: auto;
    padding: 5px;
    font-size: 14px;
    border: 0.9px solid transparent;
    background: #000;
    color: #fff;
    text-align: center;
    height: 20%;
    width: 4%;
    border-radius: 9px;

    @media (max-width: 1000px) {
      width: 20%;
    }
  `,
};
