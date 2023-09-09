"use client";
/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "5%",
      }}>
      <div css={styles.loader}>
        <span>Loading</span>
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
    color: #000;
  `
};
