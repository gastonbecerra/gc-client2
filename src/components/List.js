import React from "react"; 
import CreateButtonComponent from "./CreateButton";
import { useLocation , useNavigate } from "react-router-dom";

export default function ListComponent( { list , type } ) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = ( id ) => {
        location.pathname.includes('data') ? 
            navigate(`${location.pathname}/${type}/${id}`) 
            :
            navigate(`${location.pathname}/${id}`) 
    }

    return(
        <>
            <div><h2>lo que sea que listamos</h2></div>
            <div>
                { list && 
                    list.map(( item , i )=>(
                        <>
                        <li onClick={ () => handleNavigation( item._id ) }>{ item.name }</li>
                        </>
                    ))
                }
            </div>
            <CreateButtonComponent type = {type} />
        </>
    )
};