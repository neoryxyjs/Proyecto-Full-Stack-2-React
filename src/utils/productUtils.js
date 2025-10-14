// Utilidades para manejo de productos

export const imageSources = {
  1: [
    '/src/assets/images/swimming.jpg',
    'https://via.placeholder.com/300x300/667eea/ffffff?text=Swimming'
  ],
  2: [
    '/src/assets/images/hybrid-theory.jpg',
    'https://via.placeholder.com/300x300/f093fb/ffffff?text=Hybrid+Theory'
  ],
  3: [
    '/src/assets/images/circles.jpg',
    'https://via.placeholder.com/300x300/4facfe/ffffff?text=Circles'
  ],
  4: [
    '/src/assets/images/meteora.jpg',
    'https://via.placeholder.com/300x300/43e97b/ffffff?text=Meteora'
  ]
};

export const fallbackGradients = {
  1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
};

export const getProductById = (id) => {
  const products = {
    1: {
      id: 1,
      name: 'Swimming',
      artist: 'Mac Miller',
      genre: 'Hip Hop',
      price: 39.99,
      image: imageSources[1][0],
      fallbackGradient: fallbackGradients[1],
      year: 2018,
      description: 'El octavo álbum de estudio de Mac Miller, lanzado póstumamente en 2018.',
      tracklist: {
        'Lado A': [
          { title: 'Come Back to Earth', duration: '2:41' },
          { title: 'Hurt Feelings', duration: '4:05' },
          { title: "What's the Use?", duration: '4:48' },
          { title: 'Perfecto', duration: '3:35' }
        ],
        'Lado B': [
          { title: 'Self Care', duration: '5:45' },
          { title: 'Wings', duration: '4:10' },
          { title: 'Ladders', duration: '4:47' },
          { title: 'Small Worlds', duration: '4:31' }
        ],
        'Lado C': [
          { title: 'Conversation Pt. 1', duration: '3:30' },
          { title: 'Dunno', duration: '3:57' },
          { title: 'Jet Fuel', duration: '5:45' }
        ],
        'Lado D': [
          { title: '2009', duration: '5:47' },
          { title: 'So It Goes', duration: '5:12' }
        ]
      }
    },
    2: {
      id: 2,
      name: 'Hybrid Theory',
      artist: 'Linkin Park',
      genre: 'Nu Metal',
      price: 44.99,
      image: imageSources[2][0],
      fallbackGradient: fallbackGradients[2],
      year: 2000,
      description: 'El álbum debut de Linkin Park que los catapultó a la fama mundial.',
      tracklist: {
        'Lado A': [
          { title: 'Papercut', duration: '3:04' },
          { title: 'One Step Closer', duration: '2:35' },
          { title: 'With You', duration: '3:23' },
          { title: 'Points of Authority', duration: '3:20' }
        ],
        'Lado B': [
          { title: 'Crawling', duration: '3:29' },
          { title: 'Runaway', duration: '3:03' },
          { title: 'By Myself', duration: '3:09' },
          { title: 'In the End', duration: '3:36' }
        ]
      }
    },
    3: {
      id: 3,
      name: 'Circles',
      artist: 'Mac Miller',
      genre: 'Hip Hop',
      price: 42.99,
      image: imageSources[3][0],
      fallbackGradient: fallbackGradients[3],
      year: 2020,
      description: 'El último álbum de Mac Miller, completado póstumamente y lanzado en 2020.',
      tracklist: {
        'Lado A': [
          { title: 'Circles', duration: '2:50' },
          { title: 'Complicated', duration: '3:52' },
          { title: 'Blue World', duration: '3:29' },
          { title: 'Good News', duration: '5:42' }
        ],
        'Lado B': [
          { title: 'I Can See', duration: '3:40' },
          { title: 'Everybody', duration: '4:16' },
          { title: 'Woods', duration: '4:46' },
          { title: 'Hand Me Downs', duration: '4:58' }
        ]
      }
    },
    4: {
      id: 4,
      name: 'Meteora',
      artist: 'Linkin Park',
      genre: 'Nu Metal',
      price: 46.99,
      image: imageSources[4][0],
      fallbackGradient: fallbackGradients[4],
      year: 2003,
      description: 'El segundo álbum de estudio de Linkin Park, continuando su éxito comercial.',
      tracklist: {
        'Lado A': [
          { title: 'Foreword', duration: '0:13' },
          { title: 'Don\'t Stay', duration: '3:07' },
          { title: 'Somewhere I Belong', duration: '3:33' },
          { title: 'Lying from You', duration: '2:55' }
        ],
        'Lado B': [
          { title: 'Hit the Floor', duration: '2:44' },
          { title: 'Easier to Run', duration: '3:24' },
          { title: 'Faint', duration: '2:42' },
          { title: 'Figure.09', duration: '3:17' }
        ]
      }
    }
  };
  
  return products[id];
};

export const getAllProducts = () => {
  return Object.values({
    1: getProductById(1),
    2: getProductById(2),
    3: getProductById(3),
    4: getProductById(4)
  });
};

export const getProductsByGenre = (genre) => {
  return getAllProducts().filter(product => 
    product.genre.toLowerCase().includes(genre.toLowerCase())
  );
};

export const searchProducts = (query) => {
  const products = getAllProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.artist.toLowerCase().includes(searchTerm) ||
    product.genre.toLowerCase().includes(searchTerm)
  );
};

export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'year-asc':
      return sortedProducts.sort((a, b) => a.year - b.year);
    case 'year-desc':
      return sortedProducts.sort((a, b) => b.year - a.year);
    default:
      return sortedProducts;
  }
};
