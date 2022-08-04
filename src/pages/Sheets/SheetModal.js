import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchVars } from '../../store/slices/vars';
import { postValues, setState } from '../../store/slices/values';
import { valuesMiddlewware } from '../../store/slices/values';
import DataGrid from './DataGrid.tsx';
import $ from 'jquery';

export default function SheetModal({state, stateTypes}) {    
    const {id: user_id} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [selectedVar, setSelectedVar] = useState(false);    
    const { vars } = useSelector((state) => state.vars);
    const [stateVars, setStateVars] = useState();
    const [scale, setScale] = useState();
    const { values, values_status } = useSelector((state) => state.values);
    const [ localValues, setLocalValues ] = useState();
    const [ visible, setVisible ] = useState(false);

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
    },[vars, state, values])

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
        // console.log(localValues);
    },[localValues])

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            value: e.target[`${scale}`].value,
            var: selectedVar,
            comment: e.target.comment.value,
            user: user_id
        }
        dispatch(postValues(data, (res)=>{
            if(res.status === 200){
             $('#adder').trigger('reset');   
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
                    <form id="adder" onSubmit={(e) => handleSubmit(e)}>
                        <h4 onClick={()=> setVisible(!visible)}>Add a new value?</h4>
                        <div style={{display: visible ? 'block' : 'none'}}>
                            <input type="number" name={scale} id={scale} placeholder="insert value"/>
                            <br></br>
                            <textarea name="comment" id="comment" placeholder='any comment?'/>
                            <br></br>
                            <input 
                                type="submit" 
                                value="Submit"                             
                            />
                        </div>
                    </form>
                </>                    
                    : 
                    null
            }

            {localValues && <DataGrid values={localValues} vars={stateVars}/>}
        </div>
    </div>
  )
}
