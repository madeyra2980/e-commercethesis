import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.jpg'
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { IoMdClose } from "react-icons/io";

const NavbarBurger = () => {
  const { getTotalCartItems } = useContext(ShopContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="nav">
        <div className="nav-header">
          <div className="nav-title">
            <h1>NURMAD</h1>
          </div>
          <div className="nav-toggle">
            <IoMdMenu  onClick={()=>handleToggle()}/>
          </div>
          <div className={isOpen?"nav-links":"nav-links-show"}>
            <div className="nav-title">
              <h1 style={{ fontSize: "11px" }}>NURMAD</h1>
            </div>
            <Link to="/">Домашняя страница</Link>
            <hr />
            <Link to="/shop">Магазин</Link>
            <hr />
            <Link to="/about">О нас</Link>
            <hr />
            <Link to="/contact">Контактные данные</Link>
            <hr />
            <Link to="/cart">
                Корзина
            <div className='header__count'>
              <div className='heaeder__cart__count'>
                <span>{getTotalCartItems()}</span>
              </div>
              </div>
              <hr />
            </Link>
            <div className='background__opacity__close'>
                <span><IoMdClose onClick={()=>handleToggle()}/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarBurger