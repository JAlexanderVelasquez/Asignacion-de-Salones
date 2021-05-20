import React, { useState } from 'react'
import { auth } from '../firebaseconfig'
import {useHistory} from 'react-router-dom'
const Login = () => {

    const historial = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setMsgError] = useState(null);

    const RegistrarUsuario = (e) => {
        e.preventDefault()
        if(!email.trim()){
            alert('Debe ingresar un email')
            return
        }
        if(!password.trim()){
            alert('Debe ingresar una contraseña')
            return
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then( r => {
            alert('Usuario Registrado')
            historial.push('/')
         })
        .catch(e => {
            if(e.code === 'auth/invalid-email'){
                setMsgError('Formato de email incorrecto')
            }
            if(e.code === 'auth/weak-password'){
                setMsgError('La contraseña debe tener 6 caracteres o mas')
            }
        })
        setEmail('')
        setPassword('')
        setMsgError(null)
    }
    const LoginUsuario = () => {
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
            historial.push('/')
        })
        .catch(error => {
            if(error.code === 'auth/wrong-password'){
                setMsgError('Contraseña incorrecta')
            }
        })
    }
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={RegistrarUsuario} className="form-group">
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
                        className="btn btn-dark btn-block mt-4"
                        value="Registrar Usuario"
                        type="submit"/>
                </form>
                <button
                    onClick={LoginUsuario}
                    className="btn btn-succes btn-block"
                >
                    Iniciar sesion
                </button>
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
