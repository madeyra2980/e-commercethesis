import React, { useState } from 'react';
import './AddNews.css';
import cloudIcon from '../assets/cloud.png';

const AddNews = () => {
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newsDetails, setNewsDetails] = useState({
    image: "",
  });
  

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setNewsDetails({ ...newsDetails, image: e.target.files[0] });
  };

  const addNews = async () => {
    try {
      if (!image) {
        throw new Error('Изображение не выбрано');
      }

      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:4000/addnews', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Новость успешно добавлена');
        setErrorMessage('');
      } else {
        throw new Error('Ошибка при добавлении новости');
      }
    } catch (error) {
      console.error('Ошибка:', error.message);
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className='add-news'>
      <div className='add-news-itemfield'>
        <p>Изображение новости</p>
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : cloudIcon} width={140} alt='' />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>

      <button onClick={addNews} className='add-news-btn'>
        Добавить
      </button>

      {successMessage && <p className='success-message'>{successMessage}</p>}
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export default AddNews;
