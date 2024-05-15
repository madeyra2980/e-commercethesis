import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import Visibleform from '../Visibleform'
import { AnotherContext } from '../../Context/AnotherProvider';
import { MdDeleteForever } from "react-icons/md";

const ScrollToZero = () => {
  const HandleClick = () => {
    window.scrollTo(0, 0)
  }
  React.useEffect(() => {
    HandleClick()
  }, [])
}

const CartItems = () => {

  ScrollToZero()

  const { all_product, getTotalCardAmount, cartItems, removeFromCard } = useContext(ShopContext);
  const { isVisible, setIsVisible, data } = useContext(AnotherContext);
  console.log(all_product)
  const handleClickSendForm = async (e) => {
    e.preventDefault();
  

    const orderItems = all_product
    .filter((item) => cartItems[item.id] > 0)
    .map((item) => ( 
    {
      productName: item.name,
      quantity: cartItems[item.id],
      price: item.price // Добавляем поле price
      }
    ));

    console.log("PC", orderItems)
    const totalAmount = getTotalCardAmount();
  
    const orderData = {
      name: data.name,
      email:data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      surname: data.surname,
      cartNumber: data.cartNumber,
      cvv: data.cvv,
      dataCart: data.dataCart,
      orderItems,
      totalAmount,
      
    };
  
    try {
      const response = await fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      console.log("Order placed successfully");
    } catch (error) {
      // Handle errors
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  

  const handleClickOpenModal = () => {
    setIsVisible(true);
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main row">
        <p className="col">Товар</p>
        <p className="col">Название</p>
        <p className="col">Цена</p>
        <p className="col">Кол-во</p>
        <p className="col">Общ-сумма</p>
        <p className="col">Удалить</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>{e.price}тг</p>
                <button className='caritems-quantity'>{cartItems[e.id]}</button>
                <p>{e.price * cartItems[e.id]}тг</p>
                <MdDeleteForever style={{ fontSize: "34px", cursor: "pointer" }} onClick={() => removeFromCard(e.id)} />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Сумма корзины</h1>
          <div>
            <div className='cartitems-total-item'></div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Общая сумма</h3>
              <h3>{getTotalCardAmount()}тг</h3>
            </div>
          </div>
          <button onClick={handleClickOpenModal}>СДЕЛАТЬ ЗАКАЗ</button>
        </div>
      </div>

      {isVisible && (
        <div className="isVisibleNone">
          <Visibleform
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            handleClickSendForm={handleClickSendForm}
          />
        </div>
      )}
    </div>
  );
};

export default CartItems;
