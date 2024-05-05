import React from 'react';
import './NotProduct.css'

const NotProduct = () => {
  return (
    <div className="not-product-container">

      <p className="not-product-message">
      К сожалению, мы не можем найти товары в этой категории. Попробуйте выбрать другую категорию или вернитесь позже!
      </p>
    </div>
  );
};

export default NotProduct;
