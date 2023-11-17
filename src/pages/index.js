// pages/index.js
import Layout from "../../components/Layout";
import { fetchData } from "../redux/slices/newsSlice";
import { wrapper } from "../utils/withRedux";

const HomePage = ({ data }) => {
  return (
    <Layout>
      {data &&
        data.map((item) => {
          return <p key={item.title}>{item.title}</p>;
        })}
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const serverData = await store.dispatch(fetchData());
      return {
        props: { data: serverData.payload },
      };
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default HomePage;
