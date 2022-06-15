import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

export default function SheetModal() {
    const { id } = useParams();
    const { sheets } = useSelector(state => state.sheets);
    const [ state, setState ] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{        
        id && sheets &&
            setState(...sheets.filter(s => s._id === id))
    },[])

    useEffect(()=>{
        console.log(state);
    },[state])

  return (
      <>
        {state && 
        <div
            style={{

                border: 'solid 0.5px black'
            }}
        >
            <h2>{state.name}</h2>
        </div>}
      </>
  )
}
