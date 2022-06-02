import React from 'react'

export default function Textarea({id, handleValue, value}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <br></br>
        <textarea 
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
