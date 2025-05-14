import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Product.css';
import Navbar from '../components/Navbar';

type Product = {
  _id?: string;
  id?: number;
  name: string;
  price: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className='products-header'>
        <h1>Our Products</h1>
        <p>
          Discover our premium selection of products designed for your needs
        </p>
      </div>

      {loading && <div className='loading'>Loading products...</div>}

      {error && (
        <div className='error'>
          <p>Error loading products: {error}</p>
          <p>Please try again later.</p>
        </div>
      )}

      {!loading && !error && (
        <div className='container'>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
