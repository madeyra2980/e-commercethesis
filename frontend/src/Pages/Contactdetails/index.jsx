import React from 'react'
import './index.css'
import instagram from '../../Components/Assets/instagram.png'
import whatsapp from '../../Components/Assets/whatsapp.png'

const Contactdetails = () => {

    const ScrollToZero = () => {
        const HandleClick = () => {
            window.scrollTo(0,0)
        }
        React.useEffect(()=>{
            HandleClick()
        },[])
    }
    
    ScrollToZero()

    return (

        <div className='Contactdetails__container'>
            <div className='brand__item__card'>
                <h1>СВЯЖИТЕСЬ С НАМИ</h1>
                <p>+7 707 048 102</p>
                <p>ул. Абая 107</p>

                <div className='brands__item'>
                    <img width={40} src={instagram} alt="" />
                    <img width={46} src={whatsapp} alt="" />
                </div>
            </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.8058883679028!2d80.239116276401!3d50.40745507158398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42f2653d75232847%3A0x76056cd348d96fba!2z0YPQu9C40YbQsCDQkNCx0LDRjyAxMDcsINCh0LXQvNC10LkgMDcwMDAw!5e0!3m2!1sru!2skz!4v1711435073534!5m2!1sru!2skz" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    )
}

export default Contactdetails
