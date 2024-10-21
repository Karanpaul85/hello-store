import Image from "next/image";
import { useState } from "react";
import logo from "/public/assets/images/logo.svg";

const CustomImage = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(logo);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props} // pass other props like width, height
    />
  );
};
export default CustomImage;
