import React from 'react';
import './ProductCard.css';
import productImage from '../images/imgg.jpg';
import { useCartStore } from '../store/cartStore';
import { toast } from 'react-hot-toast';

type Product = {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  isNew?: boolean;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product._id) {
      console.error('Product ID is missing');
      return;
    }

    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: productImage,
    });

    toast.success(`Added ${product.name} to cart!`);
  };

  // For demo purposes, randomly mark some products as new
  const isNewProduct =
    product._id &&
    parseInt(product._id.substring(product._id.length - 2), 16) % 3 === 0;

  return (
    <div className='containerCard'>
      {isNewProduct && <span className='badge'>New</span>}
      <div className='image'>
        <img src={productImage} alt={product.name} />
      </div>
      <p>{product.name}</p>
      <h2>${product.price}</h2>
      <button className='button' onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
