import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Sequence.scss";
import SequencePhase from "./SequencePhase";

export default function SequenceIndex() {
  const { type } = useParams();
  const schema = useSelector((state) => state[`${type}`][`${type}_schema`]); //state.vars.schema_vars
  const [sequence, setSequence] = useState(schema.sequence.phases);
  const [maper] = useState(Object.keys(sequence));
  const [length, setLength] = useState(Object.keys(sequence).length);
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState();
  const [category, setCategory] = useState(false);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleKeys = (e) => {
    console.log(e.key);
    e.key === "ArrowRight" && nextSlide();
    e.key === "Enter" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  };
  
   const handleClick = (phase, category) => {
    if(current === 0){
      setCategory(category);
      setState({...state, [phase]: category})
    } else {
      setState({...state, [phase]: category})
    }    
    nextSlide()
  }  

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <h1>{type}</h1>
      <div className="slider">
        {maper &&
          maper.map((item, i) => (
            <div className={i === current ? "slide active" : "slide"} key={i}>
              <SequencePhase 
                phase={{index: i, phase:item, current: current} } 
                current={current} 
                sequence={sequence} 
                handleCategory={{category, handleClick}}
                state={state}
              />
            </div>
          ))}
      </div>
      <div className="center-div">
        <span onClick={prevSlide}> {"<"} </span>
        <span onClick={nextSlide}> {">"} </span>
      </div>
      {current === length ?       
        <button onClick={() => {}}>Create</button>
          :
        null
      }
    </>
  );
}


