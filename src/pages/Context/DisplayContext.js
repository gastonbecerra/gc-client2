import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // para interctuar con los estados
import { useEffect } from 'react'; // para controlar los estados de mi componente
// import { getContexts, putContexts, deleteContexts } from '../../store/slices/contexts'; // funciones que interactuan con api, que se mandan x dispatch
import { deleteContexts, fetchContexts, returnContext } from "../../store/slices/contexts";


//import { fetchContexts, postContexts } from '../../store/slices/contexts';


export default function DisplayContext() {    
    const { id } = useParams();
    const dispatch = useDispatch();
    const [context, setContext] = React.useState(false);
    
    useEffect(()=>{
        setContext(dispatch(returnContext(id)));
    },[]); // [] es solo en el load

  return (
    <>
        <h1>{id}</h1>
        { context &&  <h4>{context.name}</h4> }
    </>
  )
}
