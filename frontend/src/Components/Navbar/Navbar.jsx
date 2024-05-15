import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { CiShoppingBasket } from 'react-icons/ci';
import Button from '@mui/material/Button';
import './Navbar.css';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className='header'>
      <Link to='/'>
        <div className='header__logo__items'>
          <div className='header__logo'></div>
          <h2>NURMAD</h2>
        </div>
      </Link>

      <ul className='header__categories'>
        <li><Link to='/'>Домашняя страница</Link></li>
        <hr />
        <li><Link to={'/shop'}>Магазин</Link></li>
        <hr />
        <li><Link to='/contact'>Контактные данные</Link></li>
      </ul>
      
      <div className='header__cart'>
        <Link to='/cart'>
            <Button variant='text' startIcon={<CiShoppingBasket style={{ fontSize: "64px" }} />} style={{ color: 'black', fontSize:"26px"}}>
              <span>{getTotalCartItems()}</span>
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
