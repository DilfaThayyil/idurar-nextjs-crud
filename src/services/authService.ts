import axios from 'axios';
import { RegisterCredentials, LoginCredentials } from '@/types/auth';
const BASEURL = '/api/auth'

export const registerUser = async (credentials: RegisterCredentials) => {
  try {
    const response = await axios.post(`${BASEURL}/register`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${BASEURL}/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASEURL}/logout`, {},
      {
        withCredentials: true,
      });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
