import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null)
const getDefaultCart = () => { 
    let cart = {};
    for (let i = 0; i < 300+1; i++){
        cart[i] = 0;   
    }
    return cart
}


const ShopContextProvider = (props) =>{
    const [all_product, setAll_product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart())

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((resposnse)=>resposnse.json())
        .then((data)=>setAll_product(data))
    }, [])
  
    const addToCart = (itemId) => {
      setCartItems((prev)=>({...prev, [itemId] : prev[itemId]+1}))
      
    };
    const removeFromCard = (itemId) => {
        setCartItems((prev) => {
          const updatedCartItems = { ...prev };
      
          if (updatedCartItems[itemId] > 0) {
            updatedCartItems[itemId] -= 1;
          }
      
          return updatedCartItems;
        });
      };
     

      
    const getTotalCardAmount = () => {
        let totalAmount = 0;
    
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
    
        return totalAmount;
    };
    

    const getTotalCartItems = () => {
        let totalItem = 0;

        for(const item in cartItems){
            if(cartItems[item] > 0)
            {
                totalItem += cartItems[item]
            }
        }
        return totalItem
    }

    const contextValue = {getTotalCartItems, getTotalCardAmount,all_product, cartItems, addToCart, removeFromCard}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;


