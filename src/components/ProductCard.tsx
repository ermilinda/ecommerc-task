import React from 'react'
import './ProductCard.css'
import productImage from "../images/imgg.jpg"

type Product = {
  _id?: string ;
  id?: number;
  name: string;
  price: number;
}

type Props = {
  product: Product
}

const handleOnCLick = (productId :string) =>{
  console.log(productId)
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className='containerCard'>
      <p>{product.name}</p>
      <h2>${product.price}</h2>
      <div className="image">
        <img src={productImage} alt={product.name} />
      </div>
      <button className='button' onClick={() => handleOnCLick(product._id ?? '')}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
