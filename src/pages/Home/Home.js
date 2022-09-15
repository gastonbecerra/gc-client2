import React, {useEffect} from "react"; 
import { Link } from "react-router-dom";
import { objectFunctions } from "../../store/slices/crud";
import { useSelector, useDispatch } from "react-redux";
import { valuesMiddlewware } from "../../store/slices/values";

export default function HomeIndex() {
    const { id } = useSelector(state => state.users);
    const { status } = useSelector(state => state.values);
    const dispatch = useDispatch();
    let op = 'vars';

    // useEffect(() => {
    //     id && dispatch(valuesMiddlewware('fetch', id));
    // }, [id]);
    

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
        <div>            
            <Link to={'sheetv2/1'}>
                Sheet Container
            </Link>            
        </div>
        </div>

    )
};