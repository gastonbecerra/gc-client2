import React from 'react'

export default function BaseInfoCard({item}) {
    
  return (
      <>

    {item &&
        <div
            style={{
                border: 'solid black 0.5px',
                maxWidth: '2ovw'
            }}
        >        
           <label>{item[1].label}</label>
           <p>{item[1].value}</p>
        </div>

    }
    </>
  )
}
