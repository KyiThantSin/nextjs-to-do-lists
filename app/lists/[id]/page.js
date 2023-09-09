"use client";
/** @jsxImportSource @emotion/react */
import React, {
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

import { css } from "@emotion/react";
import { Badge, Button } from "reactstrap";
import Loading from "../../loading";
import Card from "@/components/Card";
import { UserContext } from "@/components/AuthProvider";
const CreateForm = lazy(() => import("@/components/CreateForm"));

const Lists = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const [lists, setLists] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const setListsCallback = useCallback((lists) => setLists(lists), []);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      //fetch data from related user id
      const q = query(collection(db, `${user}`));
      const unsubscribe = onSnapshot(q, (querySnapShot) => {
        let lists = [];
        querySnapShot?.forEach((doc) => {
          lists.push({ ...doc.data(), id: doc.id });
        });
        setListsCallback(lists);
      });
      return () => unsubscribe();
    }
  }, [setListsCallback]);

  console.log(lists);

  return (
    user && (
      <section css={styles.wrapper}>
        <div css={styles.header}>
          <h4>Manage Your To Do Lists</h4>
          <Button
            css={styles.formVisibleBtn}
            onClick={() => setIsFormVisible(!isFormVisible)}>
            {!isFormVisible ? "Add Task" : "Cancel"}
          </Button>
        </div>
        {isFormVisible && (
          <Suspense fallback={<Loading />}>
            <CreateForm />
          </Suspense>
        )}
        <div css={styles.listsLength}>
          <p>
            Total Tasks:{" "}
            <Badge color="success">{lists ? lists.length : 0}</Badge>
          </p>
        </div>
        <div css={styles.lists}>
          {lists &&
            lists?.length > 0 &&
            lists.map((list) => {
              return <Card key={list.id} data={list} />;
            })}
          {!lists && (
            <b css={styles.noDataFound}>
              You have no to-do-lists at the moment.
            </b>
          )}
        </div>
      </section>
    )
  );
};

export default Lists;

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    margin: 5.5%;

    p {
      font-size: 20px;
      color: #4e4f4f;
    }

    h4,
    h3 {
      font-weight: 600;
      color: #4e4f4f;
    }

    @media (max-width: 1000px) {
      margin: 8px;
    }
  `,
  header: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `,
  listsLength: css`
    margin-top: 20px;
    border-bottom: 0.9px solid lightgrey;
  `,
  lists: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  noDataFound: css`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 5%;
  `,
  formVisibleBtn: css`
    background: #ff6584;
    padding: 6px;
    border: none;

    &:hover {
      cursor: pointer;
      background: #ff6584;
    }
  `,
};
