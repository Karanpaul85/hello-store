import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import Layout from "../../../../components/Layout";
import { wrapper } from "@/utils/withRedux";
import { getSingleNews } from "@/redux/slices/newsSlice";
import Head from "next/head";
import Image from "next/image";
import { ogMetaTags } from "../../../../components/commonOgMetatags";
import styles from "./singleNews.module.css";
import { setNotificationData } from "@/redux/slices/notificationSlice";
import { useEffect } from "react";
import Tabbar from "../../../../components/tabbar/TabBar";
import Heading from "../../../../components/heading/Heading";

const News = ({ data, options }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    data && dispatch(setNotificationData(data));
  }, [data, dispatch]);

  return (
    <Layout showBottomBar={true}>
      <Head>
        {ogMetaTags(data ? data : "Welcome to world breaking News", "Single", {
          lang: options.lang,
          category: options.type,
          news: options.news,
        })}
      </Head>
      <Tabbar lang={options.lang} />
      <div className={styles.single}>
        {data.image_url && (
          <div className={styles.tumbNail}>
            <div
              className={styles.tumbNailBlur}
              style={{ backgroundImage: `url(${data.image_url})` }}
            ></div>
            <Image
              src={data.image_url}
              width={640}
              height={480}
              alt={data.title}
              priority={true}
              sizes="100vw"
            />
          </div>
        )}
        <div className={styles.newsContent}>
          <Heading Tag="h1" content={data.title} single={true} />
          <div className={styles.publish}>Published at : {data.pubDate}</div>
          <div className={styles.description}>
            {parse(`${data.description}`)}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const singleNewsData = await store.dispatch(
        getSingleNews(ctx.query.news)
      );

      const singleNews = singleNewsData?.payload;

      return {
        props: {
          data: singleNews,
          options: ctx.query,
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default News;
