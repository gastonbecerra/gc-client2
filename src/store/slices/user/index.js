import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

export const userSlice = createSlice({
  name: "users",
  initialState: {
    id: false,
    username: false,
    token: false,
    email: false,
    signup_schema_types: {      
      username: { type: "text", value: "", required: true }, // input = [username, {...}] // input[1].required/value
      email: {  type: "email", value: "", required: true },
      password: { type: "password", value: "", required: true },
    },
    signin_schema_types: {      
      email: { type: "email", value: '', required: true },
      password: { type: "password", value: "", required: true },
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const signin = (data, callbackState) => (dispatch, getState) =>{
    Axios({
        method: 'POST',
        url: 'http://localhost:8080/login/signin',
        data: { data }
    })
    .then((res)=>{      
        localStorage.setItem("user", JSON.stringify(res.data));
    })
    .then(()=>{
      dispatch(isAuthenticated())
    })
    .catch((res)=>{
        callbackState(res);
    })
}

export const signup = (data, callbackState) => (dispatch, getState) =>{
    Axios({
        method: 'POST',
        url: 'http://localhost:8080/login/signup',
        data: { data }
    })
    .then((res)=>{
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .then(()=>{
      dispatch(isAuthenticated())
    })
    .catch((res)=>{
        callbackState(res);
    })
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  var data = {
        id : '',
        email : '',
        token : '',
        username: ''
    }
    dispatch(setUser(data))
}

export const isAuthenticated = () => (dispatch) => {
  if(localStorage.getItem("user")){
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }
}
