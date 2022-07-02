import React from 'react'
import { useEffect } from 'react';

export default function SequencePhaseContent({content, addPhase, phase, index}) {

  return (   
    <>
    {index === 0 
    ?
    <div 
            className="item" 
            onClick={()=>addPhase(phase, Object.keys(content)[0])}>
                <p>
                    { Object.keys(content)[0]} 
                </p>
        </div>
    :
        <div 
            className="item" 
            onClick={(e)=>addPhase(phase, Object.keys(content)[0])}>
                <p>
                    { Object.keys(content)[0]}
                </p>
        </div>
    } 
    </>
    
  )
}
