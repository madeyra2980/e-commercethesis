import React, { useContext } from 'react'
import styleDisplay from './ProductDisplay.module.css'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props
    const { addToCart } = useContext(ShopContext)

    return (
        <div className={styleDisplay.wrapperProductDisplay}>
            <div className={styleDisplay.productDisplay}>

                    <div className="productdisplay-img">
                        <img className='productdisplay-main-img' src={product.image} alt="" />
                    </div>  

                </div>
                <div className={styleDisplay.productdisplayRright}>
                    <h1>{product.name}</h1>

                    <div className={styleDisplay.productDisplayTitle}>
                       <div className={styleDisplay.dflex}>
                            <p className={styleDisplay.productPriice}>{product.price}</p>
                            <p className={styleDisplay.valuteItem}> /тенге</p>
                        </div>
                    </div>

                    <div className={styleDisplay.productdisplayRightDescription}>
                        <p className={styleDisplay.descriptionTitle}>Описание:</p>
                        <p className='right-description'>{product.description}</p>
                    </div>


                    <button className={styleDisplay.descriptionButton} onClick={() => addToCart(product.id)}>Добавить товар</button>
                </div>
            </div>
    )
}

export default ProductDisplay