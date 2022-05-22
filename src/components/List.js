import React from "react"; 
import { Link } from "react-router-dom";

export default function ListComponent( { list } ) {
    return(
        <>
            <div><h2>loq ue sea que listamos</h2></div>
            <div>
                { list && 
                    list.map(( item , i )=>(
                        <>
                            <li>{ item.name }</li>
                        </>
                    ))
                }
            </div>
        </>
    )
};