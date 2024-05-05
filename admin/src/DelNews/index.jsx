import React, { useEffect, useState } from 'react';
import './DelNews.css';
import crossIcon from '../assets/delete.png';

const DeleteNews = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:4000/news');
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };
  const removeNews = async (id) => {
    try {
      await fetch('http://localhost:4000/removenews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }), // Здесь используется правильное поле
      });
      fetchNews(); 
    } catch (error) {
      console.error('Failed to remove news:', error);
    }
  };
  
  
  return (
    <div className="list-news">
      <h1>ДОБАВИТЬ НОВОСТИ</h1>
      <div className="list-news-header">
        <p>ИЗОБРАЖЕНИЙ</p>
        <p>УДАЛИТЬ</p>
      </div>
      <div className="list-news-items">
        {newsList.map((news) => (
          <div key={news._id} className="list-news-item">
            <img src={news.image} alt="" className="news-image" />
            <img
              src={crossIcon}
              alt="Remove"
              className="remove-icon"
              onClick={() => removeNews(news._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteNews;
