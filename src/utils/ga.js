import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-HDTNMT20N4');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
