import { SERVER_URL } from '@/utils/consts';
import axios from 'axios';
import cookie from "js-cookie"


const register = async (userData) => {

    const response = await axios.post(`${SERVER_URL}users`, userData); 
    if (response.data)
    cookie.set('user', JSON.stringify(response.data.data), { expires: 4 });
    return response.data.data

}

const logout = async () => {
    cookie.remove('user')
}


const login = async (userData) => {
    const response = await axios.post(`${SERVER_URL}users/login`, userData);

    if (response.data) {
        cookie.set('user', JSON.stringify(response.data.data), { expires: 4 });
    }

    return response.data.data;
}
const authService = {
    register,
    logout,
    login
}

export default authService;