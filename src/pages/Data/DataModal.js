import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchVars, postVar  } from "../../store/slices/vars";
import { fetchContexts  } from "../../store/slices/contexts"; 
import { renderRequiredInput } from "../../helpers";

export default function DataModal(props) {

    /*------------------State variables------------------*/
    const dispatch = useDispatch();
    const { vars_status, vars, var_schema_types } = useSelector( state => state.vars ) // tomamos las vars de redux, y el esquema con y sin valores 
    const { contexts_status, contexts, context_schema_types } = useSelector( state => state.contexts ) // tomamos los contexts, y el esquema con y sin valores 
    const { id, type } = useParams(); // id y type (var / context)
    const [ modeNew, setModeNew ] = useState(false); // veamos si es un elemento nuevo
    const [ state, setState ] = useState(false); // state tiene los campos a editar
    const [ stateTypes, setStateTypes ] = useState(false); // state template para renderizado de tipos de inputs

    /*------------------Life cycle logic------------------*/
    useEffect(()=>{
        !vars && dispatch(fetchVars());
        !contexts && dispatch(fetchContexts());
        id === 'create' ? setModeNew(true) : setModeNew(false);
    },[]) // onInit: fetch basic data / state view approach: create | edit

    useEffect(()=>{
        if((contexts_status && vars_status) === "success"){
            if(!modeNew){
                if ( type === 'var') { 
                    setState(...vars.filter( v=>v._id === id ));   
                }
                if ( type === 'context' && contexts) { 
                    setState(...contexts.filter( v=>v._id === id )); 
                } 
            }else{
                if ( type === 'var') { 
                    setState(var_schema_types)     
                    setStateTypes(var_schema_types)               
                }
                if ( type === 'context') { 
                    setState(context_schema_types); 
                    setStateTypes(context_schema_types)               
                }            
            }
        }
    },[modeNew, vars_status, contexts_status]) // sets form's input template types depending if editing or creating

    useEffect(()=>{
        if(!modeNew){
            if ( state &&  type === 'var') {                 
                var aux = structuredClone(var_schema_types)
                for (const property in aux) {                                      
                    aux[property].value = state[property]; 
                }
                setStateTypes(aux)                 
            }
            if ( state && type === 'context' && contexts) {                 
                var aux = structuredClone(context_schema_types)
                for (const property in aux) {                                       
                    aux[property].value = state[property]; 
                }
                setStateTypes(aux)                 
            }   
        }
    },[state]) // if editing values, form's input template gets previous value so it passed to form builder

    /*------------------State Functions------------------*/
    const handleValue = (evt) => { // it goes as formbuilder paramater so it handles inputs changes to local state
        var value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      };

    const handleSubmit = (e) => { //handles post or put request to database and throw redux action
        e.preventDefault();
        dispatch(postVar(state))
    }


    return (
        <div>
            <h1>{modeNew ? 'Creando' : 'Editando'} {type} </h1>
            <div>
                <h2>Overview</h2>
                <form>
                    {state &&                    
                        Object.entries(stateTypes).map((input, key)=>(
                            <span key={key}>
                                {renderRequiredInput(input, handleValue, key, modeNew)}
                            </span>
                        ))                            
                    }
                    <button 
                        type="submit"
                        onClick={(e)=>{handleSubmit(e)}}                                    
                    >
                        Submit
                    </button>
                    <pre>
                        {id}<br></br>{JSON.stringify(state)}
                    </pre>
                </form>
            </div>

            <div>
                <h2>Stats / Info</h2>
            </div>

            <div>
                <h2>Feed</h2>
            </div>

        </div>
    );
};