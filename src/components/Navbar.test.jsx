import '../setupTests';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AppProvider } from '../context/AppContext';

describe('Navbar Component', () => {
  it('renderiza el logo y nombre de la tienda', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Vinilos Store');
  });

  it('muestra los enlaces de navegación principales', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('HOME');
    expect(container.textContent).toContain('NOSOTROS');
  });

  it('muestra el enlace LOGIN cuando no hay usuario logueado', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    expect(container.textContent).toContain('LOGIN');
  });

  it('renderiza el ícono del carrito', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    const cartIcon = container.querySelector('.fa-shopping-cart');
    expect(cartIcon).toBeTruthy();
  });

  it('muestra todos los enlaces como elementos Link', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    const links = container.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renderiza el botón de menú móvil', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    const mobileMenuButton = container.querySelector('svg');
    expect(mobileMenuButton).toBeTruthy();
  });

  it('el navbar tiene la clase bg-gray-900 (diseño oscuro)', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    const nav = container.querySelector('nav');
    expect(nav.className).toContain('bg-gray-900');
  });

  it('el logo tiene un ícono de música', () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <Navbar />
        </AppProvider>
      </BrowserRouter>
    );
    const musicIcon = container.querySelector('.fa-music');
    expect(musicIcon).toBeTruthy();
  });
});

