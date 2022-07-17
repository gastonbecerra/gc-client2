import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContexts } from '../contexts';
import { fetchVars } from '../vars';
import { fetchSheets } from '../sheets';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

export const crudSlice = createSlice({
    name: 'crud',
    initialState: {
        crud: false,
        status: null,
    },
    reducers: {
        setCrud: (state, action) => {
            state.crud = action.payload;
        }
    },
    // extraReducers: {
    //     [fetchCrud.pending] : (state, action) => {
    //         state.status = 'loading';
    //     },
    //     [fetchCrud.fulfilled] : (state, { payload }) => {
    //         state.crud = payload;
    //         state.status = 'success'; 
    //     },
    //     [fetchCrud.rejected] : (state, action) => {
    //         state.status = 'failed';
    //     }
    // }
})

export const { setCrud } = crudSlice.actions;

// const dispatch = useDispatch();

export const objectFunctions = {
    fetchvars: function () {
      (fetchVars());
      // alert('algo')
    },
    fetchcontexts: function () {
      (fetchContexts());
    },
    fetchsheets: function () {
      (fetchSheets());
    },
}

// export const fetchCrud = (type, data, callbackState) => (dispatch, getState) =>{
//     Axios({
//         url: `http://localhost:8080/${type}`,
//         method: 'get',
//     })
//     .then((res)=>{
//         dispatch()
//         return res;
//     })
//     .then((res)=>{
//         return res;
//     })
//     .catch((res)=>{
//         return res;
//     })
// }

