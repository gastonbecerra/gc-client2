import React from "react"; 
import { Link } from "react-router-dom";

export default function HomeIndex() {
    const type = {
        type: 'open'
    }
    return(

        <div className="App">
        <div><Link to={'/signin'}>Login</Link></div>
        <div>
            <Link to={`/data`} state={{type: 'sheets'}}>
                Sheets
            </Link>
        </div>

        <div>
            <Link 
                to={`/data`} state={{type: 'open'}}
            >
                Data
            </Link>
        </div>

        <div>Research</div>
        <div>Feed</div>
        </div>

    )
};