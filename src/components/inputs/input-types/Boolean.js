import React, {useState, useEffect}from 'react'

export default function Boolean({input, handleValue}) {
  const [data, setData] = useState(input);
  const [id, setId] = useState(data[0]);
  const [value, setValue] = useState(data[1].value);
  const [required, setRequired] = useState(data[1].required);

  const handleChange = (evt) => {
    if(evt.target.value  === 'true'){
      setValue(true);
    }else{
      setValue(false);
    }
  }

  useEffect(()=>{
    var event = {
      target : {
        value: value,
        name: id
      }
    }
    handleValue(event);
  },[value])
  return (
    <>
        <label htmlFor={id}>{id}</label>
        <input 
          value={'true'} 
          checked={true === value}
          name={id} 
          id={id} 
          type="radio" 
          onChange={(e)=>handleChange(e)}
        />
        <input 
          value={'false'} 
          checked={false === value}
          name={id} 
          id={id} 
          type="radio" 
          onChange={(e)=>handleChange(e)}
        />
        <br></br>
    </>
  )
}
