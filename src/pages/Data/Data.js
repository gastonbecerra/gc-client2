import React , { useEffect , useState } from "react"; 
import ListComponent from "../../components/List";
import { useSelector, useDispatch } from 'react-redux';
import { deleteContexts, fetchContexts } from "../../store/slices/contexts";
import { fetchVars, deleteVar } from "../../store/slices/vars";

export default function DataIndex() {    
    const [ election, setElection ] = useState('vars')    
    const { vars, vars_status } = useSelector(state => state.vars)
    const { contexts, contexts_status } = useSelector(state => state.contexts)        
    const dispatch = useDispatch();
    const { id : user_id} = useSelector(state => state.users);

    useEffect(()=>{
        !contexts && dispatch(fetchContexts())
        !vars && dispatch(fetchVars())

        vars_status === 'sucess' && dispatch(fetchVars());
        contexts_status === 'sucess' && dispatch(fetchContexts());
    },[vars_status, contexts_status])

    const handleDelete = (item_id, user_id) => {
        election === 'vars' ? 
        dispatch(deleteVar(item_id, user_id))
        : dispatch(deleteContexts(item_id, user_id));
    }

    return(
        <div>
        
            <span onClick={()=>setElection('vars')} style={{backgroundColor : election === 'vars' ? "yellow" : null }}>variables</span>
            &nbsp; | &nbsp;
            <span onClick={()=>setElection('contexts')} style={{backgroundColor : election === 'contexts' ? "yellow" : null }}>contexto</span>

            <div>
                <ListComponent type={election} list={election === 'vars' ? vars : contexts} handleDelete={handleDelete}/>
            </div>        
        </div>
    );
};