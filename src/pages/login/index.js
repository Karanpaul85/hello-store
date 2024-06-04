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
  const [isDisableEmail, setIsDisableEmail] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
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
      const resp = await axios.post("/api/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserDetails(resp?.data);
      setIsDisableEmail(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userDetails, "userDetails");
  }, [userDetails]);
  return (
    <Layout topright={false} showBottomBar={false}>
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
            disabled={isDisableEmail}
          />
          {userDetails &&
          userDetails?.password &&
          userDetails?.password.length > 0 ? (
            <TextField
              required
              id="password"
              label="Password"
              className={styles.inputField}
              value={user.password}
              name="password"
              onChange={onChange}
            />
          ) : (
            <>
              <TextField
                required
                id="newpassword"
                label="New Password"
                className={styles.inputField}
                value={user.password}
                name="newpassword"
                onChange={onChange}
              />
              <TextField
                required
                id="confirmpassword"
                label="Confirm Password"
                className={styles.inputField}
                value={user.password}
                name="confirmpassword"
                onChange={onChange}
              />
            </>
          )}
          <Button
            type="button"
            title="Login"
            ariaLabel="loginBtn"
            id="loginBtn"
            classes={`${styles.loginBtn}  ${loading ? styles.loading : ""}`}
            disabled={!user.emailValid || loading}
            onClick={onclick}
          >
            Continue
          </Button>
        </Box>
        <SocialLogin />
      </div>
    </Layout>
  );
};
export default Login;
