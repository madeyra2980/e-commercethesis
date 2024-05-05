import React from 'react'
import itemStyle from './Item.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'


const Item = (props) => {

  const { addToCart } = useContext(ShopContext)


  return (
    <div className={itemStyle.item}>
      <div className={itemStyle.itemCard}>
        <Link to={`/product/${props.id}`}><img onClick={() => { window.scrollTo(0, 0) }} src={props.image} alt="" /></Link>
        <div className={itemStyle.itemWrapper}>
          <div className={itemStyle.itemPrices}>
            <p className={itemStyle.itemTitle}>{props.name}</p>
            <p className={itemStyle.priceItem}><strong>{props.price}/тг</strong></p>
          </div>
        </div>
        <button className={itemStyle.ItemBtn} onClick={() => addToCart(props.id)}>Добавить</button>
      </div>
    </div>
  )

}

export default Item
