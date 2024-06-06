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
  // const options = {
  //   params: {
  //     email: user.email,
  //     password: user.password,
  //     newPassword: user.newpassword,
  //     confirmPassword: user.confirmpassword,
  //   },
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (user?.password) {
        const resp = await axios.get("/api/login", {
          params: {
            email: user.email,
            password: user.password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else if (user?.newpassword && user?.confirmpassword) {
        console.log(user, "user");
        const resp = await axios.put("/api/login", {
          email: user.email,
          newPassword: user.newpassword,
          confirmPassword: user.confirmpassword,
        });
      } else {
        const resp = await axios.get("/api/login", {
          params: {
            email: user.email,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserDetails(resp?.data);
        setIsDisableEmail(true);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout topright={false} showBottomBar={false}>
      <div className={styles.login}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formSubmit}
        >
          <TextField
            required
            id="email"
            label="Email"
            className={styles.inputField}
            value={user.email}
            name="email"
            onChange={onChange}
            type="email"
            disabled={isDisableEmail}
          />
          {userDetails ? (
            userDetails?.password && userDetails?.password.length > 0 ? (
              <TextField
                required
                id="password"
                label="Password"
                className={styles.inputField}
                value={user.password}
                name="password"
                type="password"
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
                  type="password"
                  onChange={onChange}
                />
                <TextField
                  required
                  id="confirmpassword"
                  label="Confirm Password"
                  className={styles.inputField}
                  value={user.password}
                  name="confirmpassword"
                  type="password"
                  onChange={onChange}
                />
              </>
            )
          ) : (
            "new user"
          )}
          <Button
            type="button"
            title="Login"
            ariaLabel="loginBtn"
            id="loginBtn"
            classes={`${styles.loginBtn}  ${loading ? styles.loading : ""}`}
            disabled={!user.emailValid || loading}
            onClick={formSubmit}
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
