import styles from "./Languages.module.css";
import { languages } from "../../src/constant/common_constants";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { showLangSec } from "@/redux/slices/searchSlice";
const Languages = () => {
  const dispatch = useDispatch();
  const hideLangBar = () => {
    dispatch(showLangSec(false))
  };
  return (
    <div className={styles.langBarSection}>
      <ul>
        {languages &&
          languages.length > 0 &&
          languages.map((item) => {
            return (
              <li key={item.desc}>
                <Link href={item.url} onClick={hideLangBar}>
                  {item.desc}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Languages;
