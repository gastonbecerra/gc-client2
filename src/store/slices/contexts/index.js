import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchContexts = createAsyncThunk(
   'contexts/fetchContexts',
   async (dispatch) => {
       return fetch('http://localhost:8080/contexts').then((res) => 
           res.json()        
       )
   }
)

export const contextSlice = createSlice({
    name: 'contexts',
    initialState: {
        contexts: false,
        contexts_status: null,
        context_schema_types: { //this is used as a template to geerate dinamic inputs
            // _id: {type: 'id', value: ''},
            name: {type: 'text', value: ''},
            description: {type: 'textarea', value: ''},
            rules: {type: 'tags', value: ''},
            tags: {type: 'tags', value: []},
            subscribed: {type: 'info', label: "N of subscribed ", value: undefined},
            circunscribed: {type: 'info', label: "N of circunscribed ", value: undefined},
            created: {type: 'info', label: "Created at ", value: '', editable: false},
            user: {type: 'info', label: "Created by ", value: '', editable: false},   
        }
    },
    reducers: {
        setContexts : ( state, action ) => {
            state.contexts = action.payload;
        },
    },
    extraReducers: {
        [fetchContexts.pending] : (state, action) => {
            state.contexts_status = 'loading';
        },
        [fetchContexts.fulfilled] : (state, { payload }) => {
            state.contexts = payload;
            state.contexts_status = 'success';
        },
        [fetchContexts.pending] : (state, action) => {
            state.contexts_status = 'failed';
        }
    }
 })

export default contextSlice.reducer;

export const { setContexts } = contextSlice.actions;

export const postContext = (data, callbackState) => (dispatch, getState) =>{
    Axios({
        url: 'http://localhost:8080/contexts',
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


export const putContext = (data, id, callbackState) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/contexts/${id}`,
        method: 'put',
        data: {data}
    })
    .then((res)=>{        
        callbackState(res)
    })
    .catch((res)=>{
        callbackState(res)
    })
 }