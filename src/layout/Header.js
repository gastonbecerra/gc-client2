import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const {username} = useSelector(state => state.users);

  return (
    <div style={{
        position: 'relative'
    }}>
        {username !== '' && 
        <p style={{
          position: 'absolute',
          display: 'inline',
          backgroundColor: 'lightgray',
          padding: '6px',
          bottom: '45%'
        }}>
    {username}</p>}
        <h1><Link to={'/'}>getContext()</Link></h1>
    </div>
  )
}
