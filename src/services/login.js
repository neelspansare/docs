import axios from "axios";
import { get } from 'lodash';
const baseURL = "https://apptesting.docsumo.com/api/v1/eevee";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/login/`, { email, password })
    return get(response, 'data', null);
  } catch (error) {
    console.log(error);
    return get(error, 'response.data', null);
  }
}