import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../assets/delete.png'


const ListProduct = () => {

  const [allproduct, setAllproduct] = useState([])

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllproduct(data)})
  }

  console.log(allproduct)

  useEffect(()=>{
    fetchInfo()
  }, [])

  const remove_product = async (id) =>{
    await fetch('http://localhost:4000/removeproduct', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();  
  }

  return (
    <div className='list-product'>
      <h1>ТОВАРЫ</h1>

      <div className='listproduct-format-main'>
        <p>ТОВАРЫ</p>
        <p>НАЗЫВАНИЯ</p>
        <p>ЦЕНА</p>
        <p>КАТЕГОРИЙ</p>
        <p>УДАЛИТЬ</p>
      </div>

      <div className="listproduct-allproduct">
        <hr/>
<>
        {
          allproduct.map((product, index)=>{
              return <div
              key={index}
              className="listproduct-format-main listproduct-format">
                  <img src={product.image} 
                  className='listproduct-product-icon'
                  alt="" />
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <p>{product.category}</p>
                  <img
                  onClick={()=>remove_product(product.id)}
                  width={50}
                  src={cross_icon}
                  className='remover-icon' alt="" />
              </div>
          })
        }
        </>
      </div>
    </div>
  )
}

export default ListProduct