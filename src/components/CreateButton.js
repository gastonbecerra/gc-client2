import React, {useEffect} from "react"; 
import { useNavigate, useLocation } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';

export default function CreateButtonComponent( { type } ) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        console.log(type);
    } ,[type])
    
    const handleNavigation = () => {
        if(type === 'contexts'){
            navigate(`/contexts/create`) 
        } 
        if(type === 'sheets'){
            navigate(`/data/sheets/create`) 
        }
        else{
            location.pathname.includes('data') ? 
                navigate(`/sequence/${type}`) 
                :
                navigate(`${location.pathname}/create`) 
        }
        
    }
    
    return(
        <>
        <GrAddCircle onClick={ () => handleNavigation() } />
        </>
    )
};