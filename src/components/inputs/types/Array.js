import React from 'react'

export default function Array({id, type, handleValue}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <br></br>
        <textarea 
            name={id} 
            id={id} 
            rows="6" 
            cols="40"
            onChange={(e)=>handleValue(e)}>
        </textarea>
        <br></br>
    </>
  )
}
