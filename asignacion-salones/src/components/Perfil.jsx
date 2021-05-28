import React, { useState } from 'react'
import { auth } from '../firebaseconfig'
import { useLocation} from 'react-router-dom'
const Perfil = () => {

    const user = auth.currentUser;

    const location = useLocation();

    const [name, setName] = useState(location.state?.name);
    const [email, setEmail] = useState(location.state?.email);
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState('');
    const [msgError, setMsgError] = useState(null);

    const ActualizarUsuario = (e) => {
        //e.preventDefault()

        if(name !== location.state?.name){
            user.updateProfile({
            displayName: name,
            }).then(() => {
                alert("Nombre actualizado correctamente");
            }).catch((error) => {
                alert("Error al actualizar el nombre")
                console.log("nombreError",error)
            });
        }
        if(email !== location.state?.email){
            user.updateEmail(email).then(() => {
                alert("Email actualizado correctamente");
              }).catch((error) => {
                alert("Error al actualizar el email")
                console.log("emailError",error)
              });
        }
        if(password !== location.state?.password){
            if(!password.trim()){
                alert('Debe ingresar una contraseña')
                return
            }
            if(password !== password2){
                alert('Las contraseñas deben ser iguales')
                return
            }
            user.updatePassword(password).then(() => {
                alert("Contraseña actualizada correctamente");
              }).catch((error) => {
                alert("Error al actualizar la contraseña")
                console.log("contraseñaError",error)
              });
        }
        setMsgError(null)
    
        window.location.reload(false);
        alert("Actualizacion exitosa")
    }

    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={ActualizarUsuario} className="form-group text-center">
                    <input 
                        onChange={(e)=>{setName(e.target.value) 
                            setMsgError(null)}}
                        className="form-control"
                        placeholder="Nuevo Nombre"
                        value={name}
                        type="text"/>
                    <input 
                        onChange={(e)=>{setEmail(e.target.value) 
                            setMsgError(null)}}
                        className="form-control mt-4"
                        placeholder="Nuevo Email"
                        value={email}
                        type="email"/>
                    <input 
                        onChange={(e)=>{setPassword(e.target.value)
                            setMsgError(null)}}
                        className="form-control mt-4"
                        placeholder="Nueva Contraseña"
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
                        value="Actualizar Datos"
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

export default Perfil
