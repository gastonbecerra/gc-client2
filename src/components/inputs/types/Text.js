import React from 'react'

export default function Text({id, handleValue, value}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input           
          name={id} 
          id={id} 
          type="text" 
          placeholder={value}
          onChange={(e) => handleValue(e)} />
        <br></br>
      
    </>
  )
}
