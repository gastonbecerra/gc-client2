import React from 'react'

export default function Number({id, type, handleValue}) {
  return (
    <>
        <label for={id}>{id}</label>
        <input name={id} id={id} type="number" onChange={(e)=>handleValue(e)}/>
        <br></br>
    </>
  )
}
