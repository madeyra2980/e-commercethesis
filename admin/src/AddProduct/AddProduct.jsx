import React, { useState } from 'react'
import './AddProduct.css'
import cloudIcon from '../assets/cloud.png'

const AddProduct = () => {

  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: " ",
    gender: ""
    
  })
  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_product = async () => {
    let responseData;
    let product = productDetails

    let formData = new FormData()
    formData.append('product', image)
    formData.append('category', productDetails.category) 

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    }).then((resp) => resp.json()).then((data) => { responseData = data })

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      product.category = productDetails.category;

      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Добавлен Продукт") : alert("Failed")
      })
    }
  }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Товардың аты</p>
        <input value={productDetails.name}
          onChange={changeHandler}
          type='text' name='name'  />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Бағасы</p>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="text" name='price'  />
        </div>


      </div>

      <div className="addproduct-itemfield">
        <p>Деректер</p>
        <input
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          className='add-product-selector' id=""
        />
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : cloudIcon} width={140} alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>

      <div className="addproduct-itemfield">
        <p>Пол</p>
        <select
          value={productDetails.gender}
          onChange={changeHandler}  
          name = "gender"
          className='add-product-selector' >

          <option value="">жыныс</option>
          <option value="1">ерлерге </option>
          <option value="2">әйелдерге</option>
          
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Категориялар</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className='add-product-selector'
        >

          <option value="0">Бәрі</option>
          <option value="1">Футолкалар</option>
          <option value="2">Жейделер</option>
          <option value="3">Джинсілер</option>
          <option value="4">Шортылар</option>
          <option value="5">Қарындаш юбкалар</option>
          <option value="6">Курткалар</option>
          <option value="7">Плащи</option>
          <option value="8">Кроссовки </option>
          <option value="9">Сумки и клатчи </option>
          <option value="10">Шарфы и платки</option>
          <option value="11">Часы и украшения</option>
        </select>
      </div>


      <button
        onClick={() => Add_product()}
        className='addproduct-btn'>
        Добавить
      </button>
    </div>
  )
}

export default AddProduct