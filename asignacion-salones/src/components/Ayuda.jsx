import React, { useState } from 'react'
import { useLocation} from 'react-router-dom'

const Ayuda = () => {
    
    const location = useLocation();

    const [name, setName] = useState(location.state?.name);
    return (
        <div className="container">
            <h2  className="text-center m-5 display-2">Ayuda</h2>
            <p className="text-justiy h4">
                Esta es una aplicacion para ayudar en la asignacion de salones
                para poder hacer uso de la misma debe iniciar sesion, en caso 
                de no tener una cuenta se puede registrar.<br/><br/>
                Una vez inicie sesion puede usar el modulo Asignar, aqui debe 
                subir dos archivos csv uno para la programacion academica y otro
                con la disponibilidad docente, para esto se le proporcionan dos archivos 
                de ejemplo con los cuales se puede guiar para poder subir los de 
                manera correcta.
            </p>
            {
            (name !== undefined) 
            ?
           
            ( <div class="text-center"> 
            <div class="btn-group"> 
                <a href="EjemploDisponibilidad.csv" download="EjemploDisponibilidad.csv" class="btn btn-primary m-5 rounded-pill">Disponibilidad docente</a>
                <a href="EjemploProgramacionAcademica.csv" download="EjemploProgramacionAcademica.csv" class="btn btn-primary m-5 rounded-pill">Programacion academica</a> 
              </div>
              </div>)
            :
            (<span></span>)
            }
        </div>
    )
}

export default Ayuda
