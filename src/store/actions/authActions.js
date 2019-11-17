export const signInUser = ({ email, password }) => {
    if(email === 'pinus@pohon.id' && password === 'pinus'){
        return {
            type: "LOGIN_SUCCESS"
        }
    } else {
        return {
            type: "LOGIN_ERROR"
        }
    }
}