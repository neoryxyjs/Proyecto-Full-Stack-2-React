import '../setupTests';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renderiza el título de la tienda', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Vinilos Store');
  });

  it('muestra la descripción de la empresa', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Tu tienda de confianza para los mejores vinilos');
  });

  it('renderiza los enlaces de navegación principales', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Inicio');
    expect(container.textContent).toContain('Nosotros');
    expect(container.textContent).toContain('Login');
  });

  it('muestra las categorías de música', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Rock');
    expect(container.textContent).toContain('Jazz');
    expect(container.textContent).toContain('Blues');
    expect(container.textContent).toContain('Clásica');
  });

  it('muestra la información de contacto', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Escuela Agrícola, Macul, Santiago, Chile');
    expect(container.textContent).toContain('+569 99999999');
    expect(container.textContent).toContain('info@vinilosstore.com');
  });

  it('muestra el copyright con el año actual', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('2025 Vinilos Store. Todos los derechos reservados');
  });

  it('renderiza los enlaces de redes sociales', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const socialLinks = container.querySelectorAll('.social-links a');
    expect(socialLinks.length).toBe(4); // Facebook, Instagram, Twitter, YouTube
  });
});

