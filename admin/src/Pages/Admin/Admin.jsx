import React from 'react'
import './Admin.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddProduct from '../../AddProduct/AddProduct'
import ListProduct from '../../ListProduct/ListProduct'
import AddNews from '../../AddNews'
import DeleteNews from '../../DelNews'
import ListUsers from '../../ListUsers'

const Admin = () => {
  return (
    <div className='admin_items'>
       <div className='list_items'>
      <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
        <div className='sidebar-item'>
          <p>Добавить товар</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
        <div className='sidebar-item'>
          <p>Товары</p>
        </div>
      </Link>
      <Link to={'/addnews'} style={{ textDecoration: "none" }}>
        <div className='sidebar-item'>
          <p>Добавить новости</p>
        </div>
      </Link>

      <Link to={'/delNews'} style={{ textDecoration: "none" }}>
        <div className='sidebar-item'>
          <p>Удалить новости</p>
        </div>
      </Link>

      <Link to={'/orders'} style={{ textDecoration: "none" }}>
        <div className='sidebar-item'>
          <p>Заказы</p>
        </div>
      </Link>
      </div>
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
        <Route path='/addnews' element={<AddNews />} />
        <Route path='/delNews' element={<DeleteNews />} />
        <Route path='/orders' element={<ListUsers />} />
      </Routes>

   
    </div>
  )
}



export default Admin
