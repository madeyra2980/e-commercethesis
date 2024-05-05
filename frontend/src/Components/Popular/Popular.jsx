import React from 'react'
import stylePopular from './Popular.module.css'
import Listproduct from '../Listproduct';

const Popular = () => {
  
  return (
    <div className={stylePopular.popular}>
      <div className={stylePopular.popularItems}>
      <Listproduct/>
      </div>
    </div>
  );
};

export default Popular;
