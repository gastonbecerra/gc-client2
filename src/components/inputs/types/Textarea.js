import { useEffect, useState } from "react";

export default function Textarea({input, handleValue}) {
  const [data, setData] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [required, setRequired] = useState(undefined);
  
  useEffect(()=>{  
    setData(input)
    setId(input[0])
    setRequired(input[1].required)    
    setValue(input[1].value)
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
        <label htmlFor={id}>{id}</label>
        <br></br>
        <textarea 
            required={required}
            name={id} 
            id={id} 
            rows="4" 
            cols="30"
            placeholder={value}
            value={value}
            onChange={(e)=>setValue(e.target.value)}>
        </textarea>
        <br></br>
    </>
  )
}

// import React from 'react'

// export default function Textarea({id, handleValue, value, required}) {
//   return (
//     <>
//         <label htmlFor={id}>{id}</label>
//         <br></br>
//         <textarea 
//             required={required}
//             name={id} 
//             id={id} 
//             rows="4" 
//             cols="30"
//             placeholder={value}
//             value={value}
//             onChange={(e)=>handleValue(e)}>
//         </textarea>
//         <br></br>
//     </>
//   )
// }
