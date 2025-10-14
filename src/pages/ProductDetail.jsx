import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProductById, getAllProducts } from '../utils/productUtils';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, addToFavorites, isInFavorites, showToast } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = getProductById(parseInt(id));
  const isFavorite = isInFavorites(product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <p className="text-gray-600 mb-4">El producto que buscas no existe.</p>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${product.name} agregado al carrito`, 'success');
  };

  const handleAddToFavorites = () => {
    if (isFavorite) {
      showToast(`${product.name} ya está en favoritos`, 'warning');
    } else {
      addToFavorites(product.id);
      showToast(`${product.name} agregado a favoritos`, 'success');
    }
  };

  const relatedProducts = getAllProducts()
    .filter(p => p.id !== product.id && p.genre === product.genre)
    .slice(0, 3);

  const tabs = [
    { id: 'description', label: 'Descripción', content: 'description' },
    { id: 'tracklist', label: 'Lista de Temas', content: 'tracklist' },
    { id: 'reviews', label: 'Reseñas', content: 'reviews' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div>
            <h4 className="text-xl font-bold mb-4">Acerca de este álbum</h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-gray-600 leading-relaxed">
              El vinilo incluye {Object.values(product.tracklist || {}).flat().length} pistas 
              distribuidas en {Object.keys(product.tracklist || {}).length} discos, con una calidad 
              de sonido excepcional que realza los matices instrumentales y las capas vocales.
            </p>
          </div>
        );
      
      case 'tracklist':
        return (
          <div>
            <h4 className="text-xl font-bold mb-6">Lista de Temas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(product.tracklist || {}).map(([side, tracks]) => (
                <div key={side}>
                  <p className="font-bold text-lg mb-3">{side}</p>
                  <ol className="space-y-2">
                    {tracks.map((track, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{track.title}</span>
                        <span className="text-gray-500 text-sm">{track.duration}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'reviews':
        return (
          <div>
            <h4 className="text-xl font-bold mb-6">Reseñas de Clientes</h4>
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <span className="text-4xl font-bold text-blue-600">4.8</span>
                <span className="text-gray-500">/5</span>
              </div>
              <div>
                <div className="rating flex space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-500">Basado en 24 reseñas</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-bold">Carlos M.</h5>
                  <small className="text-gray-500">Hace 2 semanas</small>
                </div>
                <div className="rating flex space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-600">
                  La calidad de sonido es excepcional. Se nota la diferencia con la versión digital. 
                  El empaque llegó en perfectas condiciones.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-bold">Ana L.</h5>
                  <small className="text-gray-500">Hace 1 mes</small>
                </div>
                <div className="rating flex space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-600">
                  Una obra maestra en formato vinilo. La textura y profundidad del sonido hacen 
                  justicia a la complejidad musical de este álbum.
                </p>
              </div>
              
              <div className="text-center">
                <button className="btn btn-outline-primary">
                  Ver todas las reseñas
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                  Inicio
                </Link>
              </li>
              <li>
                <i className="fas fa-chevron-right text-gray-400 mx-2"></i>
                <Link to="/#productos" className="text-blue-600 hover:text-blue-800">
                  Productos
                </Link>
              </li>
              <li>
                <i className="fas fa-chevron-right text-gray-400 mx-2"></i>
                <span className="text-gray-500">{product.genre}</span>
              </li>
              <li>
                <i className="fas fa-chevron-right text-gray-400 mx-2"></i>
                <span className="text-gray-500">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div>
            <div className="text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="w-full max-w-md mx-auto h-96 flex items-center justify-center text-white text-3xl font-bold rounded-lg shadow-lg"
                style={{ 
                  background: product.fallbackGradient,
                  display: 'none'
                }}
              >
                {product.name}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {product.name}
            </h1>
            <p className="text-2xl text-gray-600 mb-6">{product.artist}</p>
            
            <div className="rating flex space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400"></i>
              ))}
              <span className="ml-2 text-gray-600">(24 reseñas)</span>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              <span className="text-xl text-gray-500 line-through ml-2">$49.99</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded ml-2 text-sm font-semibold">
                20% OFF
              </span>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            {/* Product Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <p><strong>Género:</strong> {product.genre}</p>
                <p><strong>Año:</strong> {product.year}</p>
                <p><strong>Sello:</strong> Warner Records</p>
              </div>
              <div>
                <p><strong>Formato:</strong> Vinilo, 2LP</p>
                <p><strong>Condición:</strong> Nuevo</p>
                <p><strong>Disponibilidad:</strong> En stock</p>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="form-control w-20"
                />
              </div>
              <button
                className="btn btn-primary btn-lg flex-1 mr-4"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Añadir al Carrito
              </button>
            </div>
            
            <div className="w-full">
              <button
                className={`btn btn-outline-primary btn-lg w-full ${isFavorite ? 'text-red-500 border-red-500 hover:bg-red-500' : ''}`}
                onClick={handleAddToFavorites}
              >
                <i className={`fas ${isFavorite ? 'fa-heart' : 'fa-heart-o'} mr-2`}></i>
                {isFavorite ? 'En Favoritos' : 'Agregar a Favoritos'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8">Productos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
