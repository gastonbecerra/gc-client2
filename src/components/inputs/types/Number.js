import React from 'react'

export default function Number({id, type}) {
  return (
    <>
        <label for={id}>{id}</label>
        <input name={id} id={id} type="number"/>
        <br></br>
    </>
  )
}