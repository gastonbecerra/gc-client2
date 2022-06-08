// import React, { useEffect, useState } from 'react'

// export default function Text({input, handleValue}) {
//   const [data, setData] = useState(undefined);
//   const [id, setId] = useState(undefined);
//   const [value, setValue] = useState(undefined);
//   const [required, setRequired] = useState(undefined);
  
//   useEffect(()=>{  
//     setData(input)
//     setId(input[0])
//     setRequired(input[1].required)    
//     setValue(input[1].value)
//   },[])

//   useEffect(()=>{
//     var event = {
//       target : {
//         name: id,
//         value: value
//       }
//     }
//     handleValue(event)
//   },[value])

//   return (
//     <>
//     {data &&
//     <>
//         <label htmlFor={id}>{id}</label>
//         <input           
//         required={data[1].required}
//           name={id} 
//           id={id} 
//           type="text" 
//           value={value}
//           placeholder={value}
//           onChange={(e) => setValue(e.target.value)} />
//         <br></br>
//         </>
//     }  
//     </>
//   )
// }

import React from 'react'

export default function Text({id, handleValue, value, required}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input           
        required={required}
          name={id} 
          id={id} 
          type="text" 
          value={value}
          onChange={(e) => handleValue(e)} />
        <br></br>
      
    </>
  )
}
