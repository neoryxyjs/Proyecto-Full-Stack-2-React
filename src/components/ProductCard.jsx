import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToFavorites, isInFavorites, showToast } = useApp();
  const isFavorite = isInFavorites(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name} agregado al carrito`, 'success');
  };

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      showToast(`${product.name} ya está en favoritos`, 'warning');
    } else {
      addToFavorites(product.id);
      showToast(`${product.name} agregado a favoritos`, 'success');
    }
  };

  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div 
            className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold"
            style={{ 
              background: product.fallbackGradient,
              display: 'none'
            }}
          >
            {product.name}
          </div>
          
          <div className="product-overlay absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              className="btn btn-light btn-sm bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart mr-1"></i>
              Agregar
            </button>
          </div>
        </div>
        
        <div className="card-body p-6 flex flex-col h-full">
          <h5 className="card-title text-xl font-bold mb-2 text-gray-900">
            {product.name}
          </h5>
          <p className="card-text text-gray-600 mb-4">
            {product.artist} - {product.genre}
          </p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price}
              </span>
              <div className="rating flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                className="btn btn-primary flex-1"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Agregar al Carrito
              </button>
              <button
                className={`btn ${isFavorite ? 'btn-outline-primary' : 'btn-outline-secondary'} px-3`}
                onClick={handleAddToFavorites}
                title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
              >
                <i className={`fas ${isFavorite ? 'fa-heart' : 'fa-heart-o'} text-red-500`}></i>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
