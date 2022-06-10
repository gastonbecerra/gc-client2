import React , { useEffect , useState } from "react"; 
import ListComponent from "../../components/List";
import { useSelector, useDispatch } from 'react-redux';
import { fetchContexts } from "../../store/slices/contexts";
import { fetchVars } from "../../store/slices/vars";

export default function DataIndex() {    
    const [ election, setElection ] = useState('var')    
    const { vars, vars_status } = useSelector(state => state.vars)
    const { contexts, contexts_status } = useSelector(state => state.contexts)        
    const dispatch = useDispatch();

    useEffect(()=>{
        !contexts && dispatch(fetchContexts())
        !vars && dispatch(fetchVars())

        vars_status === 'sucess' && dispatch(fetchVars());
        contexts_status === 'sucess' && dispatch(fetchContexts());
    },[vars_status, contexts_status])

    return(
        <div>
        
            <span onClick={()=>setElection('var')} style={{backgroundColor : election === 'var' ? "yellow" : null }}>variables</span>
            &nbsp; | &nbsp;
            <span onClick={()=>setElection('context')} style={{backgroundColor : election === 'context' ? "yellow" : null }}>contexto</span>

            <div>
                <ListComponent type={election} list={election === 'var' ? vars : contexts} />
            </div>        
        </div>
    );
};