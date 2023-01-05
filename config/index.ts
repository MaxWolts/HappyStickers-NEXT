const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://happy-stickers-next.vercel.app'; // Cambiará dependiendo de la variable de entorno NODE_ENV
