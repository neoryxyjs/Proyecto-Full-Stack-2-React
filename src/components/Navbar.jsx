import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, getCartItemCount } = useApp();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Cerrar menús cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar menú móvil si se hace clic fuera
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
      // Cerrar menú de usuario si se hace clic fuera
      if (isUserMenuOpen && !event.target.closest('[data-user-menu]')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, isUserMenuOpen]);

  return (
    <nav className="bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link className="flex items-center text-white text-xl font-bold hover:text-blue-400 transition-colors" to="/">
              <i className="fas fa-music mr-2"></i>
              Vinilos Store
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                to="/"
              >
                HOME
              </Link>
              <Link 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/nosotros') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                to="/nosotros"
              >
                NOSOTROS
              </Link>
              
              {user ? (
                <div className="relative" data-user-menu>
                  <button
                    className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={handleUserMenuToggle}
                  >
                    <i className="fas fa-user mr-1"></i>
                    <span>{user.firstName}</span>
                    <i className={`fas fa-chevron-down ml-1 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link 
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="fas fa-info-circle mr-2"></i>
                        Mi Perfil
                      </Link>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  to="/login"
                >
                  LOGIN
                </Link>
              )}
              
              {/* Carrito */}
              <Link 
                className="relative text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                to="/cart"
              >
                <i className="fas fa-shopping-cart"></i>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            <Link 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/nosotros') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              to="/nosotros"
              onClick={() => setIsMenuOpen(false)}
            >
              NOSOTROS
            </Link>
            
            {user ? (
              <div data-user-menu>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  onClick={handleUserMenuToggle}
                >
                  <i className="fas fa-user mr-1"></i>
                  {user.firstName}
                  <i className={`fas fa-chevron-down ml-1 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isUserMenuOpen && (
                  <div className="pl-6 space-y-1">
                    <Link 
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <i className="fas fa-info-circle mr-2"></i>
                      Mi Perfil
                    </Link>
                    <button 
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/login') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
            )}
            
            {/* Carrito */}
            <Link 
              className="relative block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Carrito
              {getCartItemCount() > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 inline-flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
