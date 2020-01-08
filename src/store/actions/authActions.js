import axios from 'axios';

const loginSuccess = () => {
    return {
        type: "LOGIN_SUCCESS"
    }
}

const loginFailed = () => {
    return {
        type: "LOGIN_ERROR"
    }
}

const signUpSuccess = () => {
    return {
        type: "SIGNUP_SUCCESS"
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
    return (dispatch) => {
        axios.post('users/login',{
                "user": {
                    "email": email,
                    "password": password
                }
            })
            .then( response => {
                console.log("signInUser",response);
                dispatch(loginSuccess());
            })
            .catch( error => {
                console.log("signInUser", error);
                dispatch(loginFailed());
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