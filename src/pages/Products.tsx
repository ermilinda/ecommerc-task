import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import './Product.css'
import Navbar from '../components/Navbar'

type Product = {
  _id?: string
  id?: number
  name: string
  price: number
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data)) 
      .catch(error => console.error('Error fetching products:', error))
  }, [])

  return (
    <div>
      <Navbar />
       <div className='container'>
      {products.map(product => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
    </div>
   
  )
}

export default Products
