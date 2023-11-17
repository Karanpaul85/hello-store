import React from "react";
import { useRouter } from "next/router";
import { Home, Search, Person } from "@mui/icons-material";
import Link from "next/link";
const BottomBar = () => {
  const router = useRouter();
  const customStyle = {
    bottomBaar: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#fff",
      boxShadow: "rgba(0, 0, 0, 0.2) -2px -2px 2px",
      display: "flex",
      listStyle: "none",
      alignItems: "center",
      justifyContent: "center",
      height: 54,
    },
    item: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      height: 54,
    },
  };
  return (
    <ul style={customStyle.bottomBaar}>
      <li style={customStyle.item}>
        <Link
          href="/"
          style={customStyle.item}
          className={router.asPath == "/" ? "active" : ""}
        >
          <Home></Home>
        </Link>
      </li>
      <li style={customStyle.item}>
        <Link
          href="/eng"
          style={customStyle.item}
          className={router.asPath == "/eng" ? "active" : ""}
        >
          <Search></Search>
        </Link>
      </li>
      <li style={customStyle.item}>
        <Link
          href="/"
          style={customStyle.item}
          className={router.asPath == "/" ? "active" : ""}
        >
          <Person></Person>
        </Link>
      </li>
    </ul>
  );
};
export default BottomBar;
