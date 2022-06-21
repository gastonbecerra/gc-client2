import React, {useState, useEffect, useRef} from 'react'

export default function Tags({input, handleValue}) {
  const [data, setData] = useState(input);
  const [id, setId] = useState(data[0]);
  const [value, setValue] = useState(data[1].value);
  const [required, setRequired] = useState(data[1].required);
  
  const handleChange = (val) => {
    console.log(val);
    var values = [...value];
    const index = values.findIndex(v => v === val);
    index === -1 ? values.push(val) : values.splice(index, 1) ;
    setValue(values);    
  }

  const handleInput = (evt) => {    
    if(evt.key === 'Enter'){
      evt.preventDefault();
      var text = document.getElementById(id).value;
      var values = [...value];
      values = values.filter(v => v.length > 3);
      if(text.length > 3){
        const index = values.findIndex(v => v === text);
        index === -1 ? values.push(text) : values.splice(index, 1) ;
        setValue(values);
        document.getElementById(id).value = '';  
      }
      document.getElementById(id).value = '';
    };
  }

  const removeTag = (val) => {    
    var values = [...value];
    const index = values.findIndex(v => v === val);
    if(index !== -1) values.splice(index, 1);
    setValue(values);
  }

  useEffect(()=>{
    console.log(value);
  },[value])

  return (
    <>
        <label htmlFor={id}>{id}</label>        
        <input 
          required={required}
          name={'tags'} 
          id={'tags'} 
          type="text"
          value={undefined}                   
          onKeyDown={(e)=>{handleInput(e)}}
          placeholder="Press Enter to add a tag"
        />      
  <div>
  </div>
  
    {value && value.map((i,y)=>(
      <><span style={{backgroundColor: 'lightgray'}}> {i !== '' && i} </span><span onClick={(e)=>removeTag(i)}>(x)</span></>
    ))}
     <br></br> 
    </>
  )
}
