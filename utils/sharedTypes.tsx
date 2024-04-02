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
  linkName: string;
  quantity: number;
  milling: string;
  _id: string;
  currentSize: number;
  subtitle?: string;
}
