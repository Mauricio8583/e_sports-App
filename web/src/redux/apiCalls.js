import {loginStart, loginSuccess, loginFailure, logOut} from './userRedux'
import axios from 'axios'

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try{
        const res = await axios.post("http://localhost:3000/login", user);
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}

export const loginOut = (dispatch) => {
    try{
        dispatch(logOut())
    }catch(err){
        console.log(err)
    }
}