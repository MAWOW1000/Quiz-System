import axios from "../ulitity/axiosCustome";
const qs = require('qs');

const postCreateUser = (email, password, username, role, image) => {
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return (
        axios.post('api/v1/participant', form)
    );
}

const getAllUser = () => {
    return (
        axios.get('api/v1/participant/all')
    )
}

const putUpdateUser = (id, username, role, image) => {
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return (
        axios.put('api/v1/participant', form)
    );
}

const deleteUser = (id) => {
    const data = { 'id': id };
    const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'http://localhost:8081/api/v1/participant',
    };
    return axios(options);
    // return (
    //     axios.delete('api/v1/participant', qs.stringify({ 'id': id }))
    // );
}

const getAllUserPaginate = (page, limit) => {
    return (
        axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
    )
}


const postLogin = (email, password) => {
    return (
        axios.post(`api/v1/login`, { email, password })
    )
}

const postSignup = (email, username, password) => {
    return (
        axios.post(`api/v1/register`, { email, username, password })
    )
}


export { postCreateUser, getAllUser, putUpdateUser, deleteUser, getAllUserPaginate, postLogin, postSignup }

