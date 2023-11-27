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
  return (
    <Link
      href={`/${lang}/${category}/${newsdata.article_id}${
        isSearch && `?from=${queryString}`
      }`}
      className={styles.newsCard}
    >
      {newsdata.image_url && <div className={styles.tumbNail}>
        {index > 1 ? (
          <Image
            src={newsdata.image_url}
            width={300}
            height={300}
            alt=""
            loading="lazy"
            blurDataURL={newsdata.image_url}
            placeholder="blur"
          />
        ) : (
          <Image
            src={newsdata.image_url}
            width={300}
            height={300}
            alt=""
            blurDataURL={newsdata.image_url}
            priority={true}
          />
        )}
      </div>}
      <div className={styles.newsContent}>
        <h2 className={styles.h2Hdeading}>{newsdata.title}</h2>
        <p className={styles.published}>Published at : {newsdata.pubDate}</p>
      </div>
    </Link>
  );
};
export default SingleNews;
