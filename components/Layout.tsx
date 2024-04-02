import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import React from "react";

export default function Layout({ children }) {
  const pathname = usePathname();
  // const [isPark, setIsPark] = React.useState<boolean>(false);
  // const [isMayak, setIsMayak] = React.useState<boolean>(false);
  // const [isContacts, setIsContacts] = React.useState<boolean>(false);
  const [isFullCard, setIsFullCard] = React.useState<boolean>(false);
  const [isCart, setIsCart] = React.useState<boolean>(false);
  
  function setMainPageProps() {
    setIsFullCard(false);
    setIsCart(false)
  }

  function setFullPageProps() {
    setIsFullCard(true);
    setIsCart(false)
  }

  function setCartPageProps() {
    setIsFullCard(false);
    setIsCart(true)
  }

  useEffect(() => {
    if (pathname === "/" ) {
      setMainPageProps()
    } else if (pathname === "/cart") {
      setCartPageProps();
    } else {
      setFullPageProps()
    }
  }, [pathname]);

  return (
    <>
      <Header 
        isMain={false} // DEL?
        isFullCard={isFullCard}
        isCart={isCart}
      />
      {children}
      <Footer/>
    </>
  )
}

