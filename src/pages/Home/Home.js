import React from "react"; 
import { Link } from "react-router-dom";

export default function HomeIndex() {
    return(

        <div className="App">
        <div><Link to={'/signin'}>Login</Link></div>
        <div><Link to={'/sheets'}>Sheets</Link></div>
        <div><Link to={'/data'}>Data</Link></div>
        <div>Research</div>
        <div>Feed</div>
        </div>

    )
};