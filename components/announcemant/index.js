import Marquee from "react-fast-marquee";
import styles from "./announcement.module.css";
const Announcement = () => {
  return (
    <Marquee speed={40} pauseOnHover={true}>
      <div className={styles.announcement}>
        For advertising inquiries or banner display opportunities on this
        website, please contact:- Contact Person: <span>Karan Paul</span>,
        Email:
        <a href="mailto:karanpaul85@gmail.com">
          karanpaul85@gmail.com
        </a> Phone: <a href="tel:+918130464110">+91 8130464110</a>
      </div>
    </Marquee>
  );
};
export default Announcement;
