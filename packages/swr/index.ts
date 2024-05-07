import useSWR, { Key as SWRKey } from "swr"
import axios, { AxiosRequestConfig } from "axios"

function useFetch<T>(key: SWRKey, config?: AxiosRequestConfig) {
  return useSWR<T>(key, (url: string) =>
    axios.get<T>(url, config).then(res => res.data),
  )
}

export { useFetch }
export default useFetch
