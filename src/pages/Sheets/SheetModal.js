import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import SelectType from '../../components/inputs/input-types/SelectType';
import { fetchVars } from '../../store/slices/vars';
import { fetchContexts } from '../../store/slices/contexts';
import sheets, { fetchSheets } from '../../store/slices/sheets';

export default function SheetModal({state}) {
    const dispatch = useDispatch();
    const [sheet, setSheet] = useState(state);
    const { vars, vars_status } = useSelector(state => state.vars);
    const { contexts, contexts_status } = useSelector(state => state.contexts);

    useEffect(() => {
        console.log(sheet);
        setSheet(state)
    },[state])

    useEffect(() => {
        if (vars_status !== "success") {
            dispatch(fetchVars());
        }
        if(contexts_status !== 'success'){
            dispatch(fetchContexts());
        }
    }, [])

    const handleValue = (evt) => {
        console.log(evt.target.value, evt.target.name);
        const index = sheet.vars.findIndex(v => v === evt.target.name);
        if(index === -1){
            var prev_vars = sheet.vars; //genero una variable para capturar el valor anterior de vars[] // contexts[]        
            prev_vars = [...prev_vars, evt.target.value]; // a los valores previos, le agrego el nuevo valor
            setSheet({
            ...sheet, 
                [evt.target.name]: prev_vars //asigno al estado la totalidad de los valores previos + aactual
            });
        }
    }

    useEffect(()=>{
        console.log(sheet);
    },[sheet])

  return (
    <>
        <div>SHEETS</div>
        <h1>{sheet.name}</h1>
        <div style={{display: 'flex', justifyContent: 'start'}}>
            <div style={{marginRight: '10px'}}>       
            <h4>vars</h4>
            <SelectType type={'vars'} items={vars} handleValue={handleValue}/>
            <br></br>
            {sheet.vars && sheet.vars.map((s,i)=>(
                <>
                    <li key={i}>{s}</li>
                </>
            ))}
            </div>
            
            <div>
            <h4>CONTEXTS</h4>
            <SelectType type={'contexts'} items={contexts} handleValue={handleValue}/>
            <br>
            </br>
            {sheet.contexts && sheet.contexts.map((s,i)=>(
                <>
                    <li key={i}>{s}</li>
                </>
            ))}
            </div>
        </div>
        
        <div>
            <h4>PLANILLA</h4>
        </div>

        
    </>
  )
}


/*
PREGUNTAR VARIABLE X TIEMPO / ESTADO
*/