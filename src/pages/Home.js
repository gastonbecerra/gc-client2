import React from "react"; 
import { Link } from "react-router-dom";

export default function HomeIndex() {
    return(

        <div className="App">
        <div>login</div>
        <div><Link to={'/sheets'}>Sheets</Link></div>
        <div><Link to={'/data'}>Data</Link></div>
        <div>experiments</div>
        <div>feed</div>
        </div>

    )
};