import './Navbar.css';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const { totalItems } = useCartStore();

  return (
    <div className='mainContainer'>
      <div className='logo'>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          ShopWave
        </Link>
      </div>

      <div className='nav-links'>
        <Link to='/products' className='nav-link'>
          Products
        </Link>
        <Link to='/' className='nav-link'>
          About
        </Link>
      </div>

      <div className='cart-icon'>
        <Link to='/cart' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='cart-button'>
            <span>Cart</span>
            {totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
