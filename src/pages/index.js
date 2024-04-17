// pages/index.js
import Layout from "../../components/Layout";
import {
  fetchData,
  fetchDataFromMDB,
  getApiCallTime,
  sendDataToMDB,
  setApiCallTime,
  setNewsData,
} from "../redux/slices/newsSlice";
import { wrapper } from "../utils/withRedux";
import styles from "../styles/Home.module.css";
import { allConst } from "@/constant/common_constants";
import Head from "next/head";
import { ogMetaTags } from "../../components/commonOgMetatags";
import { ogErrorMetaTags } from "../../components/commonErrorMetatags";
import SingleNews from "../../components/singleNews/SingleNews";
import Tabbar from "../../components/tabbar/TabBar";
import { useDispatch } from "react-redux";
import { setNotificationData } from "@/redux/slices/notificationSlice";
import { checkTimeisOver } from "@/utils/common";

const HomePage = ({ data, errorData, options }) => {
  const dispatch = useDispatch();
  dispatch(setNewsData(data));
  data && data.length > 0 && dispatch(setNotificationData(data[0]));

  const { textConst } = allConst;

  if (errorData) {
    return (
      <Layout showBottomBar={false}>
        <Head>
          {errorData
            ? ogErrorMetaTags(errorData)
            : ogMetaTags(
                data && data.length
                  ? data?.[0]
                  : "Welcome to world breaking News"
              )}
        </Head>
        <div className={styles.mainHeading}>
          <h1>{textConst.API_ERROR}</h1>
        </div>
        <div className={styles.newsSection}>
          <p>{errorData}</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout showBottomBar={true}>
      <Head>
        {ogMetaTags(
          data && data.length ? data?.[0] : "Welcome to world breaking News",
          "Home"
        )}
      </Head>
      <Tabbar lang="hi" />
      <div className={styles.mainHeading}>
        <h1>{textConst.LATEST_NEWS}</h1>
      </div>
      <div className={styles.newsSection}>
        {data &&
          data.map((item, index) => {
            return (
              <SingleNews
                key={item.article_id}
                newsdata={item}
                index={index}
                lang={options?.lang}
                category={options?.category}
              />
            );
          })}
      </div>
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const options = { lang: "hi", category: "world" };

      const apiTimeTocall = await store.dispatch(getApiCallTime(options));
      const isTimeOver = await checkTimeisOver(
        apiTimeTocall?.payload?.timestamp
      );
      if (isTimeOver) {
        await store.dispatch(setApiCallTime(options));
        const latestNewsData = await store.dispatch(fetchData(options));
        await store.dispatch(sendDataToMDB(latestNewsData.payload));
      }
      const serverData = await store.dispatch(fetchDataFromMDB(options));
      const data = serverData.payload ? serverData.payload : null;
      const errorData = serverData.error ? serverData?.error?.message : null;
      return {
        props: {
          data,
          errorData,
          options,
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default HomePage;
