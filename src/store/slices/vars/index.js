import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Axios from 'axios';

export const fetchVars = createAsyncThunk(
   'vars/fetchVars',
   async (dispatch) => {
       return fetch('http://localhost:8080/vars').then((res) => 
           res.json()        
       )
   }
)

export const varSlice = createSlice({
    name: 'vars',
    initialState: {
        vars: false,
        vars_status: null,
        vars_schema : {
            types: {
                name: {type: 'text', value: '', required: true}, // {name: 'ingresos'}
                type: {type: 'options', value: '', options: ['currency', 'numeric', 'string'], required: true},
                description: {type: 'textarea', value: '', required: false},
                timeframe: {type: 'options', value: '', options: ['free', 'h', 'day', 'week', 'month', 'year'], required: true},
                measurement: { type: 'options', value: '', options: ['generic', 'US Dollar'], required: true},
            },
            info: {
                created: {type: 'info', value: '', label:"Created at ",editable: false},
                user: {type: 'info', value: '', label: "Created by ", editable: false},            
                tags: {type: 'info', value: '', label: "Associated with ", required: false},
                values: { type: 'info', value: 23, label: 'Values '},
                dashboards: { type: 'info', value: 23, label: 'Present in samples '},
                followers: { type: 'info', value: 23, label: 'Followers '}
            }
        }
    },
    reducers: {
        setVars : ( state, action ) => {
            state.vars = action.payload;
        },
    },
    extraReducers: {
        [fetchVars.pending] : (state, action) => {
            state.vars_status = 'loading';
        },
        [fetchVars.fulfilled] : (state, { payload }) => {
            state.vars = payload;
            state.vars_status = 'success'; 
        },
        [fetchVars.rejected] : (state, action) => {
            state.vars_status = 'failed';
        }
    }
 })

export const { setVars } = varSlice.actions;

export default varSlice.reducer;

export const postVar = (data, callbackState) => (dispatch, getState) =>{
    Axios({
        url: 'http://localhost:8080/vars',
        method: 'post',
        data: {data}
    })
    .then((res)=>{
        callbackState(res);
    })
    .catch((res)=>{
        callbackState(res);
    })
}


export const putVar = (data, id, callbackState) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/vars/${id}`,
        method: 'put',
        data: {data}
    })
    .catch((res)=>{
        var vars = structuredClone(getState().vars.vars);
        console.log(vars);
        return res;
    })
    .then((res)=>{        
        callbackState(res)
    })
    .catch((res)=>{
        callbackState(res)
    })
 }

 export const deleteVar = ( var_id, user_id, callbackState) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/vars/${var_id}/${user_id}`,
        method: 'delete',        
    })
    .then((res)=>{
        dispatch(fetchVars())
        return res;
    })
    .then((res)=>{        
        callbackState(res)
    })
    .catch((res)=>{
        callbackState(res)
    })
 }


