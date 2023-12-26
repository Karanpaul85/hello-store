"use client";
import { Box, TextField } from "@mui/material";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SocialLogin from "../../../components/socialLogin";

const Login = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [user, setUser] = useState({
    email: "",
    emailValid: false,
  });
  const [isUserExist, setIsUserExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      emailValid: emailPattern.test(user.email),
    });
  };
  const onclick = async () => {
    try {
      setLoading(true);
      const resp = await axios("/api/login", {
        method: "POST",
        body: user,
      });
      console.log(resp, "resp");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(isUserExist, "isUserExist");
  }, [isUserExist]);

  return (
    <Layout topright={false} shareBtn={false}>
      <div className={styles.login}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            required
            id="email"
            label="Email"
            className={styles.inputField}
            value={user.email}
            name="email"
            onChange={onChange}
          />
          <TextField
            required
            id="password"
            label="Password"
            className={styles.inputField}
          />
          <Button
            type="button"
            title="Login"
            ariaLabel="loginBtn"
            id="loginBtn"
            classes={styles.loginBtn}
            disabled={!user.emailValid || loading}
            onClick={onclick}
          >
            Continue
          </Button>
        </Box>
        <SocialLogin/>
      </div>
    </Layout>
  );
};
export default Login;
