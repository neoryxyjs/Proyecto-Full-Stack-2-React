import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="col-span-1">
            <h5 className="font-bold mb-4 text-xl">
              <i className="fas fa-music mr-2"></i>
              Vinilos Store
            </h5>
            <p className="text-gray-400 mb-4">
              Tu tienda de confianza para los mejores vinilos. Calidad, autenticidad y pasión por la música.
            </p>
            <div className="social-links flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="col-span-1">
            <h6 className="font-bold mb-4">Enlaces</h6>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div className="col-span-1">
            <h6 className="font-bold mb-4">Categorías</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Rock
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Jazz
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blues
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Clásica
                </a>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="col-span-1">
            <h6 className="font-bold mb-4">Contacto</h6>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Escuela Agrícola, Macul, Santiago, Chile
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                +569 99999999
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                info@vinilosstore.com
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              &copy; 2025 Vinilos Store. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
