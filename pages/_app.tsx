import Head from "next/head";
import "normalize.css/normalize.css";
import ScrollToTop from "../components/ScrollToTop";
import "../styles/fonts.css";
import '../styles/global.css'
import Layout from "../components/Layout";

import React from "react";

export default function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        <title>Specialty coffee</title>
        <link rel="icon" href="/favicon.ico/" sizes="any" />
      </Head>
      <ScrollToTop />
      <div className='page'>
        <Layout>        
          <Component 
            {...pageProps} 
          />
        </Layout>
      </div>

      
    </>
  );
}
