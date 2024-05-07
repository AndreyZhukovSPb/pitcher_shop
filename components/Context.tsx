import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { OrderType, ProductType } from "../utils/sharedTypes";
import { millingTableNew } from '../utils/constatnts';

interface ICurrentProductFeatures {
  itemId: string,
  name: string,
  name_2?: string,
  millingType?: string,
  price: 
    {title: string,
    priceItem: number,
    quantity: number
    }[],
  quantity: number, // DEL?
  promo: boolean,
  currentSize: number,
  linkName: string,
  url: string
}

interface cartProps {
  orderData: OrderType[] | undefined; // Определяем тип данных для orderData
  addToOrder: (product: ProductType) => void; // Корректируем тип для функций
  removeFromOrder: (product: OrderType) => void;
  updateProductQuantity: (productId: string, delta?: number) => void;
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
}

export const CartContext = createContext<cartProps>({
  orderData: undefined,
  addToOrder: () => {}, // Пустая функция по умолчанию
  removeFromOrder: () => {}, 
  updateProductQuantity: () => {},
  updateMillingType:() => {},
  updatePriceType:() => {},
  updateQuantity:() => {},
  currentProductFeatures: undefined,
  resetQuantity:() => {},
  resetPriceType: () => {},
  resetMilling: () => {},
  setInitialProductList: () => {},
  updateMillingCart: () => {},
  updateQuantutyInCart: () => {},
  removeFromCart: () => {},
  resetCart: () => {}
});

export const CartContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [orderData, setOrderData] = useState<OrderType[]>([]); // Устанавливаем начальное значение orderData как пустой массив OrderType
  // const [currentMillingType, setCurrentMillingType] = useState<IMillingList[]>([]);
  const [currentProductFeatures, setCurrentProductFeatures] = useState<ICurrentProductFeatures[]>([]);

  const updateMillingType = (newId: string, value: string) => {
    setCurrentProductFeatures(prevState => 
      prevState.map(item => 
        item.itemId === newId ? { ...item, millingType: value } : item
      )
    );
  };

  const updateMillingCart = (product: OrderType, value: string) => {
    // console.log(id);
    setOrderData(prevState => 
      prevState.map(item => 
        (item._id === product._id && item.currentSize === product.currentSize) ? 
          { ...item, milling: value } : item
      )
    );
  }

  const updateQuantutyInCart = (product: OrderType, value: string) => {
    if (value === 'minus') {
      if (orderData.filter(item => item._id === product._id)
        .find(item => item.currentSize === product.currentSize).price.quantity  === 1) {
          return
      } else {
        setOrderData(prevState => 
          prevState.map(item => 
            (item._id === product._id && item.currentSize === product.currentSize) ?
              {...item, price: {...item.price, quantity: item.price.quantity - 1}}  
              : item
          )  
        )
      }
    } else if (value === "plus") {
      setOrderData(prevState => 
        prevState.map(item => 
          (item._id === product._id && item.currentSize === product.currentSize) ?
            {...item, price: {...item.price, quantity: item.price.quantity + 1}}  
            : item
        )  
      )
    }
  }

  const removeFromCart = (product: OrderType) => {
    setOrderData(prevState => 
      prevState.filter(item => !(item._id === product._id && item.currentSize === product.currentSize))
    );
  }

  useEffect(()=> { // DEL?
    // console.log(orderData);
    // console.log(currentProductFeatures);
  }, [orderData, currentProductFeatures])

  const resetPriceType = (newId: string) => {
    setCurrentProductFeatures(prevState => 
      prevState.map(item => 
        item.itemId === newId ? { ...item, currentSize: 0 } : item
      )
    );
  }

  const resetMilling = (newId: string) => {
    setCurrentProductFeatures(prevState => 
      prevState.map(item => 
        item.itemId === newId ? { ...item, millingType: millingTableNew[0] } : item
      )
    );
  }

  const resetQuantity = (newId: string, full?: boolean, index?: number) => {
    if (full) {
      setCurrentProductFeatures(prevState => 
        prevState.map(item => item.itemId === newId 
          ? { 
            ...item, 
            price: item.price.map((priceItem) => 
                ({ ...priceItem, quantity: 1 } )
            ) 
          } 
        : item
        ))
    } else {
      setCurrentProductFeatures(prevState => 
        prevState.map(item => item.itemId === newId 
          ? { 
            ...item, 
            price: item.price.map((priceItem, indx) => 
                indx === index ? ({ ...priceItem, quantity: 1 } ) : priceItem
            ) 
          } 
        : item
        ))
    }
  }

  const resetCart = () => {
    setOrderData([]);
  }

  const updateQuantity = (newId: string, value: string ) => {
    if (value === "minus") {
      // if (currentProductFeatures.find(item => item.itemId === newId).quantity === 1) {
      if (currentProductFeatures.find(item => item.itemId === newId)
        .price[currentProductFeatures.find(item => item.itemId === newId).currentSize].quantity 
          === 1) {
        return
      } else {
        setCurrentProductFeatures(prevState => 
          prevState.map(item => 
            // item.itemId === newId ? { ...item, quantity: item.quantity + 1 } : item
            item.itemId === newId 
            ? { 
              ...item, 
              price: item.price.map((priceItem, index) => 
                index === item.currentSize 
                  ? { ...priceItem, quantity: priceItem.quantity - 1 } 
                  : priceItem
              ) 
            } 
          : item
          ))
          // prevState.map(item => 
          //   item.itemId === newId ? { ...item, quantity: item.quantity - 1 } : item
          // ))
      }
    } else if (value === "plus") {
      setCurrentProductFeatures(prevState => 
        prevState.map(item => 
          // item.itemId === newId ? { ...item, quantity: item.quantity + 1 } : item
          item.itemId === newId 
          ? { 
            ...item, 
            price: item.price.map((priceItem, index) => 
              index === item.currentSize 
                ? { ...priceItem, quantity: priceItem.quantity + 1 } 
                : priceItem
            ) 
          } 
        : item
        ))
      }
  }

  const updatePriceType = (newId: string, value: number ) => {
    setCurrentProductFeatures(prevState => 
      prevState.map(item => 
        item.itemId === newId ? { ...item, currentSize: value } : item
      )
    );
  }

  const ProductList = React.useContext(ProductsContext).productsData;

  const setInitialProductList = () => {
    // console.log(ProductList);
    if (ProductList.length >= 1) {
      setCurrentProductFeatures(() => 
        ProductList.map(item => {
          if (item.cat_id === 1 || item.cat_id === 2) {
            return {
              name: item.name,
              name_2: item.name_2,
              itemId: item._id,
              millingType: millingTableNew[0],
              price: item.price.map(priceItem => ({
                title: priceItem.title,
                priceItem: priceItem.priceItem,
                quantity: 1
              })),
              quantity: 1,
              promo: item.promo, // DELETE?
              currentSize: 0,
              linkName: item.linkName,
              url: item.url
            };
          } else {
            return {
              name: item.name,
              itemId: item._id,
              price: item.price.map(priceItem => ({
                title: priceItem.title,
                priceItem: priceItem.priceItem,
                quantity: 1
              })),
              quantity: 1,
              promo: item.promo, // DELETE ?
              currentSize: 0,
              linkName: item.linkName,
              url: item.url
            };
          }
        })
      );
    }
    
  } 

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
  
  // useEffect(()=> {
  //   console.log(orderData);
  // }, [orderData])

  const addToOrder = (product: ProductType) => {
    console.log('here?')
    const itemForAdd = currentProductFeatures.find(item => item.itemId === product._id)
    // console.log(itemForAdd);
    const addedItem = {
      name: itemForAdd.name,
      name_2: itemForAdd.name_2 ? itemForAdd.name_2 : undefined,
      price: itemForAdd.price[itemForAdd.currentSize],
      url: itemForAdd.url,
      linkName: itemForAdd.linkName,
      quantity: itemForAdd.quantity,
      _id: itemForAdd.itemId,
      milling: itemForAdd.millingType ? itemForAdd.millingType : undefined,
      currentSize: itemForAdd.currentSize,
      cat_id: product.cat_id,
      subtitle: product.subtitle
    }
    setOrderData(prevOrderData => [...prevOrderData, { ...addedItem}]);
  };

  const removeFromOrder = (product: OrderType) => {
    console.log('or here')
    setOrderData(prevOrderData =>
      prevOrderData.filter(item => item._id !== product._id)
    );
  };

  

  // const updateProductQuantity = (productId: string, delta: number) => {
  //   console.log('or here')
  //   setOrderData(prevOrderData =>
  //     prevOrderData.map(item =>
  //       item.id === productId
  //         ? { ...item, quantity: Math.max(0, item.quantity + delta) }
  //         : item
  //     )
  //   );
  // }; // DEL?

  const updateProductQuantity = (productId: string, delta?: number) => {
    const itemForAdd = currentProductFeatures.find(item => item.itemId === productId);
    setOrderData(prevOrderData =>
      prevOrderData.map(item =>
        item._id === productId && item.currentSize === itemForAdd.currentSize
          ? { 
              ...item, 
              price: { 
                ...item.price, 
                quantity: Math.max(0, item.price.quantity + itemForAdd.price[itemForAdd.currentSize].quantity) 
              } 
            }
          : item
      )
    );
      }
  return (
    <CartContext.Provider 
      value=
        {{ 
          orderData, 
          addToOrder, 
          removeFromOrder, 
          updateProductQuantity, // DEL?
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
          resetCart
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
}

export const ProductsContext = createContext<ProductsProps>({
  productsData: undefined,
  addToProducts: () => {},
  getInitialProducts: () => {},
});

export const ProductsContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);

  const addToProducts = (products: ProductType[]) => {
    // console.log('добавили продукт в контекст')
    setProductsData(products);
  };

  const getInitialProducts = (products: ProductType[]) => {
    setProductsData(products);
  };

  // console.log('установили продакт лист')
  // console.log(productsData);

  return (
    <ProductsContext.Provider value={{ productsData, addToProducts, getInitialProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};


