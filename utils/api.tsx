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
