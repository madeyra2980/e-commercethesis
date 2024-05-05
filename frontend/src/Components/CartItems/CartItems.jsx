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
  const TOKEN = "bot6942948164:AAFjHY4wZJMQpQZwtHjqAT-hwGe3nb-ix7g"
  const CHAT_ID = "1603524317"
  const telegramApiFetch = `https://api.telegram.org/${TOKEN}/sendMessage?chat_id=${CHAT_ID}`;


  const handleClickSendForm = (e) => {
    e.preventDefault()
    const orderItems = all_product.filter(item => cartItems[item.id] > 0);
    const orderLines = orderItems.map(item => `${item.name}: ${cartItems[item.id]} шт.`).join('\n');
    const totalAmount = getTotalCardAmount();


    const messageContent = `
    Имя: ${data.name}
    Номер телефона: ${data.phoneNumber}
    Адрес: ${data.address}
    Фамилия: ${data.surname}
    Заказ:\n${orderLines}\n\nОбщая сумма: ${totalAmount}тг`;
    fetch(telegramApiFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: messageContent }),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(data => {
        console.log('Message sent:', data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }


  const handleClickOpenModal = () => {
    setIsVisible(true);
  };

  return (
    <div className='cartitems'>

      <div className="cartitems-format-main">
        <p>Товар</p>
        <p>Название</p>
        <p>Цена</p>
        <p>Кол-во</p>
        <p>Общ-сумма</p>
        <p>Удалить</p>
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
                <MdDeleteForever style={{ fontSize: "34px", cursor:"pointer"}}  onClick={() => removeFromCard(e.id)} />
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
