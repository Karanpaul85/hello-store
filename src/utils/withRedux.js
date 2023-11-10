// utils/withRedux.js
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
