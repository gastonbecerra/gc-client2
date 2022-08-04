import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchVars } from '../../store/slices/vars';

export default function ContextCreate() {
    
    const [selectedVariable, setSelected] = useState(false); 
    const [rulesOperation, setOperation] = useState(false); 

    const [state, setState] = useState({
        name: '',
        description: '',
        rules: [],
        vars: false,        
    })

    const dispatch = useDispatch();
    
    const { vars } = useSelector(state => state.vars);

    useEffect(()=>{
        !vars && dispatch(fetchVars());
        console.log(vars);
    },[])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
        console.log(state);
    }

    const handleRules = (e) => {
        setState({
            ...state,
            rules: e.target.value
        })
        console.log(state);
    }

    const handleSelectedVariable = (e) => {
        setSelected(e.target.value)
    }

    const displaySelectedVariable = () =>{ // ves tucu! por cosas como estas camelcase es una verga
    }

    const handleRulesOperations = (e) => {
        setOperation(e.target.value);
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
                    {
                        vars && vars.map( (varItem, index) => {
                            return (
                                <option key={index} value={varItem.name}>{varItem.name}</option>
                                )
                            })
                        }
                </select>
            </div>

            {
                selectedVariable && vars.map( (varItem, index) => {
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
                                                    onChange={(e) => handleRulesOperations(e)}>>
                                                    <option value="eq">equal</option>
                                                    <option value="bt">between</option>
                                                    <option value="gt">greater than</option>
                                                    <option value="lt">less than</option>                                                    
                                                </select>,
                                            default: 'x'
                                        }[varItem.scale]
                                    }
                                <br/>

                                {
                                    rulesOperation &&
                                        <div>
                                            <h4>ingrese un valor</h4>
                                            {
                                                {
                                                    'eq': <input type="text" id="rulesValue" name="rulesValue" />,
                                                    // 'bt': <input type="text" id="rulesValue" name="rulesValue" />,
                                                    'gt': <input type="text" id="rulesValue" name="rulesValue" />,
                                                    'lt': <input type="text" id="rulesValue" name="rulesValue" />,
                                                }[rulesOperation]
                                            }
                                        </div>
                                }

                            </div>
                        )
                    }
                })
                
            }

            <h3>json reglas</h3>

            <pre>{state.rules}</pre>
            
            <button type="submit" value="Create context"/>
        </form>

    </>
  )
}
