import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts, sortProducts, getProductsByGenre } from '../utils/productUtils';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const slides = [
    {
      id: 1,
      title: 'Descubre la Música',
      subtitle: 'Encuentra los mejores vinilos de todos los géneros musicales. Calidad premium y sonido auténtico.',
      buttonText: 'Explorar Colección',
      gradient: 'from-blue-600 via-purple-600 to-indigo-800',
      icon: '🎵'
    },
    {
      id: 2,
      title: 'Nuevos Lanzamientos',
      subtitle: 'Los últimos álbumes de tus artistas favoritos disponibles en vinilo.',
      buttonText: 'Ver Novedades',
      gradient: 'from-pink-500 via-red-500 to-orange-600',
      icon: '🔥'
    },
    {
      id: 3,
      title: 'Clásicos Atemporales',
      subtitle: 'Revive los grandes clásicos del rock, jazz, blues y más en formato vinilo.',
      buttonText: 'Ver Clásicos',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      icon: '⭐'
    },
    {
      id: 4,
      title: 'Ofertas Especiales',
      subtitle: 'Descuentos increíbles en una selección cuidadosa de vinilos.',
      buttonText: 'Ver Ofertas',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      icon: '💎'
    }
  ];

  useEffect(() => {
    let filteredProducts = getAllProducts();
    
    if (selectedGenre !== 'all') {
      filteredProducts = getProductsByGenre(selectedGenre);
    }
    
    if (sortBy !== 'default') {
      filteredProducts = sortProducts(filteredProducts, sortBy);
    }
    
    setProducts(filteredProducts);
  }, [selectedGenre, sortBy]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const genres = ['all', 'Hip Hop', 'Nu Metal'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="relative h-screen">
          {/* Carousel */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                {/* Patrón de ondas musicales */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
                  <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-white rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-2000"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <div className="max-w-3xl mx-auto">
                      <div className="text-6xl md:text-7xl mb-6 animate-bounce">
                        {slide.icon}
                      </div>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-10 leading-relaxed max-w-2xl mx-auto opacity-90">
                        {slide.subtitle}
                      </p>
                      <Link
                        to="#productos"
                        className="inline-flex items-center px-10 py-5 bg-white text-gray-900 text-xl font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl transform shadow-lg"
                      >
                        <span>{slide.buttonText}</span>
                        <i className="fas fa-arrow-right ml-3 text-lg"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 backdrop-blur-sm text-white p-4 rounded-full hover:bg-opacity-50 transition-all duration-300 group"
            onClick={prevSlide}
          >
            <i className="fas fa-chevron-left text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 backdrop-blur-sm text-white p-4 rounded-full hover:bg-opacity-50 transition-all duration-300 group"
            onClick={nextSlide}
          >
            <i className="fas fa-chevron-right text-lg group-hover:scale-110 transition-transform"></i>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <i className="fas fa-music text-white text-2xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Nuestros <span className="text-blue-600">Vinilos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra colección cuidadosamente seleccionada de los mejores álbumes en vinilo
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-6 lg:space-y-0">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-6 py-3 pr-10 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <option value="all">🎵 Todos los géneros</option>
                  {genres.filter(genre => genre !== 'all').map(genre => (
                    <option key={genre} value={genre}>🎤 {genre}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-6 py-3 pr-10 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <option value="default">📊 Ordenar por</option>
                  <option value="name-asc">🔤 Nombre A-Z</option>
                  <option value="name-desc">🔤 Nombre Z-A</option>
                  <option value="price-asc">💰 Precio: Menor a Mayor</option>
                  <option value="price-desc">💰 Precio: Mayor a Menor</option>
                  <option value="year-asc">📅 Año: Más antiguo</option>
                  <option value="year-desc">📅 Año: Más reciente</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full font-semibold">
              <i className="fas fa-search mr-2"></i>
              {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="transform transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-8">
                <i className="fas fa-music text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">
                No se encontraron productos
              </h3>
              <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
                Intenta cambiar los filtros para descubrir más vinilos increíbles en nuestra colección.
              </p>
              <button
                onClick={() => {
                  setSelectedGenre('all');
                  setSortBy('default');
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <i className="fas fa-refresh mr-2"></i>
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
