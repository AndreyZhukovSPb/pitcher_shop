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

/* 

<Header headerType="main_header header__type_main" isMain={true} />

export default MainContainer;
<div>
<Link href={"/mayak"}>Маяк</Link>
<Link href={"/park"}>Парк</Link>
</div>
<link rel="shortcut icon" type="image/x-icon" href="%PUBLIC_URL%/favicon.ico" />
*/

/*
to-do: 
ScrollToTop
шрифты проверить
скорость перелистывания карусели для мобилы увеличить
Haed точно применяется если переходить сразу на страницу кофеен?
*/
