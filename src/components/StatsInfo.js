import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { renderInfo } from '../helpers';

export default function StatsInfo({type, item}) {
    const dispatch = useDispatch();    
    var object = `${type}_schema`;
    const schema = useSelector(state => state[type][object] )
    const [ state, setState ] =  useState(false);
    const [ stateTypes, setStateTypes ] =  useState(false);

    useEffect(()=>{
        schema !== undefined &&
            setState(item)            
    },[])

    useEffect(()=>{
        if(state !== false){
            var aux = structuredClone(schema.info)
            for (const property in aux) {
                aux[property].value = state[property]; 
            }
            setStateTypes(aux)
        } 
    },[state])

  return (
    <h2>
        Stats & Info
        {state && stateTypes &&
            renderInfo(stateTypes)
        }
    </h2>
  )
}
