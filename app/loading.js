"use client";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  const letters = ["L", "o", "a", "d", "i", "n", "g"];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "5%",
      }}>
      <div css={styles.loader}>
        {letters &&
          letters?.map((letter, index) => (
            <span key={index} css={index % 2 === 0 ? styles.blue : styles.red}>
              {letter}
            </span>
          ))}
        <Spinner color="secondary" type="grow" size="sm" style={{marginLeft:'9px'}}/>
        <Spinner color="secondary" type="grow" size="sm" style={{marginLeft:'9px'}}/>
        <Spinner color="secondary" type="grow" size="sm" style={{marginLeft:'9px'}}/>
      </div>
    </div>
  );
}

export default Loading;

const styles = {
  loader: css`
    font-size: 60px;
    font-weight: 600;
  `,
  blue: css`
    color: #05affe;
  `,
  red: css`
    color: #ff6584;
  `,
};
