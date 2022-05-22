import React , { useEffect , useState } from "react"; 
import ListComponent from "../components/List";
import { useSelector, useDispatch } from 'react-redux';

import { fetchContexts } from "../store/slices/contexts";
import { fetchVars } from "../store/slices/vars";

export default function DataIndex() {
    
    const [election, setElection] = useState('variable')
    const { vars } = useSelector(state => state.vars)
    const { contexts } = useSelector(state => state.contexts)
    
    const dispatch = useDispatch();
    useEffect(()=>{
        !contexts && dispatch(fetchContexts())
        !vars && dispatch(fetchVars())
    },[])

    return(
        <div>
        
            <span onClick={()=>setElection('variable')} style={{backgroundColor : election === 'variable' ? "yellow" : null }}>variables</span>
            &nbsp; | &nbsp;
            <span onClick={()=>setElection('contexto')} style={{backgroundColor : election === 'contexto' ? "yellow" : null }}>contexto</span>

            <div>
                <ListComponent list={election === 'variable' ? vars : contexts} />
            </div>

        </div>
    );
};