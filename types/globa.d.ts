export { }

declare global {
  interface Window {

  }

  namespace NodeJS {
    interface ProcessEnv {
      VITE_SERVER_URL: string
      VITE_PUBLIC: string
      DIST: string
      ROOT: string
    }
  }
}
