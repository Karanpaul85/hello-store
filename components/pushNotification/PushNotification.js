import FontAwesomeIcon from "../FontAwesomeIcon";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import styles from "./pushNotification.module.css";
import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import dynamic from "next/dynamic";

const CustomImage = dynamic(() => import("../customImage"));

const PushNotification = () => {
  const [showNotifationDrawer, setShowNotifationDrawer] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { notificationData } = useSelector((state) => state.notification);

  const openNotificationSec = () => {
    setShowNotifationDrawer(!showNotifationDrawer);
  };
  const sendNotification = async () => {
    setDisabledBtn(true);
    const notificationDataToSend = {
      title: notificationData.title,
      body: notificationData.title,
      icon: notificationData.image_url,
      image: notificationData.image_url,
      click_action: currentUrl,
      data: {
        customData1: "",
      },
    };
    const resp = await axios.post(
      "/api/notificationToken/sendNotification",
      notificationDataToSend
    );
    if (resp) {
      setShowNotifationDrawer(false);
      setDisabledBtn(false);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  return (
    <>
      <Button
        classes={styles.notificationBtn}
        title="Push Notification"
        ariaLabel="Push Notification"
        id="pushNotification"
        onClick={openNotificationSec}
        type="button"
      >
        <FontAwesomeIcon icon={faBell} />
        <span>Send Notification</span>
      </Button>

      <Drawer
        anchor="bottom"
        open={showNotifationDrawer}
        onClose={openNotificationSec}
      >
        <div className={styles.notificationDrawer}>
          <div className={styles.notificationTitle}>
            {notificationData.title}
          </div>
          <div className={styles.notificationImage}>
            <CustomImage
              src={notificationData.image_url}
              width={80}
              height={80}
              alt={notificationData.title}
              sizes="100vw"
              unoptimized={true}
            />
          </div>
          <div className={styles.notificationDrawerBtnSec}>
            <Button
              classes={styles.notificationDrawerBtn}
              title="Push Notification"
              ariaLabel="Push Notification"
              id="pushNotification"
              onClick={sendNotification}
              disabled={disabledBtn}
              type="button"
            >
              <span
                className={`${styles.loading} ${disabledBtn && styles.show}`}
              ></span>
              Send Now
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default PushNotification;
