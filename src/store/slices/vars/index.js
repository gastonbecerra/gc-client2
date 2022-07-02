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
        vars_schema : {
            types: {
                name: {type: 'text', value: '', required: true}, // {name: 'ingresos'}
                type: {type: 'options', value: '', options: ['currency', 'numeric', 'string', 'object'], required: true},
                description: {type: 'textarea', value: '', required: false},
                timeframe: {type: 'options', value: '', options: ['free', 'h', 'day', 'week', 'month', 'year'], required: true},
                measurement: { type: 'options', value: '', options: ['generic', 'US Dollar'], required: true},
            },
            info: {
                created: {type: 'info', value: '', label: "Created at ",editable: false},
                user: {type: 'info', value: '', label: "Created by ", editable: false},            
                tags: {type: 'info', value: '', label: "Associated with ", required: false},
                values: { type: 'info', value: 23, label: 'Values '},
                dashboards: { type: 'info', value: 23, label: 'Present in samples '},
                followers: { type: 'info', value: 23, label: 'Followers '}
            },
            sequence: {                
                phases: {
                    categories: [
                        'spendings',  'incomes', 'moods', ' consumptions', 'training'
                    ],
                    timeframe: {
                        spendings:      [ 'free', 'daily', 'weekly', 'monthly', 'yearly', 'custom season' ],
                        incomes:        [ 'free', 'daily', 'weekly', 'monthly', 'yearly', 'custom season' ],
                        moods:          [ 'free', 'daily', 'weekly', 'monthly', 'yearly', 'custom season' ],
                        consumptions:   [ 'free', 'daily', 'weekly', 'monthly', 'yearly', 'custom season' ],
                    },
                    scale: {                        
                        spendings:      [ 'currency (ARS)', 'currency (USD)' ],
                        incomes:        [ 'currency (ARS)', 'currency (USD)' ],
                        moods:          [ 'likert (never-always x5)', 'likert (disagree-agree x5)', 'points (1-10)', 'faces (sad-happy x5)', 'yes/no', 'open text' ],
                        consumptions:   [ 'unit', 'weight (ltrs.)', 'calories', 'time (hms)' ]
                    },                    
                    concept:[
                        /*
                        - che, SEARCH => tenemos todo esto relacioado a lo que estás buscando
                        */
                    ],
                },
            }
        }
    },
    reducers: {
        setVars : ( state, action ) => {
            state.vars = action.payload;
        },
    },
    extraReducers: {
        [fetchVars.pending] : (state, action) => {
            state.vars_status = 'loading';
        },
        [fetchVars.fulfilled] : (state, { payload }) => {
            state.vars = payload;
            state.vars_status = 'success'; 
        },
        [fetchVars.rejected] : (state, action) => {
            state.vars_status = 'failed';
        }
    }
 })

export const { setVars } = varSlice.actions;

export default varSlice.reducer;

export const postVars = (data, callbackState) => (dispatch, getState) =>{
    Axios({
        url: 'http://localhost:8080/vars',
        method: 'post',
        data: {data}
    })
    .then((res)=>{
        dispatch(fetchVars())
        return res;
    })
    .then((res)=>{
        callbackState(res);
    })
    .catch((res)=>{
        callbackState(res);
    })
}


export const putVars = (data, id, callbackState) => (dispatch, getState) =>{
    Axios({
        url: `http://localhost:8080/vars/${id}`,
        method: 'put',
        data: {data}
    })
    .then((res)=>{
        dispatch(fetchVars())
        return res;
    })
    .then((res)=>{        
        callbackState(res)
    })
    .catch((res)=>{
        callbackState(res)
    })
 }

 export const deleteVars =
   (var_id, user_id, callbackState) => (dispatch, getState) => {
     Axios({
       url: `http://localhost:8080/vars/${var_id}/${user_id}`,
       method: "delete",
     })
       .then((res) => {
         dispatch(fetchVars());
         return res;
       })
       .then((res) => {
         callbackState(res);
       })
       .catch((res) => {
         callbackState(res);
       });
   };


/*

currency : [
    sub_categories: [
        expenses: {timeframe: 'free', measurement: 'US Dollar'},{measurement: 'US Dollar'}}}, 
        income, 
        investments, 
        trading
    ]
]
*/