
import React, {useState, useEffect} from 'react'

export default function Options({ input, handleValue }) {
    const [data, setData] = useState(undefined);
    const [id, setId] = useState(undefined);
    const [value, setValue] = useState(undefined);
    const [required, setRequired] = useState(undefined);
    const [options, setOptions] = useState(undefined);
    
    useEffect(()=>{  
      setData(input)
      setId(input[0])
      setRequired(input[1].required)    
      setValue(input[1].value)
    },[])

    useEffect(()=>{
        if(data !== undefined){
            setOptions(data[1].options)
        }
    },[data])


    const handleSelect = (e) => {
        var event = {
            target: {
                name: `${id}`,
                value: e.target.value
            }
        }
        handleValue(event)
    }
    return (
        <>
            <label htmlFor={id}>{id}</label>
            <select 
                required={required}
                id={id} 
                name={id} 
                onChange={(e) => handleSelect(e)}
                defaultChecked={value ? value : null}
                value={value ? value : ''}
            >
                <option disabled>Choose...</option>
                {options !== undefined && options.map((o, i) => (
                    <option key={i} value={o}>{o}</option>
                ))}
            </select>
            <br></br>
        </>
    )
}
// import React from 'react'

// export default function Options({ id, handleValue, value, options }) {
//     const handleSelect = (e) => {
//         var event = {
//             target: {
//                 name: `${id}`,
//                 value: e.target.value
//             }
//         }
//         handleValue(event)
//     }
//     return (
//         <>
//             <label htmlFor={id}>{id}</label>
//             <select 
//                 id={id} 
//                 name={id} 
//                 onChange={(e) => handleSelect(e)}
//                 defaultChecked={value ? value : null}
//                 value={value ? value : null}
//             >
//                 <option disabled>Choose...</option>
//                 {options !== false && options.map((o, i) => (
//                     <option key={i} value={o}>{o}</option>
//                 ))}
//             </select>
//             <br></br>
//         </>
//     )
// }
