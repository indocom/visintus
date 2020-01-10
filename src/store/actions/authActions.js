import axios from 'axios';
import { getParsedCommandLineOfConfigFile } from 'typescript';

const loginSuccess = (token) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: token
    }
}

const loginFailed = () => {
    return {
        type: "LOGIN_ERROR"
    }
}

const logOutSuccess = () => {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

const logOutFailed = () => {
    return {
        type: "LOGOUT_ERROR"
    }
}

const signUpSuccess = () => {
    return {
        type: "SIGNUP_SUCCESS",
    }
}

const signUpFailed = () => {
    return {
        type: "SIGNUP_ERROR"
    }
}

export const signInUser = ({ email, password }) => {
    console.log("signInUser", email);
    console.log("signInUser", password);
    const data = JSON.stringify({
        user: {
            "email": email,
            "password": password
        }
    })
    return (dispatch) => {
        axios.post('users/login', data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then( response => {
                console.log("signInUser",response);
                dispatch(loginSuccess(response.data.message.token));
            })
            .catch( error => {
                console.log("signInUser", error);
                dispatch(loginFailed());
            })
    }
}

export const logOutUser = (token) => {
    console.log('logOutUser', token);
    const data = JSON.stringify({
        "token": token
    })
    return (dispatch) => {
        axios.post('/users/logout', data, {
                headers: {
                    "Access-Control-Allow-Origin": '*',
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                }
            })
            .then( response => {
                console.log('logOutUser', response);
                dispatch(logOutSuccess());
            })
            .catch( error => {
                console.log(token);
                console.log('logOutUser', error);
                dispatch(logOutFailed());
            })
    }
}

export const signUpUser = ( {email, password, firstName, lastName}) => {
    console.log(email, password, firstName, lastName);
    return (dispatch) => {
        axios.post('/users/register', {
                "user": {
                    "name": firstName + lastName,
                    "email": email,
                    "password": password
                }
            })
            .then( response => {
                console.log("signUpUser", response);
                dispatch(signUpSuccess());
            })
            .catch( error => {
                console.log("signUpUser", error);
                dispatch(signUpFailed());
            })
    }
}