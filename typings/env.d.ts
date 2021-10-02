declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_KEY: string
    SUPABASE_KEY: string

    GRAPH_CMS_URL: string
  }
}
