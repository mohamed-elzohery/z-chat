import axios from 'axios';
const baseURL = 'http://localhost:4000/api/v1/user';
const axiosGroup = axios.create({baseURL, withCredentials: true});

export const updatePhoto = async (photoKey: string) => {
    console.log(photoKey);
    return axiosGroup.patch('/photo', {photoKey});
}

export const updateName = async (name: string) => {
    return axiosGroup.patch('/name', {name});
}

export const updateStatus = async (status: string) => {
    return axiosGroup.patch('/status', {status});
}

export const getAllUsers = async () => {
    return axiosGroup.get('/');
}



