// components/FontAwesomeIcon.js
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";

const FontAwesomeIcon = ({ icon, ...props }) => {
  return <FAIcon icon={icon} {...props} />;
};

export default FontAwesomeIcon;
