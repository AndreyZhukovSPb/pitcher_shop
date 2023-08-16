/* import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
*/

import Head from "next/head";
import "normalize.css/normalize.css";
import "../styles/fonts.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Specialty coffee</title>
        <link rel="icon" href="/favicon.ico/" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
