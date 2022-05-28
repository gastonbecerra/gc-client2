import React from 'react'

export default function Date({id, type}) {
  return (
    <>
        <label for={id}>{id}</label>
        <input name={id} id={id} type="date"/>
        <br></br>
    </>
  )
}
