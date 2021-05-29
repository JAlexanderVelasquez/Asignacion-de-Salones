import React, { useState } from 'react'
import { auth, firedb } from '../firebaseconfig'
import {useHistory} from 'react-router-dom'
const Registro = () => {

    const historial = useHistory()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [msgError, setMsgError] = useState(null);

    const RegistrarUsuario = (e) => {
        e.preventDefault()
        if(!name.trim()){
            alert('Debe ingresar un nombre')
            return
        }
        if(!email.trim()){
            alert('Debe ingresar un email')
            return
        }
        if(!password.trim()){
            alert('Debe ingresar una contraseña')
            return
        }
        if(password !== password2){
            alert('Las contraseñas deben ser iguales')
            return
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await user.updateProfile({displayName: name})
    
            const newUser = {
                authId:user.uid,
                name: name,
                email: email,
                password: password,
                active: true,
            }
            try {
                const data = await firedb.collection('Usuario').add(newUser)
            } catch (error) {
                console.log("Store error: ",error)
            }

            alert(`Usuario ${name} Registrado`)
            historial.push({ pathname:'/' , state: { name: name}})
         })
        .catch(e => {
            if(e.code === 'auth/invalid-email'){
                setMsgError('Formato de email incorrecto')
                setEmail('')
            }
            if(e.code === 'auth/weak-password'){
                setMsgError('La contraseña debe tener 6 caracteres o mas')
                setPassword('')
                setPassword2('')
            }
        })
        setMsgError(null)
    }
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={RegistrarUsuario} className="form-group text-center">
                    <input 
                        onChange={(e)=>{setName(e.target.value) 
                            setMsgError(null)}}
                        className="form-control"
                        placeholder="Introduce su Nombre"
                        value={name}
                        type="text"/>
                    <input 
                        onChange={(e)=>{setEmail(e.target.value) 
                            setMsgError(null)}}
                        className="form-control mt-4"
                        placeholder="Introduce Email"
                        value={email}
                        type="email"/>
                    <input 
                        onChange={(e)=>{setPassword(e.target.value)
                            setMsgError(null)}}
                        className="form-control mt-4"
                        placeholder="Introduce Contraseña"
                        value={password}
                        type="password"/>
                    <input 
                        onChange={(e)=>{setPassword2(e.target.value)
                            setMsgError(null)}}
                        className="form-control mt-4"
                        placeholder="Repita su Contraseña"
                        value={password2}
                        type="password"/>
                    <input 
                        className="btn btn-dark btn-block mt-4"
                        value="Registrar Usuario"
                        type="submit"/>
                </form>
                {
                    msgError != null ?
                    (
                        <div className="alert alert-danger mt-4">{msgError}</div>
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

export default Registro
