import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

const baseUrl = 'https://freecurrencyapi.net/api/v2/latest'
const apiKey = '30682760-6b40-11ec-a390-d944f258eede'

export const requestFxRates: Function = (baseCurreny: string = 'USD') => {
  return async () => {
    const axiosInstance: AxiosInstance = axios.create({ timeout: 5000 })
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${baseUrl}?apikey=${apiKey}&base_currency=${baseCurreny}`, //?apikey is lower case
    }
    const todo: AxiosResponse<any> = await axiosInstance(config)
    return todo.data.data
  }
}
