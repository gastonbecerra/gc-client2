import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
      <div style={{display: 'flex', justifyContent: 'center'}}>

    <div style={{
        display: 'flex',        
        justifyContent: 'space-around',
        border: 'black solid 0.5px',
        marginTop: '10px',
        padding: '10px',
        flexDirection: 'row',
        width: '60vw'
    }}>
        <div>
            <Link to={'/'}>
                Home
            </Link>
        </div>
        <div>
            <Link to={`/data`} state={{type: 'open'}}>
                Data
            </Link>
        </div>
        <div>
            <Link to={`/data`} state={{type: 'sheets'}}>
            Sheets
            </Link>
        </div>
        <div>
            <Link to={'/research'}>
                Research
            </Link>
        </div>
    </div>
      </div>
  )
}
