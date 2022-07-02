import React, { useState } from "react";
import { useEffect } from "react";
import SearchIndex from "../../components/inputs/search/ConceptIndex";

export default function SequencePhase({ phase, index, sequence, handleCategory, state }) {
  const {category, handleClick} = handleCategory;
  const [content, setContent] = useState(false);
  
  useEffect(() => {
    (phase.index === 0) || !category ? setContent(Object.values(sequence[`${phase.phase}`]))
    :setContent( sequence[`${phase.phase}`][`${category}`]); 
  }, [phase, category, phase.current]);

  useEffect(() => {
    // console.log(content);
  }, [content]);
  
  return (
    <>
    <h4>{index} - {phase.phase}</h4>
    <div className="list-container">
    { (phase.index === 0) ? 
      (content) && content.map((item, i) => (          
          <div className="item" key={i} onClick={()=> handleClick(phase.phase, item)}>
          {item}
          </div>
        ))
        : 
        
        phase.phase === 'concept' ? 
          <SearchIndex state={state}/>
        : 
        (content) && content.map((item, i) => (          
          <div className="item" key={i} onClick={()=> handleClick(phase.phase, item)}>
          {item}
          </div>
        ))      
     }
    </div>
    </>
  );
}
