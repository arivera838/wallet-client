import { useState, useEffect } from 'react';
import axios from 'axios';

// API Endpoints
export const API_BASE_URL = 'http://localhost:9000/dev';
export const NEW_ClIENT_ENDPOINT = '/client/register';
export const WALLET_LOAD_ENDPOINT = '/wallet/load';
export const WALLET_PAY_ENDPOINT = '/wallet/pay';
export const WALLET_PAY_CONFIRM_ENDPOINT = '/wallet/pay/confirm';
export const WALLET_GET_ENDPOINT = '/wallet/get'


const useApi = () =>{
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    const post = async (url, requestData) => {
      try {
        setLoading(true);
        setError(null);
  
        const response = await axios.post(`${API_BASE_URL}${url}`, requestData);
  
        console.log("🚀 ~ post ~ response:", response)
        setData(response.data);
        setLoading(false);
  
        return response.data;
      } catch (err) {
        setError(err);
        setLoading(false);
        throw err;
      }
    };
  
    const get = async (url) => {
      try {
        setLoading(true);
        setError(null);
  
        const response = await axios.get(`${API_BASE_URL}${url}`);
  
        setData(response.data);
        setLoading(false);
  
        return response.data;
      } catch (err) {
        setError(err);
        setLoading(false);
        throw err;
      }
    };
  
    return { loading, data, error, post, get };
  }

export default useApi;