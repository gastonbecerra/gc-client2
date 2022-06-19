import React from 'react'

export default function SelectType({items, handleValue, type}) {
  return (
    <>
     <select id={type} name={type} onChange={(e) => handleValue(e)}>
        { items && items.map((i,y)=>(
           <>
            <option>Choose an option</option>
            <option value={i.name}>
                {i.name}
            </option>
           </>
        ))}
    </select>   
    
    </>
  )
}
