import React from 'react'

export default function Text({id, type}) {
  return (
    <>
        <label for={id}>{id}</label>
        <input name={id} id={id} type="text"/>
        <br></br>
      
    </>
  )
}
