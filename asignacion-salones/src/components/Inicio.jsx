import React from 'react'
import { useLocation } from 'react-router-dom';

const Inicio = () => {
    const location = useLocation();
    return (
        <div className="container">
            <h1 className="text-center m-5 display-2">
                Bienvenido {location.state?.name}
            </h1>
            <p className="text-justiy h4">
                Esta es una aplicacion para ayudar en la asignacion de salones
                para poder hacer uso de la misma debe iniciar sesion, en caso 
                de no tener una cuenta se puede registrar.<br/><br/>
                Si tiene cualquier duda de sus funcionalidades una vez inicie
                sesion puede ir a la seccion de ayuda en el menú superior.
            </p>
        </div>
    )
}

export default Inicio
