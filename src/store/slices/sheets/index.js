import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const sheetSlice = createSlice({

    name: 'sheets',
    initialState: {
        sheets: false
    },
    reducers: {
        setSheets: (state, action)=>{
            state.sheets = action.payload;
        },
    }

 })

export const {setSheets} = sheetSlice.actions;
export default sheetSlice.reducer;

export const fetchSheets = () => (dispatch) => {
    Axios({
        method: 'get',
        url: 'http://localhost:8080/sheets',
        withCredentials: true
        }).then((response)=>{   
        dispatch(setSheets(response.data));
    })
    .catch((e)=>{
        console.log('failure fetching sheets');
    })
}
