import React, { useState, useEffect } from 'react';
import './ShopCard.css';
import Item from '../../Components/Item/Item';

const ShopCard = () => {

  const categories = ["Все", "Футболки", "Толстовки", "Джинсы", "Шорты", "Юбски", "Куртки", "Плащи", "Кроссовки", "Сумки и клатчи", "Шарфы и платки", "Часы и украшения"];
  const genders = ["Все", "Мужчин", "Женщин ", "Детей"];

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedGender, setSelectedGender] = useState(0);
  const [dataProduct, setDataProduct] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('http://localhost:4000/allproducts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setDataProduct(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredProducts = dataProduct.filter(item => {

    const categoryFilter = selectedCategory === 0 || item.category === selectedCategory;
    const searchFilter = item.name.toLowerCase().includes(searchItem.toLowerCase());
    const genderFilter = selectedGender === 0 || parseInt(item.gender) === selectedGender;
    return categoryFilter && searchFilter && genderFilter

  });

  const handleGenderChange = (index) => {
    setSelectedGender(index);
  };

  return (

    <div className='shop-card__wrapper'>

      <div className='filter__wrapper'>
        <div className='search__filter'>
          <input
            type="text"
            placeholder="Поиск"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>

        <div className='category__filter'>
          {categories.map((item, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={index}
                checked={selectedCategory === index}
                onChange={() => setSelectedCategory(index)}
              />
              <p>{item}</p>
            </label>
          ))}
        </div>


        <div className='gender__filter'>
          {genders.map((item, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="gender"
                value={index}
                checked={selectedGender === index}
                onChange={() => handleGenderChange(index)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className='product__list'>
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            category={item.category}
            gender={item.gender}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCard;
