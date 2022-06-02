import React from 'react'

export default function Date({id, handleValue, value}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input 
          name={id} 
          id={id} 
          type="date" 
          value={value}
          onChange={(e)=> handleValue(e)}
        />
        <br></br>
    </>
  )
}
