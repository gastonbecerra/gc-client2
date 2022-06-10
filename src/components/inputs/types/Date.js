import React, {useState, useEffect} from 'react'

export default function Date({input, handleValue}) {
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
        <input 
          name={id} 
          id={id} 
          type="date" 
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
        <br></br>
    </>
  )
}

// import React from 'react'

// export default function Date({id, handleValue, value}) {
//   return (
//     <>
//         <label htmlFor={id}>{id}</label>
//         <input 
//           name={id} 
//           id={id} 
//           type="date" 
//           value={value}
//           onChange={(e)=> handleValue(e)}
//         />
//         <br></br>
//     </>
//   )
// }
