import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
export default function ConceptIndex({state}) {
  
  const [concept, setConcept] = useState('');

  const hash = () => {
    try{
      return (
      <div>
        <h5>{state.timeframe} {state.categories} on {concept} ({state.scale})</h5>
        <a href="#" style={{fontStyle: 'italic'}}>#{state.categories}_{state.timeframe}_{state.scale}_{concept}</a>
      </div>
      )      
    }catch(e){
      console.log(e);
    }
  }
  
  return (
    <div>
    <form>
      <input type="text" name="concept" id="concept" value={concept} onChange={(e)=> setConcept(e.target.value)}/>
    </form>
    {concept.length > 0 && hash()}
    <button type="sumbit" onClick={()=> setConcept('')}>Crear Variable</button>
    </div>
  )
}

/* 

* Tenemos que identificar si venimos de creación de vars / o si desde sheet -> crear var
* * agregar lógica de origin
    -> creo variable y entro a la variable
    -> creo varibale y vuevlo a la sheet desde donde la generé

* buscar en la bd todas las variables que tengan el mismo esquema
* sugerir 
 

*/