import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b585b9b00e534bd184e057a98a42a2e9',
  appName: 'sync-my-screens',
  webDir: 'dist',
  server: {
    url: 'https://b585b9b0-0e53-4bd1-84e0-57a98a42a2e9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;