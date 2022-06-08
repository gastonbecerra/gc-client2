import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        border: 'black solid 0.5px',
        marginTop: '10px',
        padding: '10px'
    }}>
        <div>
            <Link to={'/'}>
                Home
            </Link>
        </div>
        <div>
            <Link to={'/data'}>
                Data
            </Link>
        </div>
        <div>
            <Link to={'/sheets'}>
            Sheets
            </Link>
        </div>
        <div>
            <Link to={'/'}>
                Feed
            </Link>
        </div>
    </div>
  )
}
