import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchVars, postVar, putVar  } from "../../store/slices/vars";
import { fetchContexts, postContext, putContext  } from "../../store/slices/contexts"; 
import { renderForm, renderRequiredInput } from "../../helpers";
import { Link, useLocation , useNavigate } from "react-router-dom";
import StatsInfo from "../../components/StatsInfo"; 

export default function DataModal(props) {

    /*------------------State variables------------------*/
    const dispatch = useDispatch();
    const { vars_status, vars } = useSelector( state => state.vars ) // tomamos las vars de redux, y el esquema con y sin valores 
    const { contexts_status, contexts } = useSelector( state => state.contexts ) // tomamos los contexts, y el esquema con y sin valores 
    const { id, type } = useParams(); // id y type (var / context)
    var object = `${type}_schema`;
    const schema = useSelector(state => state[type][object] )
    const [ modeNew, setModeNew ] = useState(false); // veamos si es un elemento nuevo
    const [ state, setState ] = useState(false); // state tiene los campos a editar
    const [ stateTypes, setStateTypes ] = useState(false); // state template para renderizado de tipos de inputs
    const navigate = useNavigate();
    
    /*------------------Life cycle logic------------------*/
    useEffect(()=>{
        !vars && dispatch(fetchVars()); // si no tengo vars cargadas en redux, despacho acción de requerirlas nuevamente a través de fetch
        !contexts && dispatch(fetchContexts()); // lo mismo, pero con contextos
        id === 'create' ? setModeNew(true) : setModeNew(false); // si es create, entonces estamos creando una variable o contexto / y sino estamos editando una variable o contexto
    },[]) // onInit: fetch basic data / state view approach: create | edit

    useEffect(()=>{ // lo qe hacemos es acá son 2 cosas: 1) setear el state del formulario de edición/creación y 2) setear el esquema correspondiente que vamos a pasar a nuestro generador de fomrulario
        if((contexts_status && vars_status) === "success"){ // primero me pregunto si el status de fetching con o vars ya está fullfiled
            if(!modeNew){// si es falso => estoy editando una varable
                if ( type === 'vars') { 
                    setState(...vars.filter( v=>v._id === id ));   // filtro la variable elegida del listado de vars a través de su id - y luego la meto como estado del formulario
                }
                if ( type === 'contexts' && contexts) { 
                    setState(...contexts.filter( v=>v._id === id )); 
                } 
            }else{                 
                var flat_schema = structuredClone(schema.types);
                for(const property in flat_schema){
                    delete flat_schema[property]; 
                    flat_schema[property] = '';
                }                    
                setState(flat_schema);                         
                setStateTypes(schema.types)                           
            }
        }
    },[modeNew, vars_status, contexts_status]) // sets form's input template types depending if editing or creating

    useEffect(()=>{
        if(!modeNew){ // si estoy en edición, genero el esquema de referencia con los valores del elemento seleccionado y se lo paso como referencia al generador de formularios
            if ( state ) {                 
                var aux = structuredClone(schema.types)
                for (const property in aux) {
                    aux[property].value = state[property]; // { state = {name: juan}} => statypes = {name: {value: juan ... }} // pero antes statypes = {name: {value: '' ...}}
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

        type === 'vars' && 
            modeNew ? 
                dispatch(postVar(state, callbackState)) 
                : 
                dispatch(putVar(state, id, callbackState))
             
        type === 'contexts' && 
            modeNew ? 
                dispatch(postContext(state, callbackState)) 
                : 
                dispatch(putContext(state, id, callbackState))
    }

    const callbackState = (response) => { // returns data and status from server request
        response.status === 200 &&        
            dispatch(fetchVars());
            dispatch(fetchContexts());
            navigate('/data');
    }

    return (
        <div>
            <h1>{modeNew ? 'Creando' : 'Editando'} {type} </h1>
            <div>
                <h2>Overview</h2>                
                {state &&
                    renderForm(stateTypes, handleValue, handleSubmit)
                }                                        
            </div>
                
            <div>
                { state && !modeNew && <StatsInfo type={type} item={state}/>}
            </div>

            <div>
                <h2>Feed</h2>
            </div>

        </div>
    );
};