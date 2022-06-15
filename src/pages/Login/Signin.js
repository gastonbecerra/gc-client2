import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signin, signup, logout } from "../../store/slices/user";
import { renderForm } from "../../helpers";

export default function Signin() {
  const [option, setOption] = useState("signin");
  const dispatch = useDispatch();
  const { id, username  } = useSelector((state) => state.users);
  const schema = useSelector((state) => state['users'][`${option}_schema_types`]);
  const [state, setState] = useState();
  const [stateTypes, setStateTypes] = useState(false); // state template para renderizado de tipos de inputs
  const [ err, setErr ] = useState(false);
  const objectFunctions = {
    signin: function (a,b) {
      dispatch(signin(a,b));
    },
    signup: function (a,b) {
      dispatch(signup(a,b));
    }
  }

  useEffect(() => {
    if (!id) {      
        var flat_schema = structuredClone(schema); //creo una copia profunda del schema de form de registro (viene de redux)
        for (const property in flat_schema) { // recorro cada una de las propiedades del schema
          delete flat_schema[property]; // elimino cada una de las propiedades del objeto
          flat_schema[property] = ""; // { email : ' ' }
        }
        setState(flat_schema); // state = {email: '', password: '', username : ''}
        setStateTypes(schema); // stateTypes = {email: { type: "text", value: '', required: true } ... },
    }
    setErr(false) // cada vez que cambio de opción/formulario, seteo el mensaje de error a false
  }, [option]);

  useEffect(()=>{
    // console.log(state);
  },[state])

  const handleValue = (evt) => {
    // it goes as formbuilder paramater so it handles inputs changes to local state
    var value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state, //copia el estado tal cual estaba en su estado previo
      [evt.target.name]: value, //pero modifico el valor de la propiedad que me interesa
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      {objectFunctions[`${option}`](state, callbackState)}      
    }catch(e){
      console.log(e);
    }
  };

  const callbackState = (response) => {    
    try{
      if(response.status !== 200 ){
        setErr(response.response.data)
      }      
    }catch(e){
      console.log(`error ${option}`);
    }
    setOption(option)
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
            renderForm(stateTypes, handleValue, handleSubmit)
          )}
          
          {state && option === 'signup' && (            
            renderForm(stateTypes, handleValue, handleSubmit)
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
