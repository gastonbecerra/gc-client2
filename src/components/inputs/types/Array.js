import React, {useState, useEffect, useRef} from 'react'

export default function Array({id, handleValue, value}) {
  const [indexs, setIndexs] = useState([]);
  
  
  const handleInput = (e) => {
    if((e.key === ',')){
        var ta = document.getElementById(`${id}`);
        var tag = ta.value;
        setIndexs([
          ...indexs,
          tag
        ])
        ta.value = '';
    }
  }

  const removeIndex = (index) => {
    setIndexs([
      indexs.filter(i => i !== index)
    ])
  }
  useEffect(()=>{
      value && setIndexs([...value])
  },[])

  useEffect(()=>{
    try{
      if(indexs.length > 0){
        var event = {
          target: {
            name: `${id}`,
            value: indexs
          }
        }
        handleValue(event)
      }
    }catch(e){
      console.log('err filtering array');
    }
  },[indexs])

  return (
    <>
        <label htmlFor={id}>{id}</label>
        <br></br>
        <input 
          type="text" 
          id="tags" 
          name="tags" 
          placeholder="input options by , or Enter" 
          onKeyDown={(e)=>{handleInput(e)}}
        />      
  <div>
    {indexs.length > 0 &&
      indexs.map((i,y)=>(
          <span 
              onClick={()=> removeIndex(i)}
              key={y} 
              >
                { ' ' } <span style={{backgroundColor: 'lightgray'}}>{i}</span> {' ' }
            </span>
      ))
    }
  </div>
    
  <br></br>
    </>
  )
}
