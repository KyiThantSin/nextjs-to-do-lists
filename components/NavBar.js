"use client";
/** @jsxImportSource @emotion/react */
import { Auth } from "@/app/firebase";
import { css } from "@emotion/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { UserContext } from "./AuthProvider";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useContext(UserContext)

  const handleLogout = async (e) => {
     await signOut(Auth).then(() => {
        router.push('/')
      })
  }

  return (
    <nav>
      <ul css={styles.navbar}>
        <li>
          <Link href="/" css={[styles.link, styles.logo]}>
            ListsItEasy
          </Link>
        </li>
        <li css={styles.row}>
          { user && <span>
            <Link href={`/lists/${user}`} css={styles.link}>
              My Lists
            </Link> 
          </span>
          }
          <span>
            { user ? (
              <p css={styles.logout} onClick={handleLogout}>
               Logout
             </p>
            ) : (
            <>
             { pathname === "/auth/login" ? (
                  <Link href="/auth/register" css={styles.link}>
                    Register
                  </Link>
                ) : (
                  <Link href="/auth/login" css={styles.link}>
                    Login
                  </Link>
                )}
             
            </>
            )}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

const styles = {
  navbar: css`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding-bottom: 15px;
    border-bottom: 1px solid lightgrey;

    li {
      cursor: pointer;
    }
  `,
  row: css`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    span {
      margin-left: 9px;
    }
  `,
  link: css`
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: #000;
  `,
  logo: css`
    font-size: 20px;
    color: #000;
    font-weight: 600;
  `,
  logout:css`
    margin-top:15px;
    font-size: 18px;
    font-weight: 500;
    color: #000;
  `
};
