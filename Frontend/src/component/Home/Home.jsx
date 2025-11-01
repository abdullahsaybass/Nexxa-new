import React from 'react'
import Header from '../Header'
import HeroBanner from './HeaderBanner'
import SearchBar from './SearchBar'
import Product from './Product'
import Footer from '../Footer'
const Home = () => {
  return (
    <div>
     
        
        <SearchBar />
        <HeroBanner />
        <Product />
      
    </div>
  )
}

export default Home
