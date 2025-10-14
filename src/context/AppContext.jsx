import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Tipos de acciones para el reducer
const ActionTypes = {
  // Usuario
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  
  // Carrito
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  
  // Favoritos
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  
  // Notificaciones
  SHOW_TOAST: 'SHOW_TOAST',
  HIDE_TOAST: 'HIDE_TOAST'
};

// Estado inicial
const initialState = {
  user: null,
  cart: [],
  favorites: [],
  toast: {
    show: false,
    message: '',
    type: 'info' // success, error, warning, info
  },
  registeredUsers: []
};

// Función reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload
      };
    
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null
      };
    
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case ActionTypes.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    
    case ActionTypes.ADD_TO_FAVORITES:
      if (!state.favorites.includes(action.payload)) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }
      return state;
    
    case ActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload)
      };
    
    case ActionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload.message,
          type: action.payload.type || 'info'
        }
      };
    
    case ActionTypes.HIDE_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false
        }
      };
    
    default:
      return state;
  }
};

// Crear el contexto
const AppContext = createContext();

// Hook personalizado para usar el contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

// Provider del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        // Cargar usuario
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          dispatch({ type: ActionTypes.LOGIN, payload: JSON.parse(savedUser) });
        }

        // Cargar carrito
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cartItems = JSON.parse(savedCart);
          cartItems.forEach(item => {
            dispatch({ type: ActionTypes.ADD_TO_CART, payload: item });
          });
        }

        // Cargar favoritos
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          favorites.forEach(id => {
            dispatch({ type: ActionTypes.ADD_TO_FAVORITES, payload: id });
          });
        }

        // Cargar usuarios registrados
        const savedUsers = localStorage.getItem('registeredUsers');
        if (savedUsers) {
          // Los usuarios se manejan en el estado pero no se exponen directamente
          localStorage.setItem('registeredUsers', savedUsers);
        }
      } catch (error) {
        console.error('Error cargando datos del localStorage:', error);
      }
    };

    loadFromStorage();
  }, []);

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('currentUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Funciones de acción
  const login = (user) => {
    dispatch({ type: ActionTypes.LOGIN, payload: user });
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  const updateUser = (userData) => {
    dispatch({ type: ActionTypes.UPDATE_USER, payload: userData });
  };

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: ActionTypes.ADD_TO_CART, payload: { ...product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId });
  };

  const updateCartQuantity = (productId, quantity) => {
    dispatch({ type: ActionTypes.UPDATE_CART_QUANTITY, payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ActionTypes.CLEAR_CART });
  };

  const addToFavorites = (productId) => {
    dispatch({ type: ActionTypes.ADD_TO_FAVORITES, payload: productId });
  };

  const removeFromFavorites = (productId) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_FAVORITES, payload: productId });
  };

  const showToast = (message, type = 'info') => {
    dispatch({ type: ActionTypes.SHOW_TOAST, payload: { message, type } });
  };

  const hideToast = () => {
    dispatch({ type: ActionTypes.HIDE_TOAST });
  };

  // Funciones de utilidad
  const isInFavorites = (productId) => {
    return state.favorites.includes(productId);
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    // Estado
    user: state.user,
    cart: state.cart,
    favorites: state.favorites,
    toast: state.toast,
    
    // Acciones de usuario
    login,
    logout,
    updateUser,
    
    // Acciones de carrito
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    
    // Acciones de favoritos
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    
    // Notificaciones
    showToast,
    hideToast,
    
    // Utilidades
    getCartTotal,
    getCartItemCount
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { ActionTypes };
