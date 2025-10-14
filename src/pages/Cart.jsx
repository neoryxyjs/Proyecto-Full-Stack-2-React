import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProductById } from '../utils/productUtils';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    getCartTotal, 
    showToast 
  } = useApp();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      showToast('Producto removido del carrito', 'info');
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    showToast(`${productName} removido del carrito`, 'info');
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Carrito vaciado', 'info');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Tu carrito está vacío', 'warning');
      return;
    }
    showToast('Redirigiendo al checkout...', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <i className="fas fa-shopping-cart text-8xl text-gray-300 mb-8"></i>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-xl text-gray-600 mb-8">
              Agrega algunos productos para comenzar tu compra
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Carrito de Compras</h1>
          <button
            onClick={handleClearCart}
            className="inline-flex items-center px-4 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
          >
            <i className="fas fa-trash mr-2"></i>
            Vaciar Carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {cart.map((item) => {
                const product = getProductById(item.id);
                if (!product) return null;

                return (
                  <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="w-20 h-20 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                            style={{ 
                              background: product.fallbackGradient,
                              display: 'none'
                            }}
                          >
                            {product.name}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <Link 
                            to={`/product/${product.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {product.name}
                          </Link>
                          <p className="text-gray-600">{product.artist}</p>
                          <p className="text-sm text-gray-500">{product.genre}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <i className="fas fa-minus text-sm"></i>
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <i className="fas fa-plus text-sm"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${product.price} cada uno
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id, product.name)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Remover del carrito"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos</span>
                  <span className="font-semibold">${(getCartTotal() * 0.19).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.19).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mb-4 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
              >
                <i className="fas fa-credit-card mr-2"></i>
                Proceder al Pago
              </button>

              <Link 
                to="/"
                className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Continuar Comprando
              </Link>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <i className="fas fa-truck text-green-600 mr-2"></i>
                  <span className="text-sm text-green-800 font-medium">
                    Envío gratis en compras superiores a $50
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
