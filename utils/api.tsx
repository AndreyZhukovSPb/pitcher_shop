import { baseURL } from "./constatnts";

export async function getItemByLinkName(linkName: string) {
  const url = `${baseURL}link/${linkName}`;
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


export async function postOrder(client, orderData, total) {
  // console.log(client, orderData, total)
  const url = `${baseURL}orders`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({client, orderData, total}),
    });
    const data = await res.json();
    return (
      data
      // console.log(data)
    );
  } catch (error) {
    console.log(error)
    throw error;
  }
}

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
