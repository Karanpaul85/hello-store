import { GoogleLogin } from "@react-oauth/google";
import styles from "./SocialLogin.module.css";
const SocialLogin = () => {
  return (
    <div className={styles.socialLogin}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};
export default SocialLogin;
