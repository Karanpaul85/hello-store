import styles from "./Heading.module.css";
const Heading = ({ Tag = "h1", content = "", single = false }) => {
  if (single) return <Tag className={styles.heading}>{content}</Tag>;
  return (
    <div className={styles.mainHeading}>
      <Tag className={styles.heading}>{content}</Tag>
    </div>
  );
};
export default Heading;
