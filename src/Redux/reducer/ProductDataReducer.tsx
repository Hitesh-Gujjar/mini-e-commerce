import { CartItemType, ProductType } from "../../Type/ProductInterface";


const initialState: ProductType [] =  [];

type CartAction =
   { type: "ADD_PRODUCT_LIST"; payload:CartItemType  }


const productItemReducer = (state:ProductType [] = initialState, action: CartAction) => {
    switch (action.type) {

        case "ADD_PRODUCT_LIST":
            return action.payload;

        default:
            return state;
    }
};

export default productItemReducer;