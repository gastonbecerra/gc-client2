import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
            _id: {type: 'id', value: ''},
            name: {type: 'text', value: ''},
            description: {type: 'text', value: ''},
            rules: {type: 'array', value: ''},
            subscribed: {type: 'number', value: ''},
            circunscribed: {type: 'number', value: ''},
            tags: {type: 'array', value: ''},
            created: {type: 'date', value: ''},
            user: {type: 'text', value: ''},
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

export default contextSlice.reducer;