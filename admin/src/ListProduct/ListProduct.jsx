import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../assets/delete.png';

const ListProduct = () => {
  const [allproduct, setAllproduct] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllproduct(data);
      });
  };

  console.log(allproduct);

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>Товары</h1>
      <table className='listproduct-table'>
        <thead>
          <tr>
            <th>ТОВАРЫ</th>
            <th>НАЗЫВАНИЯ</th>
            <th>ЦЕНА</th>
            <th>КАТЕГОРИЙ</th>
            <th>УДАЛИТЬ</th>
          </tr>
        </thead>
        <tbody>
          {allproduct.map((product, index) => (
            <tr key={index}>
              <td>
                <img src={product.image} className='listproduct-product-icon' alt="" />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <img
                  onClick={() => remove_product(product.id)}
                  width={50}
                  src={cross_icon}
                  className='remover-icon'
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
