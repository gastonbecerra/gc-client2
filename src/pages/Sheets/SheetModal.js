import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchVars } from '../../store/slices/vars';
import { postValues, setState } from '../../store/slices/values';
import { valuesMiddlewware } from '../../store/slices/values';
import  DataGrid  from './DataGrid';

export default function SheetModal({state, stateTypes}) {    
    const {id: user_id} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [selectedVar, setSelectedVar] = useState(false);    
    const { vars } = useSelector((state) => state.vars);
    const [stateVars, setStateVars] = useState();
    const [scale, setScale] = useState();
    const { values, values_status } = useSelector((state) => state.values);
    const [ localValues, setLocalValues ] = useState();

    useEffect(()=>{        
        !vars && dispatch(fetchVars());
        !values && dispatch(valuesMiddlewware('fetch', user_id));
    },[])

    useEffect(()=>{     
        try{
            var holder = [];
            if(vars && state){
                for(var i = 0; i < state.vars.length; i++){
                    var aux = vars.find(x => x.name === state.vars[i]);            
                    holder.push(aux)
                }            
            }        
            setStateVars(holder)            
        }catch(e){
            console.log(e);
        }   
    },[vars, state])

    useEffect(()=>{
        if(stateVars){
            for(var i = 0; i < stateVars.length; i++){
                if(stateVars[i].name === selectedVar){                
                    setScale(stateVars[i].scale)
                }
            }
        }
        if(values){
            try{
                var holder = [];
                if(vars && state){
                    for(var i = 0; i < state.vars.length; i++){
                        var aux = values.filter(x => x.var === state.vars[i]);            
                        holder.push(aux)
                    }            
                }        
                setLocalValues(holder.flat())
            }catch(e){
                console.log(e);
            }   
        }
    },[stateVars, selectedVar])

    useEffect(()=>{
        console.log(localValues);
    },[localValues])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[`${scale}`].value);
        console.log(e.target.comment.value);
        var data = {
            value: e.target[`${scale}`].value,
            var: selectedVar,
            comment: e.target.comment.value,
            user: user_id
        }
        dispatch(postValues(data, (res)=>{
            if(res.status === 200){
                e.target.reset();
            }
        }))        
    }

  return (
    <div>
        <h4>SheetModal</h4>
        <div style={{display: 'flex'}}>
        {state && state.vars.map((v,i)=>(
            <div key={i} onClick={()=> setSelectedVar(v)}>
                <span style={{backgroundColor: selectedVar === v ? 'lightgray' : null}}>{v}</span>
            </div>
        ))}
        </div>

        <div>
            {
                selectedVar ? 
                <>
                    {scale}
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="number" name={scale} id={scale} placeholder="insert value"/>
                        <br></br>
                        <textarea name="comment" id="comment" placeholder='any comment?'/>
                        <br></br>
                        <input 
                            type="submit" 
                            value="Submit"                             
                        />
                    </form>
                </>                    
                    : 
                    null
            }

            {localValues && <DataGrid values={localValues}/>}
        </div>
    </div>
  )
}
