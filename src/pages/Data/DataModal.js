import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchVars  } from "../../store/slices/vars";
import { fetchContexts } from "../../store/slices/contexts"; 
import { renderRequiredInput } from "../../helpers";

export default function DataModal(props) {

    // veo que tipo de entidad estoy mostrando/editando/creando
    const dispatch = useDispatch();
    const { vars_status, vars, var_schema } = useSelector( state => state.vars ) // tomamos las vars de redux
    const { contexts_status, contexts, context_schema } = useSelector( state => state.contexts ) // tomamos los contexts de redux
    const { id, type } = useParams(); // id y type (var / context)
    const [ modeNew, setModeNew ] = useState(false); // veamos si es un elemento nuevo
    const [ state, setState ] = useState(false); // state tiene los campos a editar

    useEffect(() => {
        id === 'create' ? setModeNew(true) : setModeNew(false);
        !vars && dispatch(fetchVars());
        !contexts && dispatch(fetchContexts());

        try{
            if (!modeNew && (vars_status === 'fulfilled') && (contexts_status === 'fulfilled')) { // si estoy editando, voy a buscar los datos dependiendo del tipo
                if ( type === 'var') { setState(vars.filter( v=>v._id === id )); }
                if ( type === 'context' && contexts) { setState(contexts.filter( v=>v._id === id )); }                
            } else { // si es nuevo, deberia usar un template?
                if ( type === 'var') { setState(var_schema); }
                if ( type === 'context') { setState(context_schema); }                
            }
        }catch(e){
            console.error({er: e, ms: 'err filtering selecte context || var '});
        }
    },[dispatch])


    const handleValue = (evt) => {
        // const value =
        //     evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        //     setFormData({
        //     ...formData,
        //     [evt.target.name]: value,
        // });
    };

    const handleSubmit = () => {
    }

    useEffect(()=>{
        // console.log(state);
    },[state])

    return (
        <div>

            <h1>{modeNew ? 'Creando' : 'Editando'} {type} </h1>

            <div>
                <h2>Overview</h2>
                <form>
                    {state &&
                        Object.entries(state).map((input, i)=>(
                            renderRequiredInput(input)
                        ))
                    }
                </form>
            </div>

            <div>
                <h2>Stats / Info</h2>
            </div>

            <div>
                <h2>Feed</h2>
            </div>

        </div>
    );
};