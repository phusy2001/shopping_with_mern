import axios from 'axios'
import Swal from 'sweetalert2'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        await dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        await dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'LOGIN SUCCESS',
            showConfirmButton: false,
            timer: 1500
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        await dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'LOGIN FAIL',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export const logout = () => async (dispatch) => {
    await axios.post('/api/users/logout')
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('__paypal_storage__')
    //dispatch({ type: USER_LOGOUT })
    // dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_LIST_MY_RESET })
    // dispatch({ type: USER_LIST_RESET })
    // dispatch({ type: USER_REGISTER_RESET })
    document.location.href = '/login'
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'LOGIN SUCCESS',
            showConfirmButton: false,
            timer: 1500
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/users/profile', user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (e) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/users', config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
        })

    } catch (e) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/${user._id}`, user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }
}