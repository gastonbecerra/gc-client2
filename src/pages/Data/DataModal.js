import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVars, postVars, putVars } from "../../store/slices/vars";
import {fetchContexts,postContexts,putContexts,} from "../../store/slices/contexts";
import { renderForm } from "../../helpers";
import { useNavigate } from "react-router-dom";
import StatsInfo from "../../components/StatsInfo";
import { fetchSheets, deleteSheets, putSheets, postSheets } from "../../store/slices/sheets";
import SheetModal from "../Sheets/SheetModal";

export default function DataModal(props) {
  /*------------------State variables------------------*/
  const { id, type } = useParams(); 
  const dispatch = useDispatch();
  const items = useSelector((state) => state[type][type]);
  const status = useSelector((state) => state[type][`${type}_status`]);
  const schema = useSelector((state) => state[type][`${type}_schema`]);
  const [modeNew, setModeNew] = useState(false); 
  const [state, setState] = useState(false); 
  const [stateTypes, setStateTypes] = useState(false); 
  const navigate = useNavigate();
  const objectFunctions = {
    fetchvars: function () {
      dispatch(fetchVars());
    },
    fetchcontexts: function () {
      dispatch(fetchContexts());
    },
    fetchsheets: function () {
      dispatch(fetchSheets());
    },
    putvars: function (a, b, c) {
      dispatch(putVars(a, b, c));
    },
    putcontexts: function (a, b, c) {
      dispatch(putContexts(a, b, c));
    },
    postvars: function (a, b) {
      dispatch(postVars(a, b));
    },
    postcontexts: function (a, b) {
      dispatch(postContexts(a, b));
    },
    putsheets: function (a, b, c) {
      dispatch(putSheets(a, b, c));
    },
    postsheets: function (a, b) {
      dispatch(postSheets(a, b));
    },
  };

  /*------------------Life cycle logic------------------*/
  useEffect(() => {
    {objectFunctions[`fetch${type}`]()}
    id === "create" ? setModeNew(true) : setModeNew(false); 
  }, []); 

  useEffect(() => {    
    if (status === "success") {      
      if (!modeNew) {                
        setState(...items.filter((v) => v._id === id));
      } else {
        var flat_schema = structuredClone(schema.types);
        for (const property in flat_schema) {
          delete flat_schema[property];
          flat_schema[property] = "";
        }
        setState(flat_schema);
        setStateTypes(schema.types);
      }
    }
  }, [modeNew, status]); 

  useEffect(() => {
    if (!modeNew) {
      if (state) {
        var aux = structuredClone(schema.types);
        for (const property in aux) {
          aux[property].value = state[property];
        }
        setStateTypes(aux);
      }
    }
  }, [state]);

  /*------------------State Functions------------------*/
  const handleValue = (evt) => {
    var value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modeNew) {
      {objectFunctions[`post${type}`](state, callbackState)}
    }
    if (!modeNew) {
      {objectFunctions[`put${type}`](state, state._id, callbackState)}
    }
  };

  const callbackState = (response) => {
    if (response.status === 200) {
      {objectFunctions[`fetch${type}`]()}
      navigate("/data", { state: { type: type } });
    }
  };

  useEffect(() => {
    // console.log(state);
  },[state])

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        maxWidth: '500px'
      }}>
        <b onClick={()=> id !== 'create' ? setModeNew(false): null} style={{backgroundColor: !modeNew ? 'lightgrey' : null}}>Overview</b>
        <b>/</b>
        <b onClick={()=> setModeNew(true) } style={{backgroundColor: modeNew ? 'lightgrey' : null}}>Edit</b>
      </div>
    {modeNew ?
      <div>
        <h4>Edit</h4>
        {state && renderForm(stateTypes, handleValue, handleSubmit)}
      </div>
      :
      <>
        {/* <div>{state && !modeNew && <StatsInfo type={type} item={state} />}</div>
        <div>
          <h4>Feed</h4>
          <p>Lorem impusm noticias de ayer, extra, exra!</p>
        </div> */}
      </>
    }
      {type === 'sheets' ?
        <SheetModal state={state} stateTypes={stateTypes}/>
      :
        null
      }
 
    </>
  );
}
