import React from 'react';
import Application from '../Application';
import { VscChromeClose } from "react-icons/vsc";
import './index.css'

const Visibleform = ({ isVisible, setIsVisible, handleClickSendForm }) => {
  return (
    <div>
      {isVisible && (
       <div className='application-wrapper'> 
        <div className='application-form'>
          <VscChromeClose className='closeIcon' onClick={() => setIsVisible(false)} />
          <div className='border-form-parrent'>
            <div className='border-form-title'>
              <h1>Прежде чем сделать заказ, необходимо заполнить все данные</h1>
              <Application handleClickSendForm={handleClickSendForm} />
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default Visibleform;
