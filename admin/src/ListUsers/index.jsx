import React, { useEffect, useState } from 'react';
import './Listuser.css'

const ListUsers = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const removeOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/orders/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      await fetchOrders();
    } catch (error) {
      console.error('Error removing order:', error);
    }
  };

  return (
    <div className='list-users'>
      <h1>Заказы</h1>
      <table className='orders-table'>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Номер телефона</th>
            <th>Адрес</th>
            <th>Номер карты</th>
            <th>Дата карты</th>
            <th>Товары</th>
            <th>Общая сумма</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.surname}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.address}</td>
              <td>{order.cartNumber}</td>
              <td>{order.dataCart}</td>
              <td>
                {order.orderItems.map((item) => (
                  <div key={item._id}>
                    <p>{item.productName}</p>
                    <p>{item.quantity}</p>
                  </div>
                ))}
              </td>
              <td>{order.totalAmount}</td>
              <td>
                <button onClick={() => removeOrder(order._id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;