import React from 'react'

export default function Textarea({id, handleValue, value, required}) {
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
            onChange={(e)=>handleValue(e)}>
        </textarea>
        <br></br>
    </>
  )
}
