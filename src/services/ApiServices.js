import axios from '../utils/AxiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}


const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password, delay) => {
    return axios.post(`api/v1/login`, { email: email, password: password, delay: +delay });
}

const registerUser = (email, password, username) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);

    return axios.post('api/v1/register', data);
}

// Trả ra nhiều biến thì dùng cách export này
export { postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, registerUser }