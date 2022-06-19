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
        contexts_schema : {
            types : {
                name: {type: 'text', value: ''},
                description: {type: 'textarea', value: ''},
                rules: {type: 'tags', value: ''},
                tags: {type: 'tags', value: []},
            },
            info: {
                subscribed: {type: 'info', label: "N of subscribed ", value: undefined},
                circunscribed: {type: 'info', label: "N of circunscribed ", value: undefined},
                samples: {type: 'info', label: "N of samples ", value: undefined},
                created: {type: 'info', label: "Created at ", value: '', editable: false},
                user: {type: 'info', label: "Created by ", value: '', editable: false},   
            }
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
        [fetchContexts.rejected] : (state, action) => {
            state.contexts_status = 'failed';
        }
    }
})

export default contextSlice.reducer;

export const { setContexts } = contextSlice.actions;

export const postContexts = (data, callbackState) => (dispatch, getState) =>{
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

export const putContexts = (data, id, callbackState) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/contexts/${id}`,
        method: 'put',
        data: {data}
    })
    .then((res)=>{
        dispatch(fetchContexts())
        return res;
    })
    .then((res)=>{        
        callbackState(res)
    })
    .catch((res)=>{
        callbackState(res)
    })
 }

 export const deleteContexts = ( context_id, user_id) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/contexts/${context_id}/${user_id}`,
        method: 'delete',        
    })
    .then((res)=>{
        dispatch(fetchContexts())
        return res;
    })
    // .then((res)=>{        
    //     callbackState(res)
    // })
    // .catch((res)=>{
    //     callbackState(res)
    // })
 }