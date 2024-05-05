import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Navbar/Sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProduct from '../../AddProduct/AddProduct'
import ListProduct from '../../ListProduct/ListProduct'
import AddNews from '../../AddNews'
import DeleteNews from '../../DelNews'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
        <Routes>
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/listproduct' element={<ListProduct/>} />
          <Route path='/addnews' element={<AddNews/>} />
          <Route path='/delNews' element={<DeleteNews/>} />

        </Routes>
    </div>
  )
}

export default Admin
