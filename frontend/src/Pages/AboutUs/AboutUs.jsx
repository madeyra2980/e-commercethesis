import React from 'react';
import './AboutUs.css';
import InfiniteCarousel from '../../Components/InfiniteCarousel/InfiniteCarousel';
import 'animate.css/animate.min.css';

const images = [
    'Assets/1.jpeg',
    'Assets/2.jpeg',
    'Assets/3.jpeg',
    'Assets/4.jpeg',
    'Assets/5.jpeg',
    'Assets/6.jpeg',
    'Assets/7.jpeg',
    'Assets/8.jpeg',
    'Assets/9.jpeg',
    'Assets/10.jpeg',
    'Assets/11.jpeg',
    'Assets/12.jpeg',
    'Assets/13.jpeg',
    'Assets/14.jpeg',
    'Assets/15.jpeg',
    'Assets/16.jpeg',
    'Assets/18.jpeg',
];

const ScrollToZero = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    React.useEffect(() => {
        handleClick();
    }, []);
};

const AboutUs = () => {
    ScrollToZero();

    return (
        <div className='about-us-container animate__animated animate__fadeInUp'>
            <div className='about-us-items animate__animated animate__fadeInUp'>
                <div className='about-us-title'>
                    <h1>О НАС</h1>
                </div>

                <div className="aboutus-card-items">
                    <div className='card-item animate__animated animate__fadeInUp'>
                        <h3>Тенденции моды</h3>
                        <img src="Assets/clock.jpg" alt="" width={150} />
                        <p>Мы следим за последними тенденциями в мире моды и предлагаем вам только самые стильные и актуальные товары.</p>
                    </div>

                    <div className='card-item animate__animated animate__fadeInUp'>
                        <h3>Индивидуальный стиль</h3>
                        <img src="Assets/pacan.jpg" alt="" width={200} />
                        <p>У нас вы найдете уникальные вещи, позволяющие выразить свой индивидуальный стиль и подчеркнуть свою личность.</p>
                    </div>

                    <div className='card-item animate__animated animate__fadeInUp'>
                        <h3>Качество и комфорт</h3>
                        <img src="Assets/tools.png" alt="" width={240} />
                        <p>Мы гарантируем высокое качество и комфорт в каждой детали наших изделий, чтобы вы чувствовали себя уверенно и комфортно в любой ситуации.</p>
                    </div>
                </div>
            </div>

            <div className="second-container animate__animated animate__fadeInUp">
                <div className="title-container animate__animated animate__fadeInUp">
                    <h1>Индивидуальный стиль для каждого</h1>
                </div>

                <div className='item-descriptions animate__animated animate__fadeInUp'>
                    <div className="product-item-description animate__animated animate__fadeInUp">
                        <h1>Особенности нашего магазина</h1>
                        <p>
                            Мы стремимся предложить вам только лучшие товары, соответствующие последним модным тенденциям, при этом сохраняя высокое качество и доступные цены.
                        </p>
                    </div>

                    <div className="product-item-description animate__animated animate__fadeInUp">
                        <h1>Наш ассортимент</h1>
                        <ul>
                            <li>- Одежда для всех возрастов и размеров</li>
                            <li>- Аксессуары, подчеркивающие ваш стиль</li>
                            <li>- Эксклюзивные коллекции от известных дизайнеров</li>
                        </ul>
                    </div>
                </div>

                <div className='infinte-carousel animate__animated animate__fadeInUp'>
                    <InfiniteCarousel visibleItemsCount={3} withIndicator isInfinite>
                        {images.map((imagePath, index) => (
                            <div key={index}>
                                <img src={imagePath} alt={`Image ${index}`} />
                            </div>
                        ))}
                    </InfiniteCarousel>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
