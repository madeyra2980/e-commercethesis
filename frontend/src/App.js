import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import AboutUs from './Pages/AboutUs/AboutUs';
import ShopCard from './Pages/Categories/ShopCard';
import Footer from './Components/Footer';
import Contactdetails from './Pages/Contactdetails';
import NavbarBurger from './Components/Navbar/NavbarBurger';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <NavbarBurger/>

        <div className='top-title'>
          <h1>NURMAD</h1>
          <h1>Интернет магазин</h1>
        </div>

        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/shop' element={<ShopCard/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/contact' element={<Contactdetails/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );  
}

export default App;
