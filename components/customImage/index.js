import Image from "next/image";
import { useState } from "react";
import logo from "/public/assets/images/logo.svg";

const CustomImage = ({ src, alt, isPriority = false, ...props }) => {
  const loadingAttribute = isPriority ? "eager" : "lazy";
  return (
    <Image
      src={src}
      alt={alt}
      priority={isPriority}
      loading={loadingAttribute}
      {...props}
    />
  );
};
export default CustomImage;
