import React, {useState, useEffect, useRef} from 'react'

export default function Tags({input, handleValue}) {
  const [indexs, setIndexs] = useState([]);
  const [data, setData] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [required, setRequired] = useState(undefined);
  
  useEffect(()=>{ 
    try{
      input[1].value.length > 0 && setIndexs(input[1].value) 
      setData(input)
      setId(input[0])
      setRequired(input[1].required)    
      setValue(input[1].value)
    }catch(e){

    }
  },[])
  
  const handleInput = (e) => {
  console.log(e.key);
    if((e.key === ',')){
        var tag = document.getElementById(`tagger`);
        console.log(tag.value);        
        setIndexs([
          ...indexs,
          tag
        ])
        // tag.value = '';
    }
  }

  const removeIndex = (index) => {
    setIndexs([
      indexs.filter(i => i !== index)
    ])
  }

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
          id="tagger" 
          name="tags" 
          placeholder="input options by pressing , " 
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

// import React, {useState, useEffect, useRef} from 'react'

// export default function Array({id, handleValue, value}) {
//   const [indexs, setIndexs] = useState([]);
  
  
//   const handleInput = (e) => {
//     if((e.key === ',')){
//         var ta = document.getElementById(`${id}`);
//         var tag = ta.value;
//         setIndexs([
//           ...indexs,
//           tag
//         ])
//         ta.value = '';
//     }
//   }

//   const removeIndex = (index) => {
//     setIndexs([
//       indexs.filter(i => i !== index)
//     ])
//   }
//   useEffect(()=>{
//       value && setIndexs([...value])
//   },[])

//   useEffect(()=>{
//     try{
//       if(indexs.length > 0){
//         var event = {
//           target: {
//             name: `${id}`,
//             value: indexs
//           }
//         }
//         handleValue(event)
//       }
//     }catch(e){
//       console.log('err filtering array');
//     }
//   },[indexs])

//   return (
//     <>
//         <label htmlFor={id}>{id}</label>
//         <br></br>
//         <input 
//           type="text" 
//           id="tags" 
//           name="tags" 
//           placeholder="input options by , or Enter" 
//           onKeyDown={(e)=>{handleInput(e)}}
//         />      
//   <div>
//     {indexs.length > 0 &&
//       indexs.map((i,y)=>(
//           <span 
//               onClick={()=> removeIndex(i)}
//               key={y} 
//               >
//                 { ' ' } <span style={{backgroundColor: 'lightgray'}}>{i}</span> {' ' }
//             </span>
//       ))
//     }
//   </div>
    
//   <br></br>
//     </>
//   )
// }
