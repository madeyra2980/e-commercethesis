import React from 'react'
import Popular from '../Components/Popular/Popular'
import Article from '../Components/Article/Article'
import NewsSlider from '../Components/NewsSlider/NewsSlider'

const ScrollToZero = () => {
  const HandleClick = () => {
    window.scrollTo(0, 0)
  }
  React.useEffect(() => {
    HandleClick()
  }, [])
}

const Shop = () => {

  ScrollToZero()

  return (
    <div>
      <NewsSlider />
      <Article />
      <Popular /> 
    </div>
  )
}
export default Shop