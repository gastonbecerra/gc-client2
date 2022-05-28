import React from 'react'

export default function Boolean({id, type}) {
  return (
    <>
        <label for={id}>{id}</label>
        <input value={id} name={id} id={id} type="radio"/>
        <input value={id} name={id} id={id} type="radio"/>
        <br></br>
    </>
  )
}
