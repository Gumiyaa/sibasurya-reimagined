/// <reference types="astro/client" />

declare module '*.woff2?url' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
