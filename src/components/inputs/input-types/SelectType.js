import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchContexts } from '../../../store/slices/contexts';
import { fetchVars } from '../../../store/slices/vars';
import { fetchSheets } from '../../../store/slices/sheets';
import { useNavigate } from 'react-router-dom';

export default function SelectType({input, handleValue}) {
  
  const navigate = useNavigate();
  const [data, setData] = useState(input);
  const [id, setId] = useState(data[0]);
  const [value, setValue] = useState(data[1].value === undefined ? '' : data[1].value);
  const [required, setRequired] = useState(data[1].required);
  const items = useSelector(state => state[`${input[0]}`][`${input[0]}`])
  const status = useSelector(state => state[input[0]][`${input[0]}_status`])
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
    }
}

  useEffect(()=>{
    if(status !== 'success') {objectFunctions[`fetch${id}`]()};    
  },[status])

  const handleChange = (val) => {
    console.log(val);
    var values = [value];
    const index = values.findIndex(v => v === val);
    index === -1 ? values.push(val) : values.splice(index, 1) ;
    setValue(values);    
  }
  
  useEffect(()=>{
    var event = {
      target : {
        value: value,
        name: id
      }
    }
    handleValue(event)
  },[value])

  const handleNavgation = () => {    
    navigate(`/sequence/${input[0]}`)
  }

  return (
    <>
     {data && status === 'success' &&
     <> 
     <label htmlFor={id}>Choose {id}</label>
     <select 
          required={required}
          name={id} 
          id={id} 
          type="text"           
          placeholder={value}
          onChange={(e) => handleChange(e.target.value)} 
      >
        { items && items.map((i,y)=>( 
          <>
          <option hidden selected>Selecciona una opción</option>
            <option key={y} value={i.name}>
                {i.name} 
            </option>    
          </>
        ))}
        <option onClick={() => handleNavgation()}>Crear nueva {input[0]} </option>
    </select>   
    <br></br>
    {value && value.map((v,i)=>(
      <li key={i}>
        {v !== [''] && v} <span onClick={() => handleChange(v)}> (x) </span>
      </li>
    ))}
    </>
    }
    </>
  )
}
