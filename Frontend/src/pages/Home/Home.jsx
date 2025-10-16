import React from 'react'
import HeroSwiper from '../../components/HeroSwiper/HeroSwiper'
import ShowNow from '../../components/ShowNow/ShowNow'
import KachaBazar from '../../components/kachaBazar/KachaBazar'
import FeaturedCategory from '../../components/FeaturedCategory/FeaturedCategory'
import VegitablesProducts from '../../components/VegitablesProducts/VegitablesProducts'
import DeliveryBanner from '../../components/DeliveryBanner/DeliveryBanner'
import LatesProduct from '../../components/LatesProduct/LatesProduct'
import CategorySwiper from '../../components/CategorySwiper/CategorySwiper'

const Home = () => {
  return (
    <div>
      <HeroSwiper />
      <ShowNow />
      <CategorySwiper/>
      <FeaturedCategory/>
      <VegitablesProducts/>
      <DeliveryBanner/>
      <LatesProduct/>
      <KachaBazar />
    </div>
  )
}

export default Home
