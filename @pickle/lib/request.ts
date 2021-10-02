import axios, { AxiosRequestConfig } from 'axios'

export const request = async <T>(
  url: string,
  config?: Pick<AxiosRequestConfig, 'data' | 'method' | 'params'>
): Promise<T> => {
  try {
    const { data } = await axios.request<T>({
      ...config,
      baseURL: '/api',
      url,
      withCredentials: true
    })

    return data
  } catch (error) {
    throw error.response.data
  }
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get<T>(url, {
    baseURL: '/api',
    withCredentials: true
  })

  return data
}
