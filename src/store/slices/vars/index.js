import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
        var_schema_types: {
            _id: {type: 'id'},
            name: {type: 'text', value: ''},
            type: {type: 'text', value: ''},
            description: {type: 'text', value: ''},
            timeframe: {type: 'date', value: ''},
            created: {type: 'date', value: ''},
            user: {type: 'text', value: ''},            
            tags: {type: 'array', value: ''},
        }
    },
    reducers: {

    },
    extraReducers: {
        [fetchVars.pending] : (state, action) => {
            state.vars_status = 'loading';
        },
        [fetchVars.fulfilled] : (state, { payload }) => {
            state.vars = payload;
            state.vars_status = 'success';
        },
        [fetchVars.pending] : (state, action) => {
            state.vars_status = 'failed';
        }
    }
 })

 export const postVar = (data) => (dispatch) =>{
    Axios({
        url: 'http://localhost:8080/vars',
        method: 'post',
        data: {data}
    }).then((res)=>{
        console.log('sucess submting vars data');
    }).catch((e)=>{
        console.log('err posting vars data');
    })
 }


export default varSlice.reducer;

