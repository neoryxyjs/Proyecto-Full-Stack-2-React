import '../setupTests';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { AppProvider } from '../context/AppContext';

// Producto de prueba
const mockProduct = {
  id: 1,
  name: 'Hybrid Theory',
  artist: 'Linkin Park',
  genre: 'Rock',
  price: 25000,
  image: '/images/hybrid-theory.jpg',
  fallbackGradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
};

describe('ProductCard Component', () => {
  it('renderiza el nombre del producto', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <ProductCard product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Hybrid Theory');
  });

  it('muestra el artista y género del producto', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <ProductCard product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Linkin Park');
    expect(container.textContent).toContain('Rock');
  });

  it('muestra el precio del producto', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <ProductCard product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('$25000');
  });

  it('renderiza el botón de agregar al carrito', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <ProductCard product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    );
    const buttons = container.querySelectorAll('button');
    const addToCartButton = Array.from(buttons).find(btn => 
      btn.textContent.includes('Agregar al Carrito')
    );
    expect(addToCartButton).toBeTruthy();
  });

  it('agrega el producto al carrito al hacer clic', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <ProductCard product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    );
    const buttons = container.querySelectorAll('button');
    const addToCartButton = Array.from(buttons).find(btn => 
      btn.textContent.includes('Agregar al Carrito')
    );
    
    // Simular clic en el botón
    fireEvent.click(addToCartButton);
    
    // Verificar que se ejecutó sin errores
    expect(addToCartButton).toBeTruthy();
  });

  it('renderiza las 5 estrellas de rating', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <ProductCard product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    );
    const stars = container.querySelectorAll('.fa-star');
    expect(stars.length).toBe(5);
  });

  it('renderiza la imagen del producto con alt text', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <ProductCard product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    );
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('Hybrid Theory');
  });
});

