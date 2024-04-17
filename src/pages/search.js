// pages/index.js
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { fetchSearchData, setNewsData } from "../redux/slices/searchSlice";
import { wrapper } from "../utils/withRedux";
import styles from "../styles/Home.module.css";
import { allConst } from "@/constant/common_constants";
import Head from "next/head";
import { ogMetaTags } from "../../components/commonOgMetatags";
import { ogErrorMetaTags } from "../../components/commonErrorMetatags";
import SingleNews from "../../components/singleNews/SingleNews";
import { useEffect } from "react";
import { setNotificationData } from "@/redux/slices/notificationSlice";
import { sendDataToMDB, setApiCallTime } from "@/redux/slices/newsSlice";

const SearchNews = ({ data, errorData, category, lang, queryString }) => {
  const dispatch = useDispatch();
  dispatch(setNewsData(data));
  data && data.length > 0 && dispatch(setNotificationData(data[0]));
  const { textConst } = allConst;
  useEffect(() => {}, []);
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
          "Search",
          { lang: lang, category: queryString }
        )}
      </Head>
      {/* <div style={{ height: 200 }}>Slider</div> */}
      <div className={styles.mainHeading}>
        <h1>{textConst.LATEST_NEWS}</h1>
      </div>
      <div className={styles.newsSection}>
        {data && data.length > 0
          ? data.map((item, index) => {
              return (
                <SingleNews
                  key={item.article_id}
                  newsdata={item}
                  index={index}
                  lang={lang}
                  category={category}
                  isSearch={true}
                  queryString={queryString}
                />
              );
            })
          : "We can not find any results for this query"}
      </div>
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const options = { lang: ctx.query.lang, q: ctx.query.q };

      await store.dispatch(setApiCallTime(options));
      const serverData = await store.dispatch(fetchSearchData(options));
      await store.dispatch(sendDataToMDB(serverData.payload));

      // serverData = await store.dispatch(fetchSearchData(options));
      const data = serverData.payload ? serverData.payload : null;
      const errorData = serverData.error ? serverData?.error?.message : null;
      return {
        props: {
          data,
          errorData,
          category: "top",
          lang: ctx.query.lang,
          queryString: ctx.query.q,
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default SearchNews;
