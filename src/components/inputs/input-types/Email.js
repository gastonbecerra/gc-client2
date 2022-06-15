import React, { useEffect, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid';

export default function Email({input, handleValue}) {
  const [data, setData] = useState(undefined);
//   const [id, setId] = useState(uuidv4());
  const [id, setId] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [required, setRequired] = useState(undefined);
  
  useEffect(()=>{  
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
        <label htmlFor={data[0]}>{data[0]}</label>
        <input           
        required={data[1].required}
          name={data[0]} 
          id={id} 
          type="email" 
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={value}
          placeholder={value}
          onChange={(e) => setValue(e.target.value)} />
        <br></br>
        </>
    }  
    </>
  )
}

