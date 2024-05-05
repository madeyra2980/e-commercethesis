import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <p>Добавить товар</p>
            </div>
        </Link>
        <Link to={'/listproduct'}  style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <p>ТОВАРЫ</p>
            </div>
        </Link>
        <Link to={'/addnews'}  style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <p>Добавить новости</p>
            </div>
        </Link>

        <Link to={'/delNews'}  style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <p>УДАЛИТЬ новости</p>
            </div>
        </Link> 
    </div>
  )
}

export default Sidebar