import Image from "next/image";

const CustomImage = ({ src, alt, isPriority = false, ...props }) => {
  const loadingAttribute = isPriority ? "eager" : "lazy";
  return (
    <Image
      src={src}
      alt={alt}
      priority={isPriority}
      loading={loadingAttribute}
      unoptimized
      {...props}
    />
  );
};
export default CustomImage;
