import React, { useEffect, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid';

export default function Text({input, handleValue}) {
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
    {data &&
    <>
        <label htmlFor={id}>{id}</label>
        <input           
        required={data[1].required}
          name={id} 
          id={id} 
          type="text" 
          value={value}
          placeholder={value}
          onChange={(e) => setValue(e.target.value)} />
        <br></br>
        </>
    }  
    </>
  )
}

