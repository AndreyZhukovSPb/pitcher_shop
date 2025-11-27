import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import arrow from "../public/arr_down.svg";
import styles from "../styles/Category.module.css";
import Image from "next/image";
import Product from "./Product";
import { type ProductType } from "../utils/sharedTypes";
import SectionLine from "./SectionLine";
import { showTime } from "../utils/constatnts";

interface categoryProps {
  category: { name: string; array: ProductType[] };
}

const Category: React.FC<categoryProps> = ({ category }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isCatOpened, setIsCatOpened] = useState(false);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  // Измеряем высоту контента
  useEffect(() => {
    const contentEl = contentRef.current as HTMLDivElement;
    if (!contentEl) return;

    const observer = new ResizeObserver(() => {
      setContentHeight(contentEl.scrollHeight);
    });
    observer.observe(contentEl);

    // Чистим
    return () => observer.unobserve(contentEl);
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const displayedHeight = !mounted 
    ? "0px" // сервер: всегда закрыто тк есть скелетон
    : isBigScreen
      ? "auto" // клиент: большой экран → открыто
      : isCatOpened
        ? `${contentHeight}px` // клиент: маленький экран, открыто по клику
        : "0px";               // клиент: маленький экран, закрыто по умолчанию


  const openCatHandler = () => {
    if (!isBigScreen) setIsCatOpened(!isCatOpened);
  };

  return (
    <li className={styles.category__container}>
      <SectionLine isForCatalog={true} />
      <button className={styles.category__btn} onClick={openCatHandler}>
        <h2 className={styles.category__name}>{category.name}</h2>
        <Image
          className={`${styles.category__arrow} ${
            isCatOpened ? styles.category__arrow_opened : ""
          }`}
          src={arrow}
          alt="Стрелка"
        />
      </button>
      {!mounted && (<>
            <div className={styles.category__skeletonContainer}>
              <div className={`${styles.category__skeletonItem} ${showTime ? styles.category__skeletonItem_showTime : ''}`}></div>
              <div className={`${styles.category__skeletonItem} ${showTime ? styles.category__skeletonItem_showTime : ''}`}></div>
              <div className={`${styles.category__skeletonItem} ${showTime ? styles.category__skeletonItem_showTime : ''}`}></div>
            </div>
          </>)}
      
      <div
        className={`${styles.category__wrap} ${
          isCatOpened ? styles.category__wrap_opened : ""
        }`}
        style={{ height: displayedHeight }}
      >
        <div
          ref={contentRef}
          className={`${styles.category__productContainer} ${
            isCatOpened ? styles.category__productContainer_opened : ""
          }`}
        >
          
          {category.array.map((item, number) => (
            <Product key={number} product={item} />
          ))}
        </div>
      </div>
    </li>
  );
};

export default Category;


// import React, { useEffect, useRef, useState } from "react";
// import { useMediaQuery } from "react-responsive";
// // import arrow from '../../image/icons/arr-down.svg';
// import arrow from "../public/arr_down.svg";
// import styles from "../styles/Category.module.css";
// import Image from "next/image";
// import Product from "./Product";
// import { type ProductType } from "../utils/sharedTypes";
// import SectionLine from "./SectionLine";

// interface categoryProps {
//   category: { name: string; array: ProductType[] };
//   // isOpen: boolean;
// }

// const Category: React.FC<categoryProps> = ({ category }) => {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [height, setHeight] = useState(0);
//   const [contentHeight, setContentHeight] = useState(0);
//   const [isCatOpened, setIsCatOpened] = useState(false);
//   // const [isCatOpened, setIsCatOpened] = useState(() => isBigScreen);
//   const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     const contentEl = contentRef.current as HTMLDivElement;
//     const observer = new ResizeObserver(() => {
//       if (isCatOpened || isBigScreen) {
//         setHeight(contentEl.scrollHeight);
//         setContentHeight(contentEl.scrollHeight);
//       } else {
//         setHeight(0);
//       }
//     });
//     if (contentEl) {
//       observer.observe(contentEl);
//     }
//     return () => {
//       if (contentEl) {
//         observer.unobserve(contentEl);
//       }
//     };
//   }, [isCatOpened, isBigScreen]);



//   const isServer = typeof window === "undefined";

// const displayedHeight = isServer
//   ? "auto"   // сервер: предполагаем, что большие экраны → открыто
//   : isBigScreen
//     ? "auto" // клиент: большой экран → открыто
//     : (isCatOpened ? `${contentHeight}px` : "0px");



//   const openCatHandler = () => {
//     if (isBigScreen) {
//       return;
//     } else {
//       setIsCatOpened(!isCatOpened);
//     }
//   };

//   return (
//     <li className={styles.category__container}>
//       <SectionLine isForCatalog={true} />
//       <button className={styles.category__btn} onClick={openCatHandler}>
//         <h2 className={styles.category__name}>{category.name}</h2>
//         <Image
//           className={`${styles.category__arrow} ${
//             isCatOpened ? styles.category__arrow_opened : ""
//           } `}
//           src={arrow}
//           alt="Стрелка"
//         />
//       </button>
//       <div
//         className={`${styles.category__wrap} ${
//           isCatOpened ? styles.category__wrap_opened : ""
//         }`}
//         // style={{ height }}
//         // style={{ height: displayedHeight }}
//         style={{ height: `${displayedHeight}` }}
//       >
//         <div
//           ref={contentRef}
//           className={`${styles.category__productContainer} ${
//             isCatOpened ? styles.category__productContainer_opened : ""
//           }`}
//         >
//           {category.array.map((item, number) => {
//             return <Product key={number} product={item} />;
//           })}
//         </div>
//       </div>
//     </li>
//   );
// };

// export default Category;
