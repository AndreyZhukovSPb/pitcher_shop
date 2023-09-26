import Header from "./Header";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import React from "react";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isMain, setIsMain] = React.useState<boolean>(true);
  const [isPark, setIsPark] = React.useState<boolean>(false);
  const [isMayak, setIsMayak] = React.useState<boolean>(false);
  const [isContacts, setIsContacts] = React.useState<boolean>(false);
  
  function setMainPageProps() {
    setIsMain(true);
    setIsContacts(false)
    setIsMayak(false)
    setIsPark(false)
  }

  function setContactsPageProps() {
    setIsMain(false);
    setIsContacts(true)
    setIsMayak(false)
    setIsPark(false)
  }

  function setMayakPageProps() {
    setIsMain(false);
    setIsContacts(false)
    setIsMayak(true)
    setIsPark(false)
  }

  function setParkPageProps() {
    setIsMain(false);
    setIsContacts(false)
    setIsMayak(false)
    setIsPark(true)
  }

  useEffect(() => {
    if (pathname === "/") {
      setMainPageProps()
    } else if (pathname === "/contacts") {
      setContactsPageProps()
    } else if (pathname === "/park") {
      setParkPageProps()
    } else if (pathname === "/mayak") {
      setMayakPageProps()
    } 
  }, [pathname]);

  return (
    <>
      <Header 
        isMain={isMain}
        isContacts={isContacts}
        isMayak={isMayak}
        isPark={isPark}
      />
      {children}
    </>
  )
}


/*



  function switchOnIsMain() {
    setIsMain(true)
  }

  function switchOffIsMain() {
    setIsMain(false)
    console.log('??')
  }

  function showPageAtNav() {
  }
*/