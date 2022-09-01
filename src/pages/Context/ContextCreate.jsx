import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchVars } from '../../store/slices/vars';
import { fetchContexts, postContexts } from '../../store/slices/contexts';

export default function ContextCreate() {

    const [selectedVariable, setSelected] = useState(false); 
    const [rulesOperation, setOperation] = useState(false); 
    const [rulesValue, setValue] = useState(false); 

    const [state, setState] = useState({
        name: '',
        description: '',
        rules: [],
    })

    useEffect(()=>{
        setOperation("")       
    },[selectedVariable])

    const handleInputs = (operation) => {
           return(
                <div>
                    {operation === ('eq') && 
                        <div>                            
                            <input onChange={(e)=> handleRulesValues(e)} type="number" id="rulesValue" name="rulesValue"/>        
                        </div>
                    }
                    {operation === ('lt') && 
                        <div>                            
                            <input onChange={(e)=> handleRulesValues(e)} type="number" id="rulesValue" name="rulesValue"/>        
                        </div>
                    }
                    {operation === ('gt') && 
                        <div>
                            <input onChange={(e)=> handleRulesValues(e)} type="number" id="rulesValue" name="rulesValue"/>        
                        </div>
                    }
                    {operation === 'bt' && 
                        <div>
                            <input onChange={(e)=> handleRulesValues(e)} type="number" id="rulesValuebt1" name="rulesValue"/>
                            <input onChange={(e)=> handleRulesValues(e)} type="number" id="rulesValuebt2" name="rulesValue" />
                        </div>}
                        
                <input type="submit" value="Add rule" onClick={(e)=>handleRules(e)}/>
                </div>

           )
    }

    const dispatch = useDispatch();
    
    const { vars } = useSelector(state => state.vars);
    const { contexts } = useSelector(state => state.contexts);

    useEffect(()=>{
        !vars && dispatch(fetchVars());
        console.log(vars);
        !contexts && dispatch(fetchContexts());
        console.log(contexts);
    },[])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleRules = (e) => {
        e.preventDefault();
        var rule = {
            variable: selectedVariable,
            operation: rulesOperation,
            value: rulesValue
        };
        console.log(rule);
        if(state.rules.length === 0){
            setState({
                ...state,
                rules: [rule]
            })
        }else{
            const index = state.rules.findIndex(rule => rule.variable === selectedVariable);
            if(index === -1){                
                setState({
                    ...state,
                    rules: [...state.rules, rule]
                })
            }else{
                setState({
                    ...state,
                    rules: [...state.rules.slice(0, index), rule, ...state.rules.slice(index + 1)]
                })
            }
        }
        console.log(state.rules);
    }

    // 2do: directo desde la operacion al setter
    // 2do: acla algo va a cambiar cuando el caso sea between
    const handleSelectedVariable = (e) => {
        setSelected(e.target.value)
    }
    const handleRulesValues = (e) => {
        if(rulesOperation === 'bt'){
            var value1 = document.getElementById('rulesValuebt1').value;
            var value2 = document.getElementById('rulesValuebt2').value;
            //parse int to string
            setValue(value1 + '-' + value2);
        }else{
            setValue(e.target.value);
        }
        console.log(rulesValue);
    }
    
    const submitRules = (e) => {
        e.preventDefault();        
        if (state.name === '' || state.description === '' || state.rules.length === 0) {
            alert('Please fill all fields');
        } else {
            
            dispatch(postContexts(state, response => {
                if(response.status === 200){
                    alert('Context created');
                    setState({
                        name: '',
                        description: '',
                        rules: [],
                    })
                }
            }));                
        }
    }

  return (
    <>
    <h1>ContextCreate</h1>
        <form>
            <label htmlFor='name'>Name</label>
            <input type="text" id="name" name="name" onChange={(e) => handleChange(e)}/>
            <br></br>
            <label htmlFor='description'>Description</label>
            <input type="textarea" id="description" name="description" onChange={(e) => handleChange(e)}/>
            <br></br>
            <h3>reglas</h3>
            
            <div>
                <label htmlFor='selectedVariable'>Select variable</label>
                <select id="selectedVariable" name="selectedVariable" onChange={(e) => handleSelectedVariable(e)}>
                    <option value="">Select variable</option>
                    {
                        vars && vars.map( (varItem, index) => {
                        return (
                            <option key={index} value={varItem.name}>{varItem.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            { selectedVariable && vars.map( (varItem, index) => {
                    if(varItem.name === selectedVariable) {
                        return (
                            <div key={index} style={{ 
                                border: 'black solid 0.5px',
                                marginTop: '10px',
                                padding: '10px',
                                width: '60vw',
                                fontSize: '80%',
                                textAlign: 'center'
                            }}>
                                <h4>variable seleccionada</h4>                    
                                {varItem.name}<br/>
                                {varItem.hashtag}<br/>
                                {varItem.scale}

                                <h4>ingrese una operacion</h4>
                                    {   
                                        {
                                            'currency (ARS)': 
                                                <select id="rulesOperation" name="rulesOperation"
                                                    onChange={(e) => setOperation(e.target.value)}>
                                                    <option value="">Select operation</option>
                                                    <option value="eq">equal</option>
                                                    <option value="bt">between</option>
                                                    <option value="gt">greater than</option>
                                                    <option value="lt">less than</option>                                                    
                                                </select>,
                                            default: 'x'
                                        }[varItem.scale]
                                    }
                                <br/>

                                {rulesOperation && handleInputs(rulesOperation)}

                            </div>
                        )
                    }
                })                
            }

            <h3>json reglas</h3>
            <p>{JSON.stringify(state.rules)}</p>
            <input type="button" value="Create context" onClick={(e) => submitRules(e)}/>

        </form>

    </>
  )
}