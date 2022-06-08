import React from 'react'

export default function Password({id, handleValue, value, required}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input           
            required={required}
          name={id} 
          id={id} 
          type="password" 
          value={value}
          onChange={(e) => handleValue(e)} />
        <br></br>
      
    </>
  )
}
