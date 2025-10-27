import React from 'react'
import Header from '../Header'
import HeroBanner from './HeaderBanner'
import SearchBar from './SearchBar'
import Product from './Product'
import Footer from '../Footer'
const Home = () => {
  return (
    <div>
      <Header />
        <HeroBanner />
        <SearchBar />
        <Product />
      <Footer />
    </div>
  )
}

export default Home
