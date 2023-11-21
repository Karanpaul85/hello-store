import Layout from "../../../../components/Layout";
import { wrapper } from "@/utils/withRedux";
import { fetchData } from "@/redux/slices/newsSlice";
import Head from "next/head";
import Image from "next/image";
import { ogMetaTags } from "../../../../components/commonOgMetatags";
import { ogErrorMetaTags } from "../../../../components/commonErrorMetatags";
import styles from "./singleNews.module.css";

const News = ({ data, errorData }) => {
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
        <div className={styles.mainHeading}>
          <h1>{textConst.API_ERROR}</h1>
        </div>
        <div className="newsSection" style={customStyle.newsSection}>
          <p>{errorData}</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>{ogMetaTags(data ? data : "Welcome to world breaking News")}</Head>
      <div>
        <div className={styles.tumbNail}>
          <Image
            src={data.image_url}
            width={640}
            height={480}
            alt=""
            blurDataURL={data.image_url}
            priority={true}
          />
        </div>
        <div className={styles.newsContent}>
          <h1>{data.title}</h1>
          <p className={styles.publish}>Published at : {data.pubDate}</p>
          <p>{data.description}</p>
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const options = { lang: ctx.query.lang, category: ctx.query.type };
      const serverData = await store.dispatch(fetchData(options));
      const data = serverData.payload ? serverData.payload : null;
      const errorData = serverData.error ? serverData?.error?.message : null;
      const singleNews =
        data &&
        data.find((item) => {
          return item.article_id == ctx.query.news;
        });
      return {
        props: {
          data: singleNews,
          errorData,
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default News;
