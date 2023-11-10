// pages/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewsData, fetchData } from "../redux/slices/newsSlice";
import { wrapper } from "../utils/withRedux";
import api from "../utils/api";

const HomePage = ({ serverData }) => {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.newSlice.newsData);
  const loading = useSelector((state) => state.newSlice.loading);
  const error = useSelector((state) => state.newSlice.error);
  useEffect(() => {
    // Dispatch the fetchData async thunk
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>
      {myData &&
        myData.map((item) => {
          return item.title;
        })}
    </div>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      // Manually dispatch the fetchData async thunk on the server side
      await store.dispatch(fetchData());
    } catch (error) {
      console.error("API Error:", error);
    }
  }
);
export default HomePage;
