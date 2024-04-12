import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import Layout from "../../../../components/Layout";
import { wrapper } from "@/utils/withRedux";
import { getSingleNews } from "@/redux/slices/newsSlice";
import Head from "next/head";
import Image from "next/image";
import { ogMetaTags } from "../../../../components/commonOgMetatags";
import styles from "./singleNews.module.css";
import { allConst } from "@/constant/common_constants";
import { setNotificationData } from "@/redux/slices/notificationSlice";

const News = ({ data }) => {
  const dispatch = useDispatch();
  data && dispatch(setNotificationData(data));

  return (
    <Layout showBottomBar={true}>
      <Head>
        {ogMetaTags(data ? data : "Welcome to world breaking News", "Single")}
      </Head>
      <div>
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
          <h1>{data.title}</h1>
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
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default News;
