import React from 'react';

const Nosotros = () => {
  const features = [
    {
      icon: 'fas fa-heart',
      title: 'Nuestra Pasión',
      description: 'Cada vinilo en nuestra tienda ha sido cuidadosamente seleccionado por su calidad musical y valor artístico.',
      bgColor: 'bg-blue-600'
    },
    {
      icon: 'fas fa-star',
      title: 'Calidad Garantizada',
      description: 'Trabajamos solo con los mejores proveedores para garantizar la máxima calidad en cada producto.',
      bgColor: 'bg-green-600'
    },
    {
      icon: 'fas fa-users',
      title: 'Comunidad',
      description: 'Hemos construido una comunidad de amantes de la música que comparten nuestra pasión por el vinilo.',
      bgColor: 'bg-blue-500'
    },
    {
      icon: 'fas fa-shipping-fast',
      title: 'Envío Seguro',
      description: 'Cada vinilo se envía con el máximo cuidado para llegar en perfectas condiciones a tu hogar.',
      bgColor: 'bg-yellow-600'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Vinilos Disponibles' },
    { number: '5000+', label: 'Clientes Satisfechos' },
    { number: '14', label: 'Años de Experiencia' }
  ];

  const advantages = [
    {
      icon: 'fas fa-check-circle',
      title: 'Autenticidad',
      description: 'Solo productos originales y auténticos'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Garantía',
      description: 'Garantía de satisfacción del 100%'
    },
    {
      icon: 'fas fa-headphones',
      title: 'Asesoramiento',
      description: 'Expertos en música para ayudarte'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Sobre Nosotros</h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Conoce la historia detrás de Vinilos Store y nuestra pasión por la música.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Historia */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Nuestra Historia
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Desde 2010, hemos sido apasionados coleccionistas y amantes de la música, 
                dedicados a compartir la magia del vinilo con el mundo.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className={`feature-icon ${feature.bgColor} text-white`}>
                    <i className={feature.icon}></i>
                  </div>
                  <h5 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h5>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Misión */}
            <div className="bg-gray-100 rounded-3xl p-8 md:p-12 mb-16">
              <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">
                Nuestra Misión
              </h3>
              <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
                Creemos que la música es una experiencia que debe vivirse de la manera más auténtica posible. 
                Por eso, nos dedicamos a ofrecer los mejores vinilos, desde clásicos atemporales hasta los 
                últimos lanzamientos, siempre con la máxima calidad y el mejor servicio.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <h4 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h4>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ventajas */}
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-12 text-gray-900">
                ¿Por qué elegir Vinilos Store?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <i className={`${advantage.icon} text-4xl text-green-500 mb-4`}></i>
                    <h6 className="text-lg font-bold mb-2 text-gray-900">{advantage.title}</h6>
                    <p className="text-gray-600 text-sm">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Únete a Nuestra Comunidad
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre la magia del vinilo y forma parte de una comunidad apasionada por la música.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#productos"
              className="btn btn-light bg-white text-blue-600 px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Explorar Productos
            </a>
            <a
              href="/login"
              className="btn btn-outline-light border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Crear Cuenta
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
