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
import { checkTimeisOver, getingHeadingText } from "@/utils/common";
import { useEffect, useState } from "react";
import Heading from "../../components/heading/Heading";

const HomePage = ({ data, errorData, options, headingText }) => {
  const [allData, setAllData] = useState(data);
  const [page, setpage] = useState(options.page);
  // console.log(page, "page");

  const dispatch = useDispatch();

  // const loadMoreUnew = async () => {
  //   options.page = 2;
  //   const res = await dispatch(fetchDataFromMDB(options));
  //   setAllData(...allData, ...res.payload);
  //   console.log(allData, "res");
  // };

  useEffect(() => {
    dispatch(setNewsData(data));
    data && data.length > 0 && dispatch(setNotificationData(data[0]));
  }, [data, dispatch]);

  const { textConst } = allConst;

  useEffect(() => {
    async function fetchMyAPI() {
      const apiTimeTocall = await dispatch(getApiCallTime(options));
      const isTimeOver = await checkTimeisOver(
        apiTimeTocall?.payload?.timestamp
      );
      if (isTimeOver) {
        await dispatch(setApiCallTime(options));
        const latestNewsData = await dispatch(fetchData(options));
        await dispatch(sendDataToMDB(latestNewsData.payload));
      }
    }

    fetchMyAPI();
  }, [dispatch, options]);

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
        <Heading Tag="h1" content={textConst.API_ERROR} />
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
          "Home",
          options
        )}
      </Head>
      <Tabbar lang="hi" />

      <Heading Tag="h1" content={headingText} />

      <div className={styles.newsSection}>
        {allData &&
          allData.map((item, index) => {
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
      {/* <button onClick={loadMoreUnew}>Load More</button> */}
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const options = { lang: "hi", category: "world", page: 1 };
      const serverData = await store.dispatch(fetchDataFromMDB(options));
      const data = serverData.payload ? serverData.payload : null;
      const errorData = serverData.error ? serverData?.error?.message : null;
      const headingText = await getingHeadingText(options);
      return {
        props: {
          data,
          errorData,
          options,
          headingText,
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default HomePage;
