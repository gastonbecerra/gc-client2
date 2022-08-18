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
    },[]); // [] es solo en el load HOLIS


  return (
    <>
    {
        context ? (
            <>
            <div>
                <h2>{context.name}</h2>
                <p>description: {context.description}</p>
                <p>user: {context.user}</p>
                <p>rules: {JSON.stringify(context.rules)}</p>
                {/* <p>{JSON.stringify(context)}</p> */}
            </div>
            <div>
                <h3>Stats</h3>
                <ul style={{ color: 'red' }}>
                    <li># perfiles alcanzados</li>
                    <li># muestras construidas (para una variable)?</li>
                    <li>% perfiles que se reconocen / % uqe se reconocen sin serlo?</li>
                    <li># starred</li>
                </ul>
            </div>
            <div>
                <h3>You</h3>
                <ul style={{ color: 'violet' }}>
                    <li>YX alcanzado?</li>
                    <li>YX identify / feel part</li>
                    <li>YX love them / admire them / know a few / ???</li>
                    <li>YX preferidos / starred</li>
                </ul>
            </div>

            <div>
                <h3>Charts</h3>
                <p style={{ color: 'red' }}>aca hay que insertar los graficos interpretados de cada tipo de variable</p>
                <ul>
                    <li>normal</li>
                    <li>vs. you</li>
                    <li>vs. otro grupo</li>
                    <li>vs. filtro / subgrupos</li>
                </ul>
                <div style={{padding: '5px', border: '1px solid black'}}>CHART</div>
                <div style={{padding: '5px', border: '1px solid black', background: 'cyan'}}>REACTIONS
                    <ul>
                        <li>doubt</li>
                        <li>interesting</li>
                        <li>makes me angry, sad, happy...</li>
                        <li>this should not be displayed</li>
                    </ul>
                </div>
            </div>

            <div style={{ color: 'red' }}>
                <h2>Cambios API</h2>
                <p>TODO: /context == info y stats generales</p>
                <p>TODO: /context/userid == info y stats generales y de usuario</p>
                <p>TODO: /context/userid/variable/:id == info y stats generales y de la variable para ese contexto</p>
                <p>JODITA: los samples se generan por contextos (es elegir usuarios), pero esto no me asegura cantidad de casos para variables particulares...</p>
                <p>JODITA 2: si usamos los graficos con interpretacion, los indicadores los sabe ese componente... como puedo saber cómo genrarlizarlo a un grupo?</p>
            </div>

            <div>
                <h2>Otras cosas</h2>
                <p>TODO: habria que hacer una tab de "my data", donde podes bajar y borrar todo</p>
            </div>
            </>
        ) : (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }
    </>
  )
}

