import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";

const News = () => {
  const router = useRouter();
  const { type, news } = router.query;
  return (
    <Layout>
      {news}, {type}
    </Layout>
  );
};
export default News;
