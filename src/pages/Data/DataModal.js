import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

export default function DataModal(props) {

    // veo que tipo de entidad estoy mostrando/editando/creando
    const { vars } = useSelector( state => state.vars ) // tomamos las vars de redux
    const { contexts } = useSelector( state => state.contexts ) // tomamos los contexts de redux
    const { id, type } = useParams(); // id y type (var / context)
    const [ modeNew, setModeNew ] = useState(false); // veamos si es un elemento nuevo
    const [ formData, setFormData ] = useState(false); // state tiene los campos a editar

    useEffect(() => {
        id === 'create' ? setModeNew(true) : setModeNew(false);
        if (!modeNew) { // si estoy editando, voy a buscar los datos dependiendo del tipo
            if ( type === 'var' ) { var data = vars.filter( v=>v._id === id ); }
            if ( type === 'context' ) { var data = contexts.filter( v=>v._id === id ); }
            setFormData( data[0] )
        } else { // si es nuevo, deberia usar un template?
            setFormData( false )
        }
    }, [])

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

    return (
        <div>

            <h1>{modeNew ? 'Creando' : 'Editando'} {type} </h1>

            <div>
                <h2>Overview</h2>
                <h3>{id}</h3>

                    <p>
                    2do: aca lo que hay que mostrar son los campos de formData
                                    con un loop porque asi usamos el mismo formato entre vars y contexts
                    </p>
                                    
                    <label>Name:</label>
                    <input type="text" value={formData.name} id="name" name="name" onChange={(e) => handleValue(e)} /> <br />

                {/* <label>Type:</label> <input type="text" value={state.type} id="type" name="type" onChange={(e) => handleValue(e)} /> <br /> */}

                <button onClick={() => handleSubmit()}>actualizar</button>
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