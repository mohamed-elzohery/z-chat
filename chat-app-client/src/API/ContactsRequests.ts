import axios from 'axios';
const baseURL = 'http://localhost:4000/api/v1/contacts';
const axiosGroup = axios.create({baseURL, withCredentials: true});



export const getAllContacts = async () => {
    return axiosGroup.get('/');
}



