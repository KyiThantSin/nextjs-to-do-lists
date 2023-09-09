"use client";
/** @jsxImportSource @emotion/react */
import Vector from "@/assets/vector";
import { Button } from "reactstrap";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/components/AuthProvider";

export default function Home() {
  const router = useRouter();
  const user = useContext(UserContext);

  return (
    <main style={{ padding: "20px" }}>
      <section css={styles.wrapper}>
        <div>
          <h1>Lists It Easy !</h1>
          <p>
            Stay organized and achieve your goals with our user-friendly to-do
            list website. Your tasks, your way.
          </p>
          <Button
            id="login-btn"
            onClick={() =>
              `${
                user
                  ? router.push(`/lists/${user}`)
                  : router.push("/auth/login")
              }`
            }
            css={styles.btn}>
            Start
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Vector />
        </div>
      </section>
    </main>
  );
}

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    margin: 40px;
    margin-top: 50px;

    p {
      font-size: 20px;
      text-wrap:wrap;
    }
    h1 {
      color: #000;
      font-weight: 600;
    }
    @media (max-width: 1000px) {
      margin: 8px;
    }
  `,
  btn: css`
    background: #000;
    padding: 6px;
    border: none;
    width: 10%;
    margin-top: 20px;
    color: #fff;
    &:hover {
      cursor: pointer;
      background: #000;
    }
  `,
};
