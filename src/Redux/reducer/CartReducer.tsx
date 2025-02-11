import { CartItemType } from "../../Type/ProductInterface";

interface CartState {
    cart: CartItemType[];
}

const getCartItemFromLS = () => {
    const storedCart = localStorage.getItem("cartdata");
    return storedCart ? JSON.parse(storedCart) : [];
};

console.log("getCartItemFromLS", getCartItemFromLS())

const initialState: CartState = { cart: getCartItemFromLS() };

type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItemType }
    | { type: "REMOVE_SINGLE_ITEM"; payload: { id: number; } }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "REMOVE_FROM_CART"; payload: number };

const cartItemReducer = (state: CartState = initialState, action: CartAction) => {
    switch (action.type) {

        case "ADD_TO_CART":
            const existing = state.cart.find((item) => item.id === action.payload.id);
            if (existing) {
                state = {
                    ...state, cart: state.cart.map((item) =>
                        item?.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
                localStorage.setItem("cartdata", JSON.stringify(state.cart));
                return state;
            } else {
                state = { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
                localStorage.setItem("cartdata", JSON.stringify(state.cart));
                return state;
            }

        case "REMOVE_SINGLE_ITEM":
            state = {
                ...state, cart: state.cart.map((item) =>
                    item?.id === action.payload.id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity } : item
                ),
            };
            localStorage.setItem("cartdata", JSON.stringify(state.cart));
            return state;
        // const existing = state.cart.find((item) => item.id === action.payload.id);
        // if (existing) {
        //     state= {
        //         ...state, cart: state.cart.map((item) =>
        //             item?.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        //         ),
        //     };
        //     localStorage.setItem("cartdata", JSON.stringify(state.cart)); 
        //     return state;
        // }else{
        //     state={ ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }]};
        //     localStorage.setItem("cartdata", JSON.stringify(state.cart)); 
        //     return state;
        // }

        case "UPDATE_QUANTITY":
            state = {
                ...state, cart: state.cart.map((item) => item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
                ),
            };
            localStorage.setItem("cartdata", JSON.stringify(state.cart));
            return state;

        case "REMOVE_FROM_CART":
            state = { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
            localStorage.setItem("cartdata", JSON.stringify(state.cart));
            return state;

        default:
            return state;
    }
};

export default cartItemReducer;