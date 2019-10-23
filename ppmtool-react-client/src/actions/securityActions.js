import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJWTToken from '../securityUtils/setJWTToken';
import jwt_decode from 'jwt-decode';

export const creatNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const login = (loginRequest) => async dispatch => {
    try {
        //Post => login Request
        const res = await axios.post("/api/users/login", loginRequest);

        //extract Token res.data
        const { token } = res.data;

        //Storing token in localStorage
        localStorage.setItem("jwtToken", token);

        //set token in header
        setJWTToken(token);

        //decode token
        const decoded = jwt_decode(token);

        //dispatch user to security user
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};