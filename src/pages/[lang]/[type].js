import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import Tabbar from "../../../components/tabbar/TabBar";
import { wrapper } from "@/utils/withRedux";
import {
  fetchData,
  fetchDataFromMDB,
  getApiCallTime,
  sendDataToMDB,
  setApiCallTime,
} from "@/redux/slices/newsSlice";
import Head from "next/head";
import { ogErrorMetaTags } from "../../../components/commonErrorMetatags";
import { ogMetaTags } from "../../../components/commonOgMetatags";
import headingStyle from "../../styles/Home.module.css";
import { allConst } from "@/constant/common_constants";
import SingleNews from "../../../components/singleNews/SingleNews";
import { setNewsData } from "@/redux/slices/searchSlice";
import { setNotificationData } from "@/redux/slices/notificationSlice";
import { checkTimeisOver, getingHeadingText } from "@/utils/common";
import { useEffect } from "react";
import Heading from "../../../components/heading/Heading";

const Types = ({ data, errorData, category, lang, headingText }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNewsData(data));
    data && data.length > 0 && dispatch(setNotificationData(data[0]));
  }, [data, dispatch]);

  useEffect(() => {
    async function fetchMyAPI() {
      const apiTimeTocall = await dispatch(
        getApiCallTime({ lang: lang, category: category })
      );
      const isTimeOver = await checkTimeisOver(
        apiTimeTocall?.payload?.timestamp
      );
      if (isTimeOver) {
        await dispatch(setApiCallTime({ lang: lang, category: category }));
        const latestNewsData = await dispatch(
          fetchData({ lang: lang, category: category })
        );
        await dispatch(sendDataToMDB(latestNewsData.payload));
      }
    }
    fetchMyAPI();
  }, [category, dispatch, lang]);

  const router = useRouter();
  const { textConst } = allConst;
  if (errorData) {
    return (
      <Layout>
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
        <div className={headingStyle.newsSection}>
          <p>{errorData}</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        {ogMetaTags(
          data && data.length ? data?.[0] : "Welcome to world breaking News",
          category,
          { lang: lang, category: category }
        )}
      </Head>
      <Tabbar lang={lang} />
      <Heading Tag="h1" content={headingText} />
      <div className={headingStyle.newsSection}>
        {data && data.length > 0
          ? data.map((item, index) => {
              return (
                <SingleNews
                  key={item.article_id}
                  newsdata={item}
                  index={index}
                  lang={lang}
                  category={category}
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
      const options = {
        lang: ctx.query.lang,
        category: ctx.query.type,
        page: 1,
      };

      const serverData = await store.dispatch(fetchDataFromMDB(options));
      const data = serverData.payload ? serverData.payload : null;
      const errorData = serverData.error ? serverData?.error?.message : null;
      const headingText = await getingHeadingText(options);
      return {
        props: {
          data,
          errorData,
          category: options.category,
          lang: options.lang,
          headingText,
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default Types;
