import React from 'react'
import './Breadcrum.css'
import { Link } from 'react-router-dom'


const BreadcrumSecond = (props) => {
  const {product} = props

  return (
    <div className='breadcrum'>
          <Link to = '/'>Домашняя страница</Link>> Магазин > Товары > {product.name}
    </div>
  )
}

export default BreadcrumSecond