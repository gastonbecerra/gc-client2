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
        var_schema_types: {
            _id: {type: 'id'},
            name: {type: 'text', value: '', required: true},
            type: {type: 'text', value: '', required: true},
            description: {type: 'textarea', value: '', required: true},
            timeframe: {type: 'options', value: '', options: ['free', 'h', 'day', 'week', 'month', 'year'], required: true},
            created: {type: 'date', value: '', editable: false},
            user: {type: 'text', value: '', editable: false},            
            tags: {type: 'array', value: '', required: false},
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
        [fetchVars.pending] : (state, action) => {
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
        const { vars } = getState().vars
        dispatch(setVars([...vars, res.data]))        
        return res;
    })
    .then((res)=>{
        callbackState(res);
    })
    .catch((res)=>{
        callbackState(res);
    })
}

// export const updateVars = (data, mode) => (useDispatch) => {

// }

export const putVar = (data, id, callbackState) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/vars/${id}`,
        method: 'put',
        data: {data}
    })
    .then((res)=>{        
        const { vars } = getState().vars;        
        const idx = vars.findIndex(v => v._id === res.data._id);
        const n_vars = [...vars];
        if(idx !== -1){
            dispatch(setVars(n_vars.splice(idx,1,res.data)))
        }
        return res;
    })
    .then((res)=>{
        callbackState(res, res.status)
        return res;
    })
    .catch((res)=>{
        callbackState(res.data, res.status)
    })
 }


