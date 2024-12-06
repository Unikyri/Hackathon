import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.1.11', // O usa '0.0.0.0' para accesos desde cualquier red
    port: 5173, // Mantén el puerto para tu frontend
    
  },
});
