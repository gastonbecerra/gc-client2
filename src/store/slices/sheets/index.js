import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchSheets = createAsyncThunk(
    'sheets/fetchSheets',   
    async (dispatch) => {
        return fetch('http://localhost:8080/sheets').then((res) => 
            res.json()        
        )
    }
 )

export const sheetSlice = createSlice({

    name: 'sheets',
    initialState: {
        sheets: false,
        sheets_status : null,
        sheets_schema : {
            types: {
                name: {type: 'text', value: null, required: true}, 
                description: {type: 'textarea', value: '', required: false},
                vars: {type: 'selectType', value: undefined, required: true},
                contexts: {type: 'selectType', value: ''},
                share: {type: 'boolean', value: true},
                chart: {type: 'chart', value: ''},
                tags: {type: 'tags', value: []},
            },
            info:{
                created: {type: 'info', value: '', label:"Created at ",editable: false},
                user: {type: 'info', value: '', label: "Created by ", editable: false},            
                followers:{type: 'info', value: '', label: "Created by ", editable: false},            
                description: {type: 'info', value: '', label: "Created by ", editable: false},            
                childs: { type: 'info', value: 23, label: 'Present in samples '},
            }
        }
    },
    extraReducers: {
        [fetchSheets.pending] : (state, action) => {
            state.sheets_status = 'loading';
        },
        [fetchSheets.fulfilled] : (state, { payload }) => {
            state.sheets = payload;
            state.sheets_status = 'success'; 
        },
        [fetchSheets.rejected] : (state, action) => {
            state.sheets_status = 'failed';
        }
    },
    reducers: {
        setSheets: (state, action)=>{
            state.sheets = action.payload;
        },
    }

 })

export const {setSheets} = sheetSlice.actions;
export default sheetSlice.reducer;

export const postSheets = (data, callbackState) => (dispatch, getState) =>{
    Axios({
        url: 'http://localhost:8080/sheets',
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

export const putSheets = (data, id, callbackState) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/sheets/${id}`,
        method: 'put',
        data: {data}
    })
    .then((res)=>{
        dispatch(fetchSheets())
        return res;
    })
    .then((res)=>{        
        callbackState(res)
    })
    .catch((res)=>{
        callbackState(res)
    })
 }

 export const deleteSheets = ( sheet_id, user_id) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/sheets/${sheet_id}/${user_id}`,
        method: 'delete',        
    })
    .then((res)=>{
        dispatch(fetchSheets())
        return res;
    })
    // .then((res)=>{        
    //     callbackState(res)
    // })
    // .catch((res)=>{
    //     callbackState(res)
    // })
 }
