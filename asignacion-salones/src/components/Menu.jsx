import React, {useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {auth} from '../firebaseconfig'
import { ArrowReturnRight, CardHeading, HouseDoorFill, QuestionCircle, PersonFill, Upload, CardText } from 'react-bootstrap-icons';

const Menu = () => {
    const historial = useHistory()
    const [usuario,setUsuario] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged( (user) => {
            if(user){
                setUsuario(user)
            }
        })
    },[usuario])

    const CerrarSesion = () => {
        auth.signOut()
        setUsuario('')
        historial.push('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark justify-content-between h5">
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
                                <Link className="nav-link" to={{ pathname:'/cargarArchivos' , state: {email: usuario?.email}}}><Upload className="mx-3" color="white" size={24}/>Asignar</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                    <li className="nav-item ">
                        {
                            (usuario.displayName === "Administrador" || usuario.email === "admin@admin.com") ?
                            (
                                <Link className="nav-link" to='/users'><CardText className="mx-3" color="white" size={24}/>Administrar</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                    <li className="nav-item ">
                        {
                            (usuario.displayName !== "Administrador" || usuario.email !== "admin@admin.com") ?
                            (
                                <Link className="nav-link" to={{ pathname:'/ayuda' , state: { name: usuario?.displayName}}}><QuestionCircle className="mx-3" color="white" size={24}/>Ayuda</Link>
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
