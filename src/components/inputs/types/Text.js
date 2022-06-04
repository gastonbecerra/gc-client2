import React from 'react'

export default function Text({id, handleValue, value, required}) {
  console.log(id, required)
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input           
        required={required}
          name={id} 
          id={id} 
          type="text" 
          placeholder={value}
          value={value}
          onChange={(e) => handleValue(e)} />
        <br></br>
      
    </>
  )
}
