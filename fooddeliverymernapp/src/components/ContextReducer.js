import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {id: action.id, name: action.name, price: action.price, quantity: action.quantity, size: action.size, img: action.img}]
    
        case "REMOVE":
            let newArray = [...state]
            newArray.splice(action.index, 1)
            return newArray;
        case "UPDATE":
            let myArray = [...state]
            myArray.find((food, index) => {
                if (food.id === action.id) {
                    myArray[index] = { ...food, quantity: parseInt(action.quantity) + parseInt(food.quantity), price: action.price + food.price }
                }
                return myArray;
            })
            return myArray;
        case "DROP":
            let emptyArray = []
            return emptyArray;
        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);