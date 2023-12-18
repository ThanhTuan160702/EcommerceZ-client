import axios from "../axios";


export const apiRegister = (data) => axios({
    url: `/user/register`,
    method: 'post',
    data
})

export const apiLogin = (data) => axios({
    url: `/user/login/`,
    method: 'post',
    data
})

export const apiForgot = (data) => axios({
    url: `/user/forgotpassword`,
    method: 'post',
    data
})

export const apiResetPassword = (data) => axios({
    url: `/user/resetpassword`,
    method: 'put',
    data
})

export const apiGetUser = () => axios({
    url: `/user/current`,
    method: 'get'
})