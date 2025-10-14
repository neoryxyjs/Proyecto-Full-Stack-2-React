# Vinilos Store - React App

Una tienda de vinilos moderna construida con React, Vite y Tailwind CSS.

## 🚀 Características

- **Frontend Moderno**: Construido con React 18 y Vite para un desarrollo rápido
- **Diseño Responsivo**: Interfaz optimizada para móviles, tablets y desktop
- **Estado Global**: Manejo de estado con Context API de React
- **Autenticación**: Sistema de login y registro de usuarios
- **Carrito de Compras**: Funcionalidad completa de carrito con persistencia
- **Favoritos**: Sistema de productos favoritos
- **Notificaciones**: Sistema de toast notifications
- **Navegación**: React Router para navegación SPA
- **Estilos**: Tailwind CSS con diseño personalizado

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de JavaScript para interfaces de usuario
- **Vite**: Herramienta de construcción rápida para desarrollo frontend
- **Tailwind CSS**: Framework CSS utilitario para diseño
- **React Router**: Enrutamiento para aplicaciones React
- **Font Awesome**: Iconografía
- **Context API**: Manejo de estado global

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx      # Barra de navegación
│   ├── Footer.jsx      # Pie de página
│   ├── ProductCard.jsx # Tarjeta de producto
│   ├── Toast.jsx       # Notificaciones
│   └── ScrollToTop.jsx # Botón de scroll
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx        # Página principal
│   ├── Login.jsx       # Página de login/registro
│   ├── Nosotros.jsx    # Página sobre nosotros
│   ├── ProductDetail.jsx # Detalle de producto
│   └── Cart.jsx        # Carrito de compras
├── context/            # Contextos de React
│   └── AppContext.jsx  # Estado global
├── utils/              # Utilidades
│   ├── userUtils.js    # Funciones de usuario
│   └── productUtils.js # Funciones de productos
├── assets/             # Recursos estáticos
│   └── images/         # Imágenes de productos
└── hooks/              # Custom hooks
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd client
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

### Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Funcionalidades Principales

### Página Principal (Home)
- Carrusel hero con múltiples slides
- Grid de productos con filtros y ordenamiento
- Búsqueda de productos por nombre, artista o género
- Navegación fluida

### Sistema de Autenticación
- Login y registro de usuarios
- Validación de formularios
- Persistencia de sesión
- Manejo de errores

### Carrito de Compras
- Agregar/remover productos
- Modificar cantidades
- Cálculo de totales
- Persistencia en localStorage

### Detalle de Producto
- Información completa del producto
- Galería de imágenes
- Lista de temas
- Reseñas de usuarios
- Productos relacionados

### Favoritos
- Agregar/remover productos favoritos
- Persistencia en localStorage
- Indicadores visuales

## 🎯 Características Técnicas

### Estado Global
- Context API para manejo de estado
- Reducer pattern para acciones complejas
- Persistencia en localStorage

### Responsive Design
- Mobile-first approach
- Breakpoints optimizados
- Componentes adaptativos

### Performance
- Lazy loading de imágenes
- Optimización de re-renders
- Code splitting con React Router

## 🔧 Configuración

### Tailwind CSS
El proyecto usa Tailwind CSS con configuración personalizada:
- Colores personalizados para la marca
- Animaciones personalizadas
- Componentes utilitarios

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:
```
VITE_APP_TITLE=Vinilos Store
VITE_API_URL=http://localhost:3000
```

## 📱 Compatibilidad

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Frontend**: [Benjamin Errazuriz]
- **Diseño UX/UI**: [Benjamin Errazuriz]

## 📞 Contacto

- Email: info@vinilosstore.com
- Teléfono: +569 99999999
- Dirección: Escuela Agrícola, Macul, Santiago, Chile

---

¡Gracias por usar Vinilos Store! 🎵
