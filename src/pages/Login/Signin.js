import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signin, signup, logout } from "../../store/slices/user";
import { renderRequiredInput } from "../../helpers";
import Axios from "axios";

export default function Signin() {
  const [option, setOption] = useState("signin");
  const dispatch = useDispatch();
  const { id, token, username, email, signup_schema_types, signin_schema_types } = useSelector((state) => state.users);
  const [state, setState] = useState();
  const [stateTypes, setStateTypes] = useState(false); // state template para renderizado de tipos de inputs
  const [ err, setErr ] = useState(false);

  useEffect(() => {
    if (!id) {
      if(option === 'signup'){
        var flat_schema = structuredClone(signup_schema_types);
        for (const property in flat_schema) {
          delete flat_schema[property];
          flat_schema[property] = "";
        }
        setState(flat_schema);
        setStateTypes(signup_schema_types);
      }

      if(option === 'signin'){
        var flat_schema = structuredClone(signin_schema_types);
        for (const property in flat_schema) {
          delete flat_schema[property];
          flat_schema[property] = "";
        }
        setState(flat_schema);
        setStateTypes(signin_schema_types);
      }
    }
    setErr(false)
  }, [option]);

  useEffect(()=>{
    // console.log(state);
  },[state])

  const handleValue = (evt) => {
    // it goes as formbuilder paramater so it handles inputs changes to local state
    var value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    option === 'signin' 
    ? dispatch(signin(state, callbackState))
    : dispatch(signup(state, callbackState))
  };

  const callbackState = (response) => {
    console.log(response.response.data);
    try{
      if(response.status !== 200 ){
        setErr(response.response.data)
      }
    }catch(e){
      console.log(`error ${option}`);
    }
  };

  return (
    <>
      {!id ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <p onClick={() => setOption("signin")} style={{
                backgroundColor: option === 'signin' ? 'lightgrey': null,
                padding: '10px'
              }}
              >SignIn</p>|
            <p onClick={() => setOption("signup")} style={{
                backgroundColor: option === 'signin' ? null : 'lightgrey',
                padding: '10px'
              }}
              >SignUp</p>
          </div>

          {state && option === 'signin' && (
            <form
              onSubmit={(e) => {handleSubmit(e)}}
            >
              {Object.entries(stateTypes).map((input, key) => (
                <span key={key}>
                  {renderRequiredInput(
                    input,
                    handleValue,
                    key,
                    true
                  )}
                </span>
              ))}
              <input type="submit" value={option}/>
            </form>
          )}

          {state && option === 'signup' && (
            <form
              onSubmit={(e) => {handleSubmit(e)}}
            >
              {Object.entries(stateTypes).map((input, key) => (
                <span key={key}>
                  {renderRequiredInput(
                    input,
                    handleValue,
                    key,
                    true
                  )}
                </span>
              ))}
              <input type="submit" value={option}/>
            </form>
          )} 

          {err && 
          <p style={{color: 'tomato', fontWeight: '700'}}>{err}</p>
          }         
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <p>{username}</p>
          <p onClick={()=> dispatch(logout())}>Logout</p>
        </div>
      )}
    </>
  );
}
