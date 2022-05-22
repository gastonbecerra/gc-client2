import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const contextSlice = createSlice({

    name: 'contexts',
    initialState: {
        contexts: false
    },
    reducers: {
        setContexts: (state, action)=>{
            state.contexts = action.payload;
        },
    }

 })

export const {setContexts} = contextSlice.actions;
export default contextSlice.reducer;

export const fetchContexts = () => (dispatch) => {
    Axios({
        method: 'get',
        url: 'http://localhost:8080/contexts',
        withCredentials: true
        }).then((response)=>{   
        dispatch(setContexts(response.data));
    })
    .catch((e)=>{
        console.log('failure fetching contexts');
    })
}
