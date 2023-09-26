import Head from "next/head";
// import Link from "next/link";
import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
// import ScrollToTop from "./ScrollToTop";

export default function App() {
  const [isStore, setIsStore] = useState(false);

  return (
    <>
      <Head>
        <title>Specialty coffee</title>
        <link rel="icon" href="/favicon.ico/" sizes="any" />
      </Head>
      <Header isMain={true} />
      <Main />      
    </>
  );
}

