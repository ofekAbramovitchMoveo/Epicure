/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_GOOGLE_MAPS_API_KEY: string
    VITE_CLOUD_FRONT_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }