import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import './index.css'

const Listproduct = () => {
    
    const [data_product, setData_product] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setData_product(data));
    }, []);

    return (

        <div className='list-products'>
            {data_product.map((item, i) => (
                <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    category={item.category}
                />
            ))}
        </div>
    );
}

export default Listproduct;
