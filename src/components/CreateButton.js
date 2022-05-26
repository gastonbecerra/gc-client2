import React from "react"; 
import { useNavigate, useLocation } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';

export default function CreateButtonComponent( { type } ) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = () => {
        location.pathname.includes('data') ? 
            navigate(`${location.pathname}/${type}/create`) 
            :
            navigate(`${location.pathname}/create`) 
    }
    
    return(
        <>
        <GrAddCircle onClick={ () => handleNavigation() } />
        </>
    )
};