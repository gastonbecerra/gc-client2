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
        context_schema: {
            name: {type: 'text'},
            description: {type: 'text'},
            rules: {type: 'array'},
            subscribed: {type: 'number'},
            circunscribed: '',
            tags: {type: 'array'},
            created: {type: 'date'},
            user: {type: 'text'}
        }
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
    // reducers: {
    //     setContexts: (state, action)=>{
    //         state.contexts = action.payload;
    //     },
    // }

 })

// export const {setContexts} = contextSlice.actions;
export default contextSlice.reducer;

// export const fetchContexts = () => (dispatch) => {
//     Axios({
//         method: 'get',
//         url: 'http://localhost:8080/contexts',
//         withCredentials: true
//         }).then((response)=>{   
//         dispatch(setContexts(response.data));
//     })
//     .catch((e)=>{
//         console.log('failure fetching contexts');
//     })
// }
