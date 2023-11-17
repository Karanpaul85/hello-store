// pages/index.js
import Image from "next/image";
import Layout from "../../components/Layout";
import { fetchData } from "../redux/slices/newsSlice";
import { wrapper } from "../utils/withRedux";
import styles from "../styles/Home.module.css";
import { allConst } from "@/constant/common_constants";
import Link from "next/link";
import Head from "next/head";
import { ogMetaTags } from "../../components/commonOgMetatags";

const HomePage = ({ data, errorData }) => {
  console.log(errorData, "errorData");
  const { textConst } = allConst;
  const customStyle = {
    newsSection: {
      padding: "0 16px",
      overflow: "auto",
    },
    newsCard: {
      background: "#fff",
      borderRadius: "8px",
      margin: "24px 0",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      display: "flex",
      flexWrap: "wrap",
    },
    tumbNail: {
      position: "relative",
      width: "100%",
      paddingTop: "50%",
    },
    img: {
      borderRadius: "8px",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      backgroundSize: "cover",
    },
    newsContent: {
      padding: "8px",
      with: "100%",
    },
    h3Hdeading: {
      fontSize: "14px",
      fontWeight: "500",
    },
    published: {
      marginTop: "10px",
      fontSize: "12px",
    },
  };
  if (errorData) {
    return (
      <Layout>
        <Head>{ogMetaTags(errorData)}</Head>
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
      <Head>
        {ogMetaTags(
          data && data.length ? data?.[0] : "Welcome to world breaking News"
        )}
      </Head>
      {/* <div style={{ height: 200 }}>Slider</div> */}
      <div className={styles.mainHeading}>
        <h1>{textConst.LATEST_NEWS}</h1>
      </div>
      <div className="newsSection" style={customStyle.newsSection}>
        {data &&
          data.map((item, index) => {
            return (
              <Link
                href={`/hindi/${item.article_id}`}
                key={item.article_id}
                style={customStyle.newsCard}
              >
                <div className="tumbNail" style={customStyle.tumbNail}>
                  {index > 1 ? (
                    <Image
                      src={item.image_url}
                      width={300}
                      height={300}
                      alt=""
                      style={customStyle.img}
                      loading="lazy"
                      blurDataURL={item.image_url}
                      placeholder="blur"
                    />
                  ) : (
                    <Image
                      src={item.image_url}
                      width={300}
                      height={300}
                      alt=""
                      style={customStyle.img}
                      blurDataURL={item.image_url}
                      priority={true}
                    />
                  )}
                </div>
                <div className="newsContent" style={customStyle.newsContent}>
                  <h2 style={customStyle.h3Hdeading}>{item.title}</h2>
                  <p style={customStyle.published}>
                    Published at : {item.pubDate}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const serverData = await store.dispatch(fetchData());
      return {
        props: {
          data: serverData?.payload,
          errorData: serverData?.error?.message,
        },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default HomePage;
