import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './ProductDisplay.css';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');

    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart(product.id, selectedSize);
        } else {
            alert('Please select a size.');
        }
    };

    return (
        <div className="wrapperProductDisplay">
            <div className="productDisplay">
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>  
            </div>
            <div className="productdisplayRright">
                <h1>{product.name}</h1>
                <div className="productDisplayTitle">
                    <div className="dflex">
                        <p className="productPriice">{product.price}</p>
                        <p className="valuteItem"> /тенге</p>
                    </div>
                </div>
                <div className="productSizeOptions">
                    <p className="sizeTitle">Выберите размер:</p>
                    <div className="sizes">
                        {['S', 'M', 'L', 'XL'].map(size => (
                            <button
                                key={size}
                                className={`sizeButton ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="productdisplayRightDescription">
                    <p className="descriptionTitle">Описание:</p>
                    <p className='right-description'>{product.description}</p>
                </div>
                <button className="descriptionButton" onClick={handleAddToCart}>Добавить товар</button>
            </div>
        </div>
    );
};

export default ProductDisplay;
