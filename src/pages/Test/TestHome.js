import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renderForm } from "../../helpers";

export default function TestHome() {
    const [state, setState] = useState();
    const [stateTypes, setStateTypes] = useState(false); // state template para renderizado de tipos de inputs
    const { id, token, username, email, signin_schema_types } = useSelector((state) => state.users);
    
    useEffect(()=>{
        var flat_schema = structuredClone(signin_schema_types);
        for (const property in flat_schema) {
          delete flat_schema[property];
          flat_schema[property] = "";
        }
        setState(flat_schema);
        setStateTypes(signin_schema_types);
    },[])

    const handleValue = (evt) => {
        // it goes as formbuilder paramater so it handles inputs changes to local state
        //evt.preventDefault()
        console.log(evt.target.value);
        var value =
          evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
       alert('submit')
      };

  return (
    <div>TestHome

        <h5>RF</h5>
        {renderForm(signin_schema_types, handleValue, handleSubmit)}
    </div>
  )
}
