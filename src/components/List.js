import React from "react"; 
import CreateButtonComponent from "./CreateButton";
import { Link, useLocation , useNavigate } from "react-router-dom";

export default function ListComponent( { list , type } ) {
    const navigate = useNavigate();
    const location = useLocation();

    const HandleNavigation = ( {item} ) => {
        let path;
        if(location.pathname.includes('data')){
            path = `${location.pathname}/${type}/${item._id}`;
        } else{
            path = `${location.pathname}/${item._id}`;
        }
        return(
            <Link to={path}>
                <li>
                    {item.name}
                </li>
            </Link>
        )
    }

    return(
        <>
            <div><h2>lo que sea que listamos</h2></div>
            <div>
                { list && 
                    list.map(( item , i )=>(
                        <>
                            <HandleNavigation  key={i} item={item}/>
                        </>
                    ))
                }
            </div>
            <CreateButtonComponent type = {type} />
        </>
    )
};