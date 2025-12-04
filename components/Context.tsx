import React, { createContext, ReactNode, useEffect, useState } from "react";
import { OrderType, ProductType } from "../utils/sharedTypes";
import { getItems } from "../utils/api";
import { millingTableNew } from "../utils/constatnts";
import { cartIdHandler } from "../utils/cartIdHandler";
import { filterCats } from "../utils/dataTranformers";

interface ICurrentProductFeatures {
  url: string;
  urlLarge: string;
  currentUrl: string;
  currentUrlLarge: string;
  urlGrandeS?: string;
  urlGrandeL?: string;
  itemId: string;
  name: string;
  name_2?: string;
  millingType?: string;
  roastingType?: string;
  price: { title: string; priceItem: number; quantity: number }[];
  quantity: number;
  promo: boolean;
  currentSize: number;
  linkName: string;
}

interface cartProps {
  orderData: OrderType[] | undefined; // Определяем тип данных для orderData
  addToOrder: (product: ProductType) => void; // Корректируем тип для функций
  removeFromOrder: (product: OrderType) => void;
  updateProductQuantityInCart: (productId: string, cartId: string) => void;
  updateMillingType: (id: string, value: string) => void;
  updatePriceType: (id: string, value: number) => void;
  updateQuantity: (id: string, value: string) => void;
  currentProductFeatures: ICurrentProductFeatures[] | undefined;
  resetQuantity: (newId: string, full?: boolean, index?: number) => void;
  resetPriceType: (newId: string) => void;
  resetMilling: (newId: string) => void;
  setInitialProductList: () => void;
  updateMillingCart: (product: OrderType | ProductType, value: string) => void;
  updateQuantutyInCart: (product: OrderType, value: string) => void;
  removeFromCart: (product: OrderType) => void;
  resetCart: () => void;
  setOrderFromStorage: (products: OrderType[]) => void;
}

export const CartContext = createContext<cartProps>({
  orderData: undefined,
  addToOrder: () => {},
  setOrderFromStorage: () => {},
  removeFromOrder: () => {},
  updateProductQuantityInCart: () => {},
  updateMillingType: () => {},
  updatePriceType: () => {},
  updateQuantity: () => {},
  currentProductFeatures: undefined,
  resetQuantity: () => {},
  resetPriceType: () => {},
  resetMilling: () => {},
  setInitialProductList: () => {},
  updateMillingCart: () => {},
  updateQuantutyInCart: () => {},
  removeFromCart: () => {},
  resetCart: () => {},
});

export const CartContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const ProductList = React.useContext(ProductsContext).productsData;

  useEffect(() => {
    const checkOldGoods = (catalogIds, cart) => {
      return cart.every((cartItem) => catalogIds.includes(cartItem._id));
    };

    const removeOldGoods = (catalogIds, cart) => {
      const updatedCart = cart.filter((cartItem) =>
        catalogIds.some((catalogId) => catalogId === cartItem._id)
      );
      if (updatedCart.length === 0) {
        localStorage.removeItem("orderData");
      } else {
        localStorage.setItem("orderData", updatedCart);
      }
      return updatedCart;
    };

    if (ProductList.length < 1) {
      return;
    } else {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("orderData");
        const catalogIds = ProductList.map((item) => item._id);
        if (storedData) {
          const storedDataArray = JSON.parse(storedData);
          if (checkOldGoods(catalogIds, storedDataArray)) {
            // console.log("в корзине нет старых товаров");
            setOrderData(storedDataArray);
          } else {
            // console.log("в корзине были старые товары");
            setOrderData(removeOldGoods(catalogIds, storedDataArray));
          }
        }
      }
    }
  }, [ProductList]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "orderData") {
        try {
          const storedData = JSON.parse(event.newValue) || [];
          if (storedData === orderData) {
            console.log("за каким то хером вызвался слушатель стораджа");
            return;
          } else {
            console.log("Корзина обновлена из другой вкладки");
            setOrderData(storedData);
          }

          // const updatedOrder = JSON.parse(event.newValue) || [];
          // setItemsInCart(updatedOrder.reduce((total, item) => total + item.price.quantity, 0));
        } catch (err) {
          console.error("Ошибка парсинга currentOrder из localStorage", err);
        }
      }
    };

    // Подписываемся на событие
    window.addEventListener("storage", handleStorageChange);

    // Чистим за собой
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [currentProductFeatures, setCurrentProductFeatures] = useState<
    ICurrentProductFeatures[]
  >([]);

  // console.log (currentProductFeatures)

  const setOrderFromStorage = (products: OrderType[]) => {
    console.log(products);
    // добавить проверку на старые продукты, если товара уже нет, то удалить его из LS и не добавлять в корзину
    setOrderData(products);
  };

  const updateMillingType = (newId: string, value: string) => {
    // console.log(value);
    setCurrentProductFeatures((prevState) =>
      prevState.map((item) =>
        item.itemId === newId ? { ...item, millingType: value } : item
      )
    );
  };

  const updateMillingCart = (product: OrderType, newMilling: string) => {
    const newId = cartIdHandler(product._id, product.currentSize, newMilling);

    setOrderData((prevState) => {
      const existingIndexNew = prevState.some((item) => item.cartId === newId);

      if (existingIndexNew) {
        // Если есть, объединяем количества
        return prevState
          .map((item) =>
            item.cartId === newId
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  milling: newMilling,
                }
              : // Убираем старый вариант товара с предыдущим milling
              item.cartId === product.cartId
              ? null
              : item
          )
          .filter(Boolean); // убираем старый товар
      } else {
        // Если нет, просто обновляем milling и _id
        return prevState.map((item) =>
          item.cartId === product.cartId
            ? { ...item, milling: newMilling, cartId: newId }
            : item
        );
      }
    });
  };

  const updateQuantutyInCart = (product: OrderType, value: string) => {
    if (value === "minus") {
      if (product.quantity === 1) {
        removeFromCart(product);
        return;
      }
      // if (orderData.filter(item => item.cartId === product.cartId)
      //   .find(item => item.currentSize === product.currentSize).price.quantity  === 1) {
      //     return
      // }
      else {
        setOrderData((prevState) =>
          prevState.map(
            (item) =>
              item.cartId === product.cartId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            // (item._id === product._id && item.currentSize === product.currentSize) ?
            // {...item, price: {...item.price, quantity: item.price.quantity - 1}}
            // : item
          )
        );
      }
    } else if (value === "plus") {
      setOrderData((prevState) =>
        prevState.map(
          (item) =>
            item.cartId === product.cartId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          // (item._id === product._id && item.currentSize === product.currentSize) ?
          // {...item, price: {...item.price, quantity: item.price.quantity + 1}}
          // : item
        )
      );
    }
  };

  const removeFromCart = (product: OrderType) => {
    if (orderData.length === 1) {
      // console.log('это был последний заказа в корзине')
      localStorage.removeItem("orderData");
    }
    setOrderData((prevState) =>
      prevState.filter((item) => !(item.cartId === product.cartId))
    );
  };

  const resetPriceType = (newId: string) => {
    setCurrentProductFeatures((prevState) =>
      prevState.map((item) =>
        item.itemId === newId
          ? {
              ...item,
              currentSize: 0,
              currentUrl: item.url,
              currentUrlLarge: item.urlLarge,
            }
          : item
      )
    );
  };

  const resetMilling = (newId: string) => {
    setCurrentProductFeatures((prevState) =>
      prevState.map((item) =>
        item.itemId === newId
          ? { ...item, millingType: millingTableNew[0] }
          : item
      )
    );
  };

  const resetQuantity = (newId: string, full?: boolean, index?: number) => {
    if (full) {
      setCurrentProductFeatures((prevState) =>
        prevState.map((item) =>
          item.itemId === newId
            ? {
                ...item,
                price: item.price.map((priceItem) => ({
                  ...priceItem,
                  quantity: 1,
                })),
              }
            : item
        )
      );
    } else {
      setCurrentProductFeatures((prevState) =>
        prevState.map((item) =>
          item.itemId === newId
            ? {
                ...item,
                price: item.price.map((priceItem, indx) =>
                  indx === index ? { ...priceItem, quantity: 1 } : priceItem
                ),
              }
            : item
        )
      );
    }
  };

  const resetCart = () => {
    setOrderData([]);
    localStorage.removeItem("orderData");
  };

  const updateQuantity = (newId: string, value: string) => {
    if (value === "minus") {
      // if (currentProductFeatures.find(item => item.itemId === newId).quantity === 1) {
      if (
        currentProductFeatures.find((item) => item.itemId === newId).price[
          currentProductFeatures.find((item) => item.itemId === newId)
            .currentSize
        ].quantity === 1
      ) {
        return;
      } else {
        setCurrentProductFeatures((prevState) =>
          prevState.map((item) =>
            // item.itemId === newId ? { ...item, quantity: item.quantity + 1 } : item
            item.itemId === newId
              ? {
                  ...item,
                  price: item.price.map((priceItem, index) =>
                    index === item.currentSize
                      ? { ...priceItem, quantity: priceItem.quantity - 1 }
                      : priceItem
                  ),
                }
              : item
          )
        );
        // prevState.map(item =>
        //   item.itemId === newId ? { ...item, quantity: item.quantity - 1 } : item
        // ))
      }
    } else if (value === "plus") {
      setCurrentProductFeatures((prevState) =>
        prevState.map((item) =>
          // item.itemId === newId ? { ...item, quantity: item.quantity + 1 } : item
          item.itemId === newId
            ? {
                ...item,
                price: item.price.map((priceItem, index) =>
                  index === item.currentSize
                    ? { ...priceItem, quantity: priceItem.quantity + 1 }
                    : priceItem
                ),
              }
            : item
        )
      );
    }
  };

  const updatePriceType = (newId: string, value: number) => {
    const isBigBag = value === 0 ? false : true;
    // console.log(isBigBag);
    setCurrentProductFeatures((prevState) =>
      prevState.map((item) =>
        // item.itemId === newId ? { ...item, currentSize: value } : item
        item.itemId === newId
          ? {
              ...item,
              currentSize: value,
              currentUrl: isBigBag ? item.urlGrandeS : item.url,
              currentUrlLarge: isBigBag ? item.urlGrandeL : item.urlLarge,
            }
          : item
      )
    );
  };

  const setInitialProductList = () => {
    // console.log(ProductList)
    if (ProductList.length >= 1) {
      setCurrentProductFeatures(() =>
        ProductList.map((item) => {
          if (item.cat_id === 2 || item.cat_id === 3) {
            return {
              name: item.name,
              name_2: item.name_2,
              itemId: item._id,
              millingType: millingTableNew[0],
              price: item.price.map((priceItem) => ({
                title: priceItem.title,
                priceItem: priceItem.priceItem,
                quantity: 1,
              })),
              quantity: 1,
              promo: item.promo, // DELETE?
              currentSize: 0,
              linkName: item.linkName,
              url: item.url,
              urlLarge: item.urlLarge,
              urlGrandeS: item.urlGrandeS,
              urlGrandeL: item.urlGrandeL,
              currentUrl: item.url,
              currentUrlLarge: item.urlLarge,
              roastingType: item.description.roastingType
            };
          } else {
            return {
              name: item.name,
              itemId: item._id,
              price: item.price.map((priceItem) => ({
                title: priceItem.title,
                priceItem: priceItem.priceItem,
                quantity: 1,
              })),
              quantity: 1,
              promo: item.promo, // DELETE ?
              currentSize: 0,
              linkName: item.linkName,
              url: item.url,
              urlLarge: item.urlLarge,
              currentUrl: item.url,
              currentUrlLarge: item.urlLarge,
            };
          }
        })
      );
    }
  };

  useEffect(() => {
    setInitialProductList();
    // setCurrentProductFeatures(() =>
    //   ProductList.map(item => {
    //     if (item.cat_id === 1 || item.cat_id === 2) {
    //       return {
    //         name: item.name,
    //         name_2: item.name_2,
    //         itemId: item._id,
    //         millingType: millingTableNew[0],
    //         price: item.price.map(priceItem => ({
    //           title: priceItem.title,
    //           priceItem: priceItem.priceItem,
    //           quantity: 1
    //         })),
    //         quantity: 1,
    //         promo: item.promo, // DELETE?
    //         currentSize: 0,
    //         linkName: item.linkName,
    //         url: item.url
    //       };
    //     } else {
    //       return {
    //         name: item.name,
    //         itemId: item._id,
    //         price: item.price.map(priceItem => ({
    //           title: priceItem.title,
    //           priceItem: priceItem.priceItem,
    //           quantity: 1
    //         })),
    //         quantity: 1,
    //         promo: item.promo, // DELETE ?
    //         currentSize: 0,
    //         linkName: item.linkName,
    //         url: item.url
    //       };
    //     }
    //   })
    // );
  }, [ProductList]);

  useEffect(() => {
    // console.log(orderData)
    if (orderData.length === 0) {
      // localStorage.removeItem('orderData');
      // console.log("удалили последний заказ из LS");
      return;
    } else {
      const storedData = localStorage.getItem("orderData");
      const orderDataForStorage = JSON.stringify(orderData);
      if (!storedData) {
        localStorage.setItem("orderData", orderDataForStorage);
      } else {
        if (storedData === JSON.stringify(orderData)) {
          // console.log("данные в корзине и LS совадают, не обновляем LS");
          return;
        } else {
          // console.log("данные в корзине и LS  НЕ совадают, обновляем LS");
          localStorage.setItem("orderData", orderDataForStorage);
        }
      }
    }
  }, [orderData]);

  const addToOrder = (product: ProductType) => {
    const itemForAdd = currentProductFeatures.find(
      (item) => item.itemId === product._id);
    // console.log(itemForAdd);
    const addedItem = {
      name: itemForAdd.name,
      name_2: itemForAdd.name_2 ? itemForAdd.name_2 : undefined,
      price: itemForAdd.price[itemForAdd.currentSize],
      url: itemForAdd.currentUrl,
      urlLarge: itemForAdd.currentUrlLarge,
      linkName: itemForAdd.linkName,
      quantity: itemForAdd.price[itemForAdd.currentSize].quantity,
      _id: itemForAdd.itemId,
      cartId: cartIdHandler(
        itemForAdd.itemId,
        itemForAdd.currentSize,
        itemForAdd.millingType
      ),
      milling: itemForAdd.millingType ? itemForAdd.millingType : undefined,
      roasting: itemForAdd.roastingType ? itemForAdd.roastingType : undefined,
      currentSize: itemForAdd.currentSize,
      cat_id: product.cat_id,
      // subtitle: product.subtitle,
      currentUrl: itemForAdd.currentUrl,
    };
    setOrderData((prevOrderData) => [...prevOrderData, { ...addedItem }]);
  };

  const removeFromOrder = (product: OrderType) => {
    // console.log("or here");
    setOrderData((prevOrderData) =>
      prevOrderData.filter((item) => item.cartId !== product.cartId)
    );
  };

  const updateProductQuantityInCart = (productId: string, cartId: string) => {
    const itemForAdd = currentProductFeatures.find(
      (item) => item.itemId === productId
    );
    setOrderData((prevOrderData) =>
      prevOrderData.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: Math.max(
                0,
                item.quantity +
                  itemForAdd.price[itemForAdd.currentSize].quantity
              ),
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        orderData,
        addToOrder,
        removeFromOrder,
        updateProductQuantityInCart, // DEL?
        updateMillingType,
        currentProductFeatures,
        updatePriceType,
        updateQuantity,
        resetQuantity,
        resetMilling,
        resetPriceType,
        setInitialProductList,
        updateMillingCart,
        updateQuantutyInCart,
        removeFromCart,
        resetCart,
        setOrderFromStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

interface ProductsProps {
  productsData: ProductType[] | undefined;
  addToProducts: (products: ProductType[]) => void;
  getInitialProducts: (products: ProductType[]) => void;
  categoriesData: any
}

export const ProductsContext = createContext<ProductsProps>({
  productsData: undefined,
  addToProducts: () => {},
  getInitialProducts: () => {},
  categoriesData: undefined
});

export const ProductsContextProvider = ({
  children,
  initialProducts = [],
  initialCategories = []
}: {
  children: ReactNode;
  initialProducts?: ProductType[];
  initialCategories?: any
}): JSX.Element => {
  // const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [productsData, setProductsData] = useState<ProductType[]>(initialProducts);
  const [categoriesData, setCategoriesData] = useState(initialCategories);

  const addToProducts = (products: ProductType[]) => {
    // console.log('добавили продукт в контекст')
    if (productsData.length >= 0) {
      // console.log("не стали сетить продакт лист так как он уже был");
      return;
    } else {
      setProductsData(products);
    }
  };

  const getInitialProducts = (products: ProductType[]) => {
    if (productsData.length < 1) {
      console.log('сетим каталог из индкеса')
      setProductsData(products);
    } else {
      // console.log('НЕ сетим каталог из индкеса')
      return;
    }
  };

  useEffect(() => {
    // console.log('измененме productsData')
    // console.log(productsData)
    var counter = 0;
    const fetchData = async () => {
      counter = counter + 1;
      console.log(`попытка получить данные № ${counter}`);
      try {
        const data = await getItems();
        if (productsData.length < 1) {
          setProductsData(data);
          setCategoriesData(filterCats(data))
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (productsData.length < 1) {
      // console.log("данные о товарах не пришли с сервера");
      fetchData();
    } else {
      return;
    }
  }, [productsData]);


  return (
    <ProductsContext.Provider
      value={{ productsData, getInitialProducts, addToProducts, categoriesData }}
      // value={{ productsData, getInitialProducts, addToProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

