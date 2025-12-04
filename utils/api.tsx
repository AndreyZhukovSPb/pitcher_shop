import axios from 'axios';
import { baseURL } from "./constatnts";

export async function getItemByLinkName(linkName: string) {
  const url = `${baseURL}link/${linkName}`;
  try {
    const res = await fetch(url);
      if (res.status === 404 || res.status === 500) {
      // console.log(res)
      return null; // возвращаем null, если нет товара
    }
    const data = await res.json();
    return data 
  } catch (error) {
    // console.log(error);
    return null;
    // throw error;
  }
}

export async function getItems() {
  const url = `${baseURL}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data 
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export const request = async (
//   endpoint: string,
//   options: RequestInit
// ): Promise<any> => {
//   const url = `${baseURL}${endpoint}`;
//   return await fetch(url, options).then(checkResponse);
// };

// export const postPayment = async (
//   // deliveryType: string,
//   // name: string,
//   // phone: string,
//   // deliveryAddress: string,
//   // deliveryDate: string,
//   // deliveryPrice: number,
//   // finalPrice: number
// ): Promise<any> => {
//   return await request('/orders/order/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify({ deliveryType, name, phone, deliveryAddress, deliveryDate, deliveryPrice, finalPrice }),
//   });
// };


// export async function postOrder(client, orderData, total) {
//   const url = `${baseURL}orders`;
//   try {
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({client, orderData, total}),
//     });
//     const data = await res.json();
//     // console.log(data)
//     return (
//       data
//     );
//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// }

export async function postOrder(client, orderData, total) {
  const url = `${baseURL}orders`;
  // console.log(orderData)
  try {
    const res = await axios.post(url, {
      client,
      orderData,
      total
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 40000
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function login(data) {
  const url = `${baseURL}login`;
  try {
    const res = await axios.post(url, {
      password: data
    },
      {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 40000
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function auth(data) {
  const url = `${baseURL}auth`;
  try {
    const res = await axios.post(url, {},
      {
      headers: {
        'Content-Type': 'application/json',
        'customtoken': `Bearer ${data}`
      },
      timeout: 40000
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getOrders(token) {
  const url = `${baseURL}orders`;
  try {
    const res = await axios.get(url,
      {
      headers: {
        'Content-Type': 'application/json',
        'customtoken': `Bearer ${token}`
      },
      timeout: 40000
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function checkOrder(bankOrderId) {
  const url = `${baseURL}order/payment`;
  try {
    const res = await axios.post(url, {
      bankOrderId
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 120000
      // timeout: 3
    });
    console.log(res.data.message) // оставить для того чтобы дебажить боевой
    if (res.data.error) {
      console.log('debug')
      return { success: true, status: true, dataBaseError: true }
    } else {
      return { success: true, status: true, data: res.data }
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return {
          success: true,
          status: false
        };
      } else if (error.response.status === 500) {
        return {
          success: false,
          status: undefined,
        };
      } else {
        return {
          success: false,
          status: undefined,
        }
      } 
    } else if (error.request) {
      return {
        success: false,
        status: undefined,
      }
    } else {
      return {
        success: false,
        status: undefined,
      }
    }
  }
}

export async function checkPromo(promocode: string) {
  const url = `${baseURL}promocodes`;
  try {
    const res = await axios.post(url, {
      promocode,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 40000
    });
    if (!res.data.valid) {
      return {
        success: true,
        valid: false,
      };
    } else {
      return {
        success: true,
        valid: true,
        value: res.data.discount
      };
    }
    
  } catch (error) {
    // if (error.response.status === 404 || error.response.status === 500) {
    //   return {
    //     success: false,
    //     valid: undefined,
    //   }
    // } else {
    //   throw error;
    // } 
    throw error;
  }
}


// export async function checkOrder(bankOrderId) {
//   console.log('debug')
//   const url = `${baseURL}order/payment`;
//   try {
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({bankOrderId}),
//     });
//     console.log(res.status)
//     const data = await res.json();
//     console.log(data)
//     console.log(`ответ после проверки успешности платежа${data.order}`)
//     return (
//       data
//     );
//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// }

// export async function postOrder1(data) {
//   const url = `${baseURL}orders`;
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to post order');
//     }

//     // Если требуется получить данные из ответа сервера, можно сделать так:
//     // const responseData = await response.json();

//     // Возвращаем успешный результат
//     return {
//       success: true,
//     };
//   } catch (error) {
//     console.error('Error posting order', error);
//     throw error;
//   }
// }
