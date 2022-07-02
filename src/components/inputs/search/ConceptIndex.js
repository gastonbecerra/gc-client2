import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
export default function ConceptIndex({state}) {
  
  const [concept, setConcept] = useState('');
  const [object, setObject] = useState();
  const [privacy, setPrivacy] = useState('public');
  const [description, setDescription] = useState('');
  const [key, setKey] = useState('');
  let keys = [ 
    ['too complex!',[]],
    ['try text/sentiment analysis', ['open text']],
    ['having more is better', ['currency (ARS)', 'currency (USD)', 'unit', 'weight (ltrs.)', 'calories', 'time (hms)']],
    ['having less is better', ['currency (ARS)', 'currency (USD)', 'unit', 'weight (ltrs.)', 'calories', 'time (hms)']],    
    ['ideal target', ['currency (ARS)', 'currency (USD)', 'unit', 'weight (ltrs.)', 'calories', 'time (hms)']],    
    ['between ranges', ['currency (ARS)', 'currency (USD)', 'unit', 'weight (ltrs.)', 'calories', 'time (hms)']],    
    ['most "YES" is better', ['yes/no']],    
    ['most "ALWAYS" is better', ['likert (never-always x5)']],    
    ['most "NEVER" is better', ['likert (never-always x5)']],    
  ]


    
  // 'mostly "ALWAYS" is preferred', 'mostly "NEVER" is preferred'];

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

  const keyOptions = () => {
    if(state !== undefined && state.scale !== undefined){
    try{
      return (
        <>
          {keys.map((k,i)=>(
            k[1].includes(state.scale) &&
            <button onClick={()=>{setKey(k[0])}}>{k[0]}</button>
            ))}
        </>
      )
    }catch(e){
      console.log(e);
    }
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setObject({
      ...state, 
      concept: concept,
      privacy: privacy,
      description: description,
      key: key,
      hashtag: `#${state.categories}_${state.timeframe}_${state.scale}_${concept}`
    });
    console.log(object);
   /*
    user
    timestamp
    privacy

   */ 
  }

  useEffect(()=>{
    console.log(object);
  },[object])
  
  return (
    <div>
    <form>
      <input type="text" placeholder='concept' name="concept" id="concept" value={concept} onChange={(e)=> setConcept(e.target.value)}/>
      <div>

      <p>Privacy: </p>
      <input type="radio" name="privacy" value="public" checked={privacy === "public" ? true : false} onClick={(e) => setPrivacy(true)}/>
      <label>Public</label>
      <input type="radio" name="privacy" value="private" checked={privacy !== "public" ? true : false} onClick={(e) => setPrivacy(false)}/>
      <label>Private</label>      
      </div>
      <label htmlFor='description'>What are you tracking on this variable?</label> <br/>
      <textarea value={description} placeholder="description" id="description" name="description" onChange={(e)=>setDescription(e.target.value)}/>
    </form>
<div>

</div>
  
    {concept.length > 0 && hash()}

    {keys.length > 0 && keyOptions()}
    <button type="sumbit" onClick={(e)=> handleSubmit(e)}>Crear Variable</button>
    </div>
  )
}

/* 

* Tenemos que identificar si venimos de creación de vars / o si desde sheet -> crear var
* * agregar lógica de origin
    -> creo variable y entro a la variable
    -> creo varibale y vuevlo a la sheet desde donde la generé

* buscar en la bd todas las variables que tengan el mismo esquema
* sugerir las opciones más acordes 
 

*/