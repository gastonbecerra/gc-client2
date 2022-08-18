import React,{useState, useEffect} from 'react';
import { SelectType } from '../../components/inputs';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchVars } from '../../store/slices/vars';
export default function ContextCreate() {
    const [selected, setSelected] = useState(false); 
    const [state, setState] = useState({
        name: '',
        description: '',
        rules: [],
        vars: ''
    })
    const { vars } = useSelector(state => state.vars);
    //const { vars } = useSelector(state => state.vars);

    const dispatch = useDispatch();
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

    const handleSelected = (e) => {
        setSelected(e.target.value)
        //ver como transformar el array en string
        console.log(selected);
    }

    const displayVarControl = () =>{
        if(selected)
        //recorrer selectd (que es un array)

        //capturar por equivalencia de nombre (usando filter) el objeto var correspondiente

        //meterlo en otro array para mapearlo en el return
        
        
        return (
            <pre>
                
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
