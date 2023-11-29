import styles from "./Languages.module.css";
import { languages } from "../../src/constant/common_constants";
import Link from "next/link";
const Languages = () => {
  return (
    <div className={styles.langBarSection}>
      <ul>
        {languages &&
          languages.length > 0 &&
          languages.map((item) => {
            return (
              <li key={item.desc}>
                <Link href={item.url}>{item.desc}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Languages;
