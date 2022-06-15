import React , { useEffect , useState } from "react"; 
import ListComponent from "../../components/List";
import { useSelector, useDispatch } from 'react-redux';
import { deleteContexts, fetchContexts } from "../../store/slices/contexts";
import { fetchVars, deleteVars } from "../../store/slices/vars";
import { useLocation } from "react-router-dom";
import { fetchSheets } from '../../store/slices/sheets';

export default function DataIndex(props) {    
    const {type} = useLocation().state
    const [ election, setElection ] = useState(type === 'open' ? 'vars' : type)
    const status = useSelector(state=> state[election][`${election}_status`])    
    const  items  = useSelector(state=> state[election][election])     
    const dispatch = useDispatch();
    const objectFunctions = {
        fetchvars: function(){
            dispatch(fetchVars())
        },
        fetchcontexts: function(){
            dispatch(fetchContexts())
        },
        fetchsheets: function(){
            dispatch(fetchSheets())
        },
        deletecontexts: function(a,b){
            dispatch(deleteContexts(a,b))
        },
        deletevars: function(a,b){
            dispatch(deleteVars(a,b))
        }
    }

    useEffect(()=>{
        setElection(type !== 'sheets' ? 'vars' : 'sheets')
         if(status !== 'success') {objectFunctions[`fetch${election}`]()}
    },[type, status])

    const handleDelete = (item_id, user_id) => {
        {objectFunctions[`delete${election}`](item_id, user_id)}
    }

    return(
        <div>
        {
            type !== 'sheets' &&
            <>
                <span onClick={()=>setElection('vars')} style={{backgroundColor : election === 'vars' ? "yellow" : null }}>variables</span>
                &nbsp; | &nbsp;
                <span onClick={()=>setElection('contexts')} style={{backgroundColor : election === 'contexts' ? "yellow" : null }}>contexto</span>        
            </>
        }

            <div>
                {items !== false && <ListComponent type={election} list={items} handleDelete={handleDelete}/>}
            </div>        
        </div>
    );
};