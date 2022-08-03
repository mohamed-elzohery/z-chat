import axios from 'axios';
import { userRegisterationData } from '../types';

const baseURL = 'http://localhost:4000/api/v1/auth/';
const axiosGroup = axios.create({baseURL, withCredentials: true});

export const registerUser = async (userData: userRegisterationData) => {
    return axiosGroup.post('/register', userData);
}

export const getCurrentUser = async () => {
    return axiosGroup.get('current-user');
}


export const loginUser = async ({email, password}: {email: string, password: string}) => {
    return axiosGroup.post('/login', {email, password});
}
