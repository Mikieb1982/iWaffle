import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        // fix: Use API_KEY as per the coding guidelines.
        // Expose env variables to the client, ensuring they are stringified
        'process.env.API_KEY': JSON.stringify(env.API_KEY)
      },
      resolve: {
        alias: {
          // Allows for cleaner import paths, e.g., '@/components'
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});