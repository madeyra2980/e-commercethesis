import React from 'react'
import './Breadcrum.css'
import { Link } from 'react-router-dom'


const Breadcrum = (props) => {
  const {product} = props

  return (
    <div className='breadcrum'>
          <Link to = '/'>Домашняя страница</Link>> Товары > {product.name}
    </div>
  )
}

export default Breadcrum