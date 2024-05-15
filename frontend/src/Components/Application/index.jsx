import React, { useContext, useState } from 'react';
import './Application.css';
import { AnotherContext } from '../../Context/AnotherProvider';

const Application = ({ handleClickSendForm }) => {
  const { data, setData } = useContext(AnotherContext);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setSubmitted(true);
    handleClickSendForm(event);
  };

  return (
    <div className="form-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              name="surname"
              value={data.surname}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Номер телефона:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Адрес:</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Номер карты:</label>
            <input
              type="text"
              name="cartNumber"
              value={data.cartNumber}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Дата карты:</label>
            <input
              type="text"
              name="dataCart"
              value={data.dataCart}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={data.cvv}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">Отправить</button>
        </form>
      ) : (
        <div className="thanks">
          <h2>Спасибо за отправку формы!</h2>
        </div>  
      )}
    </div>
  );
};

export default Application;
  