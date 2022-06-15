import React,{useState, useEffect} from 'react'

export default function Number({input, handleValue}) {
  const [data, setData] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [required, setRequired] = useState(undefined);
  
  useEffect(()=>{  
    if(input)
      setData(input)
      setRequired(input[1].required)    
      setValue(input[1].value)    
      setId(input[0])
  },[])

  useEffect(()=>{
    var event = {
      target : {
        name: id,
        value: value
      }
    }
    handleValue(event)
  },[value])

  return (
    <>
        <label for={id}>{id}</label>
        <input 
          name={id} 
          id={id} 
          type="number" 
          onChange={(e)=>setValue(e.target.value)}/>
        <br></br>
    </>
  )
}
