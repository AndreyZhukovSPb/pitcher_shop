export interface ProductType {
  name: string;
  name_2?: string;
  subtitle?: string;
  cat_id: number;
  price: [
    {title: string,
    priceItem: number,
    quantity: number
    }
  ];
  url: string;
  urlLarge: string;
  promo?: boolean;
  description: {
    // type?: string;
    roastingType?: string;
    variaty: string;
    flavour?: string;
    about: string;
  };
  balance: {
    switness: number;
    accidity: number;
    bitterness: number;
    // _id: string;
  };
  soldOut: boolean;
  order: number;
  linkName: string;
  _id: string;
  aboutFull?: string[];
}

export interface OrderType {
  name: string;
  name_2?: string;
  cat_id: number;
  price: 
    {title: string,
    priceItem: number,
    quantity: number
    };
  url: string;
  urlLarge: string;
  linkName: string;
  quantity: number;
  milling: string;
  _id: string;
  currentSize: number;
  subtitle?: string;
}

interface AdminOrderType {
  name: string;
  name_2?: string;
  price: 
    {title: string,
    priceItem: number,
    quantity: number
    };
  milling?: string;
  _id: string;
}

interface AdminClientType {
  comment?: string;
  deliveryPoint?: string;
  address?: string;
  deliveryType: string;
  email: string;
  name: string
  phone: string
}

export interface AdminDataType {
  order: AdminOrderType[];
  client: AdminClientType;
  isPayed: boolean;
  date: string;
  time: string;
  number: number;
  total: number;
  _id: string
}


