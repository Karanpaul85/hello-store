import Image from "next/image";
import Link from "next/link";
import styles from "./singleNews.module.css";

const SingleNews = ({
  newsdata,
  index,
  lang,
  category,
  isSearch,
  queryString,
}) => {
  const searchParm = isSearch ? `?from=${queryString}` : "";
  return (
    <a
      href={`/${lang}/${category}/${newsdata.article_id}${searchParm}`}
      className={styles.newsCard}
    >
      {newsdata.image_url && (
        <div className={styles.tumbNail}>
          {index > 1 ? (
            <>
              <div
                className={styles.tumbNailBlur}
                style={{ backgroundImage: `url(${newsdata.image_url})` }}
              ></div>
              <Image
                src={newsdata.image_url}
                width={300}
                height={300}
                alt={newsdata.title}
                loading="lazy"
                sizes="100vw"
                unoptimized={true}
              />
            </>
          ) : (
            <>
              <div
                className={styles.tumbNailBlur}
                style={{ backgroundImage: `url(${newsdata.image_url})` }}
              ></div>
              <Image
                src={newsdata.image_url}
                width={300}
                height={300}
                alt={newsdata.title}
                priority={true}
                sizes="100vw"
                unoptimized={true}
              />
            </>
          )}
        </div>
      )}
      <div className={styles.newsContent}>
        <h2 className={styles.h2Hdeading}>{newsdata.title}</h2>
        <p className={styles.published}>Published at : {newsdata.pubDate}</p>
      </div>
    </a>
  );
};
export default SingleNews;
