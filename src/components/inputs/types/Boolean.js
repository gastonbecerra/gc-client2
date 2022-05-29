import React from 'react'

export default function Boolean({id, type, handleValue, value}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input value={true} name={id} id={id} type="radio" onChange={(e)=>handleValue(e)}/>
        <input value={false} name={id} id={id} type="radio" onChange={(e)=>handleValue(e)}/>
        <br></br>
    </>
  )
}
