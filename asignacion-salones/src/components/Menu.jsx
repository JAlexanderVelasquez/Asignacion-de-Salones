import React, {useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {auth} from '../firebaseconfig'
import { ArrowReturnRight, CardHeading, HouseDoorFill, QuestionCircle, PersonFill } from 'react-bootstrap-icons';

const Menu = () => {
    const historial = useHistory()
    const [usuario,setUsuario] = useState(null);

    useEffect(() => {
        console.log("MENUS USEEFFECT")
        auth.onAuthStateChanged( (user) => {
            if(user){
                setUsuario(user)
            }
        })
    },[usuario])

    const CerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark justify-content-between h4">
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <Link className="nav-link" to={{ pathname:'/' , state: { name: usuario?.displayName}}}> <HouseDoorFill className="mx-3" color="white" size={24} /> Inicio</Link>
                    </li>
                    <li className="nav-item ">
                        {
                            !usuario ?
                            (
                                <Link className="nav-link" to='/login'><ArrowReturnRight className="mx-3" color="white" size={24} />  Iniciar sesion</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                    <li className="nav-item ">
                        {
                            !usuario ?
                            (
                                <Link className="nav-link " to='/registro'> <CardHeading className="mx-3" color="white" size={24} />  Registrarse</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                    <li className="nav-item ">
                        {
                            usuario ?
                            (
                                <Link className="nav-link" to={{ pathname:'/perfil' , state: { name: usuario?.displayName, email: usuario?.email, password: usuario?.password}}}><PersonFill className="mx-3" color="white" size={24}/>Perfil</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                    <li className="nav-item ">
                        {
                            usuario ?
                            (
                                <Link className="nav-link" to='/ayuda'><QuestionCircle className="mx-3" color="white" size={24}/>Ayuda</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                </ul>
                {
                    usuario ?
                    (
                        <div className="float-right">
                        <button 
                            onClick={CerrarSesion}
                            className="btn btn-danger float-right">Cerrar sesion</button>
                            </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </nav>
        </div>
    )
}

export default Menu
