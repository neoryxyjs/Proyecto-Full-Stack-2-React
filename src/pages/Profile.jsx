import React from 'react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { user, logout, showToast } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso no autorizado</h2>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tu perfil.</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    showToast('Has cerrado sesión correctamente', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mr-6">
                <i className="fas fa-user text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Hola, {user.firstName}!
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información Personal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Personal</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      {user.firstName}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      {user.lastName}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="btn btn-primary mr-4">
                    <i className="fas fa-edit mr-2"></i>
                    Editar Perfil
                  </button>
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-key mr-2"></i>
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Estadísticas */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tu Actividad</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Productos en favoritos</span>
                    <span className="font-bold text-blue-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pedidos realizados</span>
                    <span className="font-bold text-green-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Membro desde</span>
                    <span className="font-bold text-gray-900">2025</span>
                  </div>
                </div>
              </div>

              {/* Acciones Rápidas */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <button className="btn btn-outline-primary w-full">
                    <i className="fas fa-heart mr-2"></i>
                    Ver Favoritos
                  </button>
                  <button className="btn btn-outline-primary w-full">
                    <i className="fas fa-shopping-bag mr-2"></i>
                    Historial de Pedidos
                  </button>
                  <button className="btn btn-outline-primary w-full">
                    <i className="fas fa-cog mr-2"></i>
                    Configuración
                  </button>
                  <button 
                    className="btn btn-outline-danger w-full"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
