import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const varSlice = createSlice({
    name: 'vars',
    initialState: {
        vars: false,
        vars_status: null,
        var_schema: {
            name: {type: 'text'},
            type: {type: 'text'},
            description: {type: 'text'},
            timeframe: {type: 'date'},
            created: {type: 'date'},
            user: {type: 'text'},
            share: {type: 'boolean'},
            tags: {type: 'array'}
        }
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

 export const fetchVars = createAsyncThunk(
    'vars/fetchVars',
    async (dispatch) => {
        return fetch('http://localhost:8080/vars').then((res) => 
            res.json()        
        )
    }
)

export default varSlice.reducer;

