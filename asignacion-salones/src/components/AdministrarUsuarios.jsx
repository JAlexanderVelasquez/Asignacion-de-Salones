import React, { useEffect, useState } from "react";
import { firedb } from "../firebaseconfig";

const AdministrarUsuarios = () => {

    const [listaUsuario, setListaUsuario] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgError, setMsgError] = useState(null);

    useEffect(() => {
        const getUsuarios = async () => {
            const { docs } = await firedb.collection('Usuario').get()
            console.log("DOSC",docs);
            const nuevaLista = docs?.map( item => {console.log(item.id)
                return {id: item.id, ...item.data()}})
            console.log(nuevaLista)
            setListaUsuario(nuevaLista)
        }
        getUsuarios();
    }, [])

    const setUsuarios = async (e) => {
        e.preventDefault();
        if(!name.trim()){
            setMsgError("El campo nombre esta vacio")
        }
        else if(!email.trim()){
            setMsgError("El campo email esta vacio")
        }
        else if(!password.trim()){
            setMsgError("El campo password  esta vacio")
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            active: true,
        }
        console.log("USER TO STORE,",newUser)
        try {
            const data = await firedb.collection('usuario').add(newUser)
            console.log("Data stored: ", data)
        } catch (error) {
            console.log("Store error: ",error)
        }
    }

    const ActualizarUsuario = (e) => {
        //e.preventDefault()
        /*        if(name !== location.state?.name){
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
          */
    };

    const getUsuarios = () => {
        /*    admin.auth()
                .getUsers([ ])
                .then((getUsersResult) => {
                    console.log('Successfully fetched user data:');
                    getUsersResult.users.forEach((userRecord) => {
                        console.log(userRecord);
                    });
                    console.log('Unable to find users corresponding to these identifiers:');
                    getUsersResult.notFound.forEach((userIdentifier) => {
                        console.log(userIdentifier);
                    });
                    })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                });*/
    };
    /*<button onClick={getUsuarios} className="btn btn-danger float-right">
                  BuscarUSUARIOS
        </button>*/
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col">
                    <h2 className="text-center">Administrar Usuarios</h2>
                    <form
                        onSubmit={setUsuarios}
                        className="form-group text-center mt-5"
                    >
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                                setMsgError(null);
                            }}
                            className="form-control"
                            placeholder="Nuevo Nombre"
                            value={name}
                            type="text"
                        />
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setMsgError(null);
                            }}
                            className="form-control mt-4"
                            placeholder="Nuevo Email"
                            value={email}
                            type="email"
                        />
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setMsgError(null);
                            }}
                            className="form-control mt-4"
                            placeholder="Nueva Contraseña"
                            value={password}
                            type="password"
                        />
                        <input
                            className="btn btn-dark btn-block mt-4"
                            value="Actualizar Datos"
                            type="submit"
                        />
                    </form>
                    {msgError != null ? (
                        <div className="alert alert-danger mt-4">{msgError}</div>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div className="col">
                    <h2 className="text-center">Lista de Usuarios</h2>
                    <ul>
                        {
                            listaUsuario?.length !== 0 
                            ? 
                            (
                                listaUsuario?.map(item => (
                                    <li key={item.id}>{item.name} - {item.email}</li>
                                ))
                            ) 
                            :
                            (
                                <div className="m-5">
                                    No hay usuarios para mostrar.
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdministrarUsuarios;