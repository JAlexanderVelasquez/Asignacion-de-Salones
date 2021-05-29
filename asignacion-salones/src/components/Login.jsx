import React, { useState } from 'react'
import { auth, firedb } from '../firebaseconfig'
import { useHistory } from 'react-router-dom'
const Login = () => {

    const historial = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setMsgError] = useState(null);

    const LoginUsuario = async (e) => {
        e.preventDefault()
        if (!email.trim()) {
            alert('Debe ingresar un email')
            return
        }
        if (!password.trim()) {
            alert('Debe ingresar una contraseña')
            return
        }
        console.log(email)
        await firedb.collection('Usuario').where("email", "==", email)//.where("password", "==", password)//opcional
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.docs.length === 0){
                    setMsgError('El email no esta registrado');
                }
                querySnapshot.forEach((doc) => {
                    if(doc.data().active){
                        //console.log("PUEDE INGRESAR")
                        auth.signInWithEmailAndPassword(email, password)
                        .then(async r => {
                            //console.log("USUARIO LOGEADO CORRECTAMENTE")
                            historial.push({ pathname:'/' , state: { name: r.user.displayName}})
                            //historial.push({pathname:'/', state: { nombre: r.user.displayName}})
                            //historial.push('/')
                        })
                        .catch(error => {
                            if (error.code === 'auth/invalid-email') {
                                setMsgError('Email incorrecto')
                            }
                            if (error.code === 'auth/wrong-password') {
                                setMsgError('Contraseña incorrecta')
                            }
                            if (error.code === 'auth/user-not-found') {
                                setMsgError('Usuario no registrado')
                            }
                        })
                    }else{
                        alert("Este usuaio esta bloqueado")
                        //console.log("USUARIO BLOQUEADO")
                    }
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        
        //            const allUsers = docs?.map( item =>  ({...item.data()}) )
        // const allUsers = docs?.map( ({ emailU, active }) =>  { if(emailU === email) return active} )
        //const { active } = allUsers?.filter( (item) =>  item.email === email )
        //            console.log("ESTADO DEL USUARIO",da)
        //console.log("ESTADO DEL USUARIO",active)

    }
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={LoginUsuario} className="form-group text-center">
                    <input
                        onChange={(e) => { setEmail(e.target.value); setMsgError(null) }}
                        className="form-control"
                        placeholder="Introduce Email"
                        type="email" />
                    <input
                        onChange={(e) => { setPassword(e.target.value); setMsgError(null) }}
                        className="form-control mt-4"
                        placeholder="Introduce Contraseña"
                        type="password" />
                    <input
                        className="btn btn-success btn-block mt-4"
                        value="Iniciar sesion"
                        type="submit" />
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

export default Login
