import React from 'react'

export default function Info({input}) {
  return (
    <>
    {input &&
        <p>
            <span>{ input[1].label}</span>
            {input[1].value !== undefined ? 
            <span>{input[1].value}</span>
            :<span>-</span>}
        </p>
    }
    </>
  )
}
