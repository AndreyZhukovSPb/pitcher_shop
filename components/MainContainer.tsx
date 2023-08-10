import Head from "next/head";
import Link from "next/link";

export default function MainContainer ({children}) {
    return (
      <>
        <Head>
          <title>Specialty coffee</title>
          <link rel="icon" href="/favicon.ico/" sizes="any" />
        </Head>
        <div>
          <Link href={"/mayak"}>Маяк</Link>
          <Link href={"/park"}>Парк</Link>
        </div>
        <div>{children}</div>
      </>
    );
};

// export default MainContainer;

//<link rel="shortcut icon" type="image/x-icon" href="%PUBLIC_URL%/favicon.ico" /> 

/*

*/