import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

 export const fetchContexts = createAsyncThunk(
    'contexts/fetchContexts',
    async (dispatch) => {
        return fetch('http://localhost:8080/contexts').then((res) => 
            res.json()        
        )
    }
)
export default contextSlice.reducer;