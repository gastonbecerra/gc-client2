import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchVars } from '../../store/slices/vars';
import { postValues, setState } from '../../store/slices/values';
import { valuesMiddlewware } from '../../store/slices/values';
import DataGrid from './DataGrid.tsx';
import $ from 'jquery';
import BasicStats from './analysis/BasicStats';

export default function SheetModal({state, stateTypes}) {    
    const {id: user_id} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [selectedVar, setSelectedVar] = useState(false);    
    const { vars } = useSelector((state) => state.vars);
    const [stateVars, setStateVars] = useState();
    const [scale, setScale] = useState();
    const { values, values_status } = useSelector((state) => state.values);
    const [ localValues, setLocalValues ] = useState();
    const [ visible, setVisible ] = useState(false);

    useEffect(()=>{        
        !vars && dispatch(fetchVars());
        !values && dispatch(valuesMiddlewware('fetch', user_id));
    },[])

    useEffect(()=>{     
        try{
            var holder = [];
            if(vars && state){
                for(var i = 0; i < state.vars.length; i++){
                    var aux = vars.find(x => x.name === state.vars[i]);            
                    holder.push(aux)
                }            
            }        
            setStateVars(holder)            
        }catch(e){
            console.log(e);
        }   
    },[vars, state, values])

    useEffect(()=>{
        if(stateVars){
            for(var i = 0; i < stateVars.length; i++){
                if(stateVars[i].name === selectedVar){                
                    setScale(stateVars[i].scale)
                }
            }
        }
        if(values){
            try{
                var holder = [];
                if(vars && state){
                    for(var i = 0; i < state.vars.length; i++){
                        var aux = values.filter(x => x.var === state.vars[i]);            
                        holder.push(aux)
                    }            
                }        
                setLocalValues(holder.flat())
            }catch(e){
                console.log(e);
            }   
        }
    },[stateVars, selectedVar])

    useEffect(()=>{
        // console.log(localValues);
    },[localValues])

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            value: e.target[`${scale}`].value,
            var: selectedVar,
            comment: e.target.comment.value,
            user: user_id
        }
        dispatch(postValues(data, (res)=>{
            if(res.status === 200){
             $('#adder').trigger('reset');   
            }
        }))        
    }

  return (
    <div>

        {/* 

        2do: 
        - informacion de la sheet: variables y datos de uso eg., cuando la actualizaste por ultima vez // (esto ahora lo tenemos en el edit)
        - listamos las variables // (que ahora nos sirven para la datificacion <- input)
        - si las variables son temporales
            - elegir un timeframe // (esto esta)
            - elegir una funcion para agregar // (esto esta)
            - mostrar una sheet propiamente dicha // (esto esta)
            - si queremos editar, tenes una tabla tidy // (esto esta)

        - si las variables son temporales
            - XXXX

        - graficos y insights
            
        INTERPREATCION
            1 => estadística básica
                -> definir criterio curce (sacala / categoria)
                -> diccionario (tipos de variable) => un análisis por cada tipo de combinación
            2 => clave de interpretación
            - directorio o indice de interpretaciones :: cuales son los posibles analisis en general?
            - nos sirve? / ese analisis es relevante para nuestras variables?
            - variable -> interpretacion
            - escala / categoria
            
            - variables nuevas, a partir de las variables que inputa el usuario e.g., ahorro // 
            - variables del usuario e.g., daily spendings

            -----> buscar la mejor manera de interpretar la variable
                - posibles componentes:
                    - 1+ grafico
                    - 1+ tabla 
                    - 1+ insight
                    - 1+ recomendacion
                    - 1+ busqueda de info en internet
                    - 1+ comparacion con un contexto
                - reacciones ---> datificacion
                - pin / unpin to sheet ---> historico de usuario/sheet
                - informacion acerca de como se generaliza la variable, como se hace la sample
        */}

        <h4>SheetModal</h4>
        <div style={{display: 'flex'}}>
        {state && state.vars.map((v,i)=>(
            <div key={i} onClick={()=> setSelectedVar(v)}>
                <span style={{backgroundColor: selectedVar === v ? 'lightgray' : null}}>{v}</span>
            </div>
        ))}
        </div>

        <div>
            {
                selectedVar ? 
                <>
                    {scale}
                    <form id="adder" onSubmit={(e) => handleSubmit(e)}>
                        <h4 onClick={()=> setVisible(!visible)}>Add a new value?</h4>
                        <div style={{display: visible ? 'block' : 'none'}}>
                            <input type="number" name={scale} id={scale} placeholder="insert value"/>
                            <br></br>
                            <textarea name="comment" id="comment" placeholder='any comment?'/>
                            <br></br>
                            <input 
                                type="submit" 
                                value="Submit"                             
                            />
                        </div>
                    </form>
                </>                    
                    : 
                    null
            }

            {localValues && <DataGrid values={localValues} vars={stateVars}/>} 

            {localValues && <BasicStats values={localValues} vars={stateVars}/>}
            {/* 
                -> definir análisis  básico x variable
                -> definir análisis básico  x variable agregadas
                _> definir análisis x variable en clave de interpretación
             */}
        </div>
    </div>
  )
}

// un grafico para todo los expendisngs