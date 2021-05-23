import React, { useState } from 'react'
import { auth } from '../firebaseconfig'
import {useHistory} from 'react-router-dom'
const Login = () => {

    const historial = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setMsgError] = useState(null);

    const LoginUsuario = (e) => {
        e.preventDefault()
        if(!email.trim()){
            alert('Debe ingresar un email')
            return
        }
        if(!password.trim()){
            alert('Debe ingresar una contraseña')
            return
        }   
        auth.signInWithEmailAndPassword(email, password)
        .then( r => {
            historial.push({ pathname:'/' , state: { name: r.user.displayName}})
            //historial.push({pathname:'/', state: { nombre: r.user.displayName}})
            //historial.push('/')
        })
        .catch(error => {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setMsgError('Email incorrecto')
            }
            if(error.code === 'auth/wrong-password'){
                setMsgError('Contraseña incorrecta')
            }
        })
    }
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={LoginUsuario} className="form-group text-center">
                    <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        className="form-control"
                        placeholder="Introduce Email"
                        type="email"/>
                    <input 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        className="form-control mt-4"
                        placeholder="Introduce Contraseña"
                        type="password"/>
                    <input 
                        className="btn btn-success btn-block mt-4"
                        value="Iniciar sesion"
                        type="submit"/>
                </form>
                {
                    msgError != null ?
                    (
                        <div className="alert alert-danger">{msgError}</div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login
