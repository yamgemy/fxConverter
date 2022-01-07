import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import {
  CONVERTOR_API_BASE_URL,
  CONVERTOR_APIKEY,
  CURRENCIES_NAMES_URL,
} from '../../constants'
const axiosInstance: AxiosInstance = axios.create({ timeout: 5000 })

export const requestFxRates: Function = (baseCurreny: string = 'USD') => {
  return async () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${CONVERTOR_API_BASE_URL}?apikey=${CONVERTOR_APIKEY}&base_currency=${baseCurreny}`, //?apikey is lower case
    }
    const todo: AxiosResponse<any> = await axiosInstance(config)
    return todo.data.data
  }
}

export const getRequestFxRatesPromise = (baseCurreny: string = 'USD') => {
  return () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${CONVERTOR_API_BASE_URL}?apikey=${CONVERTOR_APIKEY}&base_currency=${baseCurreny}`, //?apikey is lower case
    }
    return axiosInstance(config)
  }
}

export const getRequestCurrenciesNamesPromise = () => {
  return () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: CURRENCIES_NAMES_URL,
    }
    return axiosInstance(config)
  }
}
