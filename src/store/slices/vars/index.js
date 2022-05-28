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
    // reducers: {
    //     setVars: (state, action)=>{
    //         state.vars = action.payload;
    //     },
    // },
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

// export const {setVars} = varSlice.actions;
export default varSlice.reducer;

// export const fetchVars = () => (dispatch) => {
//     Axios({
//         method: 'get',
//         url: 'http://localhost:8080/vars',
//         withCredentials: true
//         }).then((response)=>{   
//         dispatch(setVars(response.data));
//     })
//     .catch((e)=>{
//         console.log('failure fetching vars');
//     })
// }

// // First, create the thunk
// const fetchUserById = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
// )