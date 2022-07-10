import '../styles/globals.scss';
import axios from 'axios'
import type { AppProps } from 'next/app';


axios.defaults.baseURL = "https://api.themoneystaging.com";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
