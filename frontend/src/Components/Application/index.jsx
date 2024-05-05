import React, { useContext, useState } from 'react';
import './index.css';
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
    <div className="form-submit">
      {!submitted ? (
        <form onSubmit={handleSubmit}> 
          <label>
            <input
              placeholder='Имя'
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              placeholder='Фамилия'
              type="text"
              name="surname"
              value={data.surname}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              placeholder='Номер телефона'
              type="tel"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              placeholder='Адрес'
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Отправить</button>
        </form>
      ) : (
        <div className='thanks'>
          <h2>Спасибо за отправку формы!</h2>
          <button onClick={()=>setSubmitted(false)}>Закрыт</button>
        </div>  
      )}
    </div>
  );
};

export default Application;
