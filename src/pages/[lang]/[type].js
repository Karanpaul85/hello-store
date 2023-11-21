import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

const Types = () => {
  const router = useRouter();
  const { lang, type } = router.query;
  return (
    <Layout>
      {type}, {lang}
    </Layout>
  );
};
export default Types;
