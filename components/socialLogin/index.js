import { GoogleLogin } from "@react-oauth/google";
import styles from "./SocialLogin.module.css";
import axios from "axios";
import { setUserDetails } from "@/redux/slices/oneTapLoginSlice";
import { useDispatch } from "react-redux";
const SocialLogin = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.socialLogin}>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (credentialResponse.credential) {
            const resp = await axios("/api/users", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${credentialResponse.credential}`,
              },
            });
            resp.data.from = "api";
            dispatch(setUserDetails(resp.data));
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};
export default SocialLogin;
