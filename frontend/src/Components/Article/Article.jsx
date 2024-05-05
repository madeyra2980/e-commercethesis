import React, { useState } from 'react';
import './Article.css';
import { GoPlusCircle } from "react-icons/go";
import vectorHand from '../Assets/hands.png';

const Article = () => {
    const [showParagraphs, setShowParagraphs] = useState([]);

    const showParagraphsHandler = (index) => {
        setShowParagraphs(prevState => {
            const updatedState = [...prevState];
            updatedState[index] = !updatedState[index];
            return updatedState;
        });
    };

    return (
        <>
            <div className='article__items'>
                <div className='vector__hand'>
                    <img src={vectorHand} alt="" />
                </div>
                <div className='article__title'>
                    <h1>В НАШИ КОМПЕТЕНЦИИ ВХОДИТ</h1>
                </div>

                <div className='article__items_flex'>
                    <ul>
                        <li>Модные тенденции и стиль
                            <GoPlusCircle
                                onClick={() => showParagraphsHandler(0)}
                                className={showParagraphs[0] ? 'article__plus__active' : 'article__plus'}
                            />
                        </li>
                        {showParagraphs[0] && (
                            <p className='active'>
                                Откройте для себя последние модные тенденции и найдите свой неповторимый стиль с нашими коллекциями одежды и аксессуаров.
                            </p>
                        )}
                        <hr />

                        <li>Индивидуальный подход к каждому клиенту
                            <GoPlusCircle
                                onClick={() => showParagraphsHandler(1)}
                                className={showParagraphs[1] ? 'article__plus__active' : 'article__plus'}
                            />
                        </li>
                        {showParagraphs[1] && (
                            <p className='active'>
                                Мы ценим вашу уникальность и предлагаем индивидуальный подход к каждому клиенту, помогая вам выразить свою личность через моду.
                            </p>
                        )}
                        <hr />

                        <li>Эксклюзивные коллекции и дизайнерские вещи
                            <GoPlusCircle
                                onClick={() => showParagraphsHandler(2)}
                                className={showParagraphs[2] ? 'article__plus__active' : 'article__plus'}
                            />
                        </li>
                        {showParagraphs[2] && (
                            <p className='active'>
                                Ознакомьтесь с нашими эксклюзивными коллекциями и найдите уникальные дизайнерские вещи, которые подчеркнут ваш индивидуальный стиль.
                            </p>
                        )}
                        <hr />

                        <li>Текстиль и аксессуары высокого качества
                            <GoPlusCircle
                                onClick={() => showParagraphsHandler(3)}
                                className={showParagraphs[3] ? 'article__plus__active' : 'article__plus'}
                            />
                        </li>
                        {showParagraphs[3] && (
                            <p className='active'>
                                Мы предлагаем только качественные текстильные изделия и аксессуары, которые будут служить вам долгие годы, сохраняя свой первоначальный вид и качество.
                            </p>
                        )}
                        <hr />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Article;
