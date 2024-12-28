import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.magleas.app',
  appName: 'salero',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    cleartext: true, // Allow HTTP requests
  },
  android:{
    allowMixedContent : true,

  },
  server?:{
    androidScheme:"http"
  }
};

export default config;
