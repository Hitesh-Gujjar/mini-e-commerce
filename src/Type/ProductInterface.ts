interface ProductType {
    id: number;
    title: string;
    price: number;
    image: string;
    category:string;
    description:string;
    rating:any;
}

interface CartItemType {
    cart: any;
    id: number;
    title: string;
    price: number;
    quantity: number;
  }
export type {ProductType, CartItemType}