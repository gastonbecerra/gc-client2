import React from 'react'

export default function Date({id, type, handleValue}) {
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input 
          name={id} 
          id={id} 
          type="date" 
          placeholder="YYYY/MM/DD"
          onFocus="(this.type='date')"
          onChange={(e)=> handleValue(e)}
        />
        <br></br>
    </>
  )
}
