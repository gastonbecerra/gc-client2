import React,{useState, useEffect} from 'react';
import { SelectType } from '../../components/inputs';
import { useSelector, useDispatch } from 'react-redux/es/exports';

export default function ContextCreate() {
    const [selected, setSelected] = useState(false); 
    const [state, setState] = useState({
        name: '',
        description: '',
        rules: [],
        vars: ''
    })
    const { vars } = useSelector(state => state.vars);

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

    const handleSelected = (e) => {
        setSelected(e.target.value)
        console.log(selected);
    }

    const displayVarControl = () =>{
        if(selected){
            var selected_var = vars.filter(v => v.name === selected)
        
        }
        return (
            <pre>
                {JSON.stringify(selected_var, null, 2)}
            </pre>
        )
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
            
            - seleccione una variable
            - ingrese una operacion (identidad, between, mayor, etc)
            - ingrese un valor
            <div>
            <SelectType input={['vars', {value:[]}]} handleValue={(e)=>handleSelected(e)}/>
            </div>
            <h3>json reglas</h3>

            <pre>{state.rules}</pre>
            
            <button type="submit" value="Create context"/>
        </form>

            {displayVarControl()}
    </>
  )
}
