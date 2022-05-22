import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const varSlice = createSlice({

    name: 'vars',
    initialState: {
        vars: false
    },
    reducers: {
        setVars: (state, action)=>{
            state.vars = action.payload;
        },
    }

 })

export const {setVars} = varSlice.actions;
export default varSlice.reducer;

export const fetchVars = () => (dispatch) => {
    Axios({
        method: 'get',
        url: 'http://localhost:8080/vars',
        withCredentials: true
        }).then((response)=>{   
        dispatch(setVars(response.data));
    })
    .catch((e)=>{
        console.log('failure fetching vars');
    })
}
