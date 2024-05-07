import { millingTableNew } from "./constatnts";

export const filterCats = (array) => {
  const promoArray = array.filter(item => item.promo).sort((a, b) => a.order - b.order)
  const promoObject = {name: 'Новое в Pitcher', array: promoArray};
  const filterArray = array.filter(item => item.cat_id === 1).sort((a, b) => a.order - b.order)
  const filterObject = {name: 'Фильтр обжарка', array: filterArray};
  const espressoArray = array.filter(item => item.cat_id === 2).sort((a, b) => a.order - b.order)
  const espressoObject = {name: 'Эспрессо обжарка', array: espressoArray};
  const othersArray = array.filter(item => item.cat_id === 3).sort((a, b) => a.order - b.order)
  const othersObject = {name: 'Мерч', array: othersArray};
  const dripArray = array.filter(item => item.cat_id === 4).sort((a, b) => a.order - b.order)
  const dripObject = {name: 'Дрип кофе', array: dripArray};
  const newArray = [promoObject, filterObject, espressoObject, othersObject, dripObject]
  return newArray
};

export const changeArrayForCart = (array) => {
  const arrayForState = array.map(item => ({
    name: item.name,
    itemId: item._id,
    millingType: millingTableNew[0],
    price: item.price.map(item => ({
      title: item.title,
      priceItem: item.priceItem,
      quantity: 1
    })),
    // item.price,
    quantity: 1,
    promo: item.promo,
    currentSize: 0
  }))
  // console.log(arrayForState)
  return arrayForState;
}

export const getWordForCart = (summ) => {
  const num = summ % 100;
  let ending;
  if (num >= 11 && num <= 20) {
    ending = ' товаров ';
  } else {
    const lastDigit = num % 10;
      if (lastDigit === 1) {
      ending = ' товар ';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
    ending = ' товара ';
    } else {
    ending = ' товаров ';
    }
  }
  return(ending);
}






