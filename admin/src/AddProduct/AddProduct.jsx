import React, { useState } from 'react';
import './AddProduct.css';
import cloudIcon from '../assets/cloud.png';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: '',
    gender: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('product', image);
      formData.append('category', productDetails.category);

      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const product = { ...productDetails, image: uploadData.image_url };

        const response = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const data = await response.json();

        if (data.success) {
          alert('Продукт добавлен');
        } else {
          alert('Не удалось добавить продукт');
        }
      } else {
        alert('Не удалось загрузить изображение');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Произошла ошибка при добавлении продукта');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Наименование товара</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Цена</p>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="text"
            name="price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Описание</p>
        <input
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          className="add-product-selector"
        />
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : cloudIcon}
            width={140}
            alt=""
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>

      <div className="addproduct-itemfield">
        <p>Пол</p>
        <select
          value={productDetails.gender}
          onChange={changeHandler}
          name="gender"
          className="add-product-selector"
        >
          <option value="">Пол</option>
          <option value="1">Мужчина</option>
          <option value="2">Женщина</option>
          <option value="3">Детей</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <p>Категория</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="0">Все</option>
          <option value="1">Футболки</option>
          <option value="2">Толстовки</option>
          <option value="3">Джинсы</option>
          <option value="4">Шорты</option>
          <option value="5">Юбки</option>
          <option value="6">Куртки</option>
          <option value="7">Плащи</option>
          <option value="8">Кроссовки</option>
          <option value="9">Сумки и клатчи</option>
          <option value="10">Шарфы и платки</option>
          <option value="11">Часы и украшения</option>
        </select>
      </div>

      <button
        onClick={addProduct}
        className="addproduct-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Добавление...' : 'Добавить'}
      </button>
    </div>
  );
};

export default AddProduct;
