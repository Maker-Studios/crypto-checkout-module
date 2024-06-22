declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WC: string
      NEXT_PUBLIC_VENDORADDRESS: `0x${string}`
      NEXT_PUBLIC_CHECKOUT: `0x${string}`
      NEXT_PUBLIC_MAINNET?: string
      NEXT_PUBLIC_ARB?: string
      NEXT_PUBLIC_OP?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
