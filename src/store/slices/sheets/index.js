import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

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
                vars: {type: 'selectVars', value: undefined, required: true},
                share: {type: 'boolean', value: false},
                description: {type: 'textarea', value: '', required: false},
                chart: {type: 'chart', value: ''},
                tags: {type: 'tagas', value: ''}
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

// export const fetchSheets = () => (dispatch) => {
//     Axios({
//         method: 'get',
//         url: 'http://localhost:8080/sheets',
//         withCredentials: true
//         }).then((response)=>{   
//         dispatch(setSheets(response.data));
//     })
//     .catch((e)=>{
//         console.log('failure fetching sheets');
//     })
// }
