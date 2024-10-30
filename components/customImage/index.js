import Image from "next/image";
import { useState } from "react";
import logo from "/public/assets/images/logo.svg";

const CustomImage = ({ src, alt, isPriority = false, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(logo);
  };
  const loadingAttribute = isPriority ? "eager" : "lazy";
  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      priority={isPriority}
      loading={loadingAttribute}
      {...props}
    />
  );
};
export default CustomImage;
