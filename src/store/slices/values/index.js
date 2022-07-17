import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchValues = createAsyncThunk(
   'values/fetchValues',
   async (id) => {
       return fetch(`http://localhost:8080/values/${id}`).then((res) => 
           res.json()        
       )
   }
)

export const valueSlice = createSlice({
    name: 'values',
    initialState: {
        values: false,        
        values_status: null,
        values_vars: false
    },
    reducers: {
        setState: (state, action) => {
            state.values_status = action.payload;
        },
        setValues: (state, action) => {
            state.values_status = action.payload;
        },
        setStatus: (state, action) => {
            state.values_status = action.payload;
        },
        setValuesVars: (state, action) => {
            state.values_vars = action.payload;
        }
    },
    extraReducers: {
        [fetchValues.pending] : (state, action) => {
            state.status = 'loading';
        },
        [fetchValues.fulfilled] : (state, { payload }) => {
            state.values = payload;
            state.status = 'success'; 
        },
        [fetchValues.rejected] : (state, action) => {
            state.status = 'failed';
        }
    }
})

export const { setValues, setStatus, setState } = valueSlice.actions;

export default valueSlice.reducer; //es lo que sirve para exportar el reducer al store GRAL

export const valuesMiddlewware = (key, params) => (dispatch, getState) =>{
    switch (key) {
        case 'fetch':
            dispatch(fetchValues(params));
            break;

        case 'filter':
            dispatch(filterValues(params));
            break;    
        default:
            // dispatch((`${key}`));
    }
}
export const filterValues = (type) => (dispatch, getState) =>{
    if(getState().values.values){
        var filters =  getState().values.values.filter((value) => value.var === type)
        // alert(JSON.stringify(filters))
        return filters;
    }
}
export const postValues = (data, callbackState) => (dispatch, getState) =>{
    Axios({
        url: 'http://localhost:8080/values',
        method: 'post',
        data: { data }
    })
    .then((res)=>{
        dispatch(fetchValues())
        return res;
    })
    .then((res)=>{
        callbackState(res);
    })
    .catch((res)=>{
        callbackState(res);
    })
}
