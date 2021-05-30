import React, { useEffect, useState } from "react";
import { firedb } from "../firebaseconfig";

const AdministrarUsuarios = () => {

    const [listaUsuario, setListaUsuario] = useState([]);
    const [idUsuario, setIdUsuario] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgError, setMsgError] = useState(null);
    const [cambioUsuarios, setCambioUsuarios] = useState(false);

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const { docs } = await firedb.collection('Usuario').get()
        const nuevaLista = docs?.map( item => ({id: item.id, ...item.data()}))
        console.log(nuevaLista)
        setListaUsuario(nuevaLista)
    }

    const setUsuarios = async (e) => {
        e.preventDefault();
        if(!name.trim()){
            setMsgError("El campo nombre esta vacio")
            return
        }
        else if(!email.trim()){
            setMsgError("El campo email esta vacio")
            return
        }
        else if(!password.trim()){
            setMsgError("El campo password  esta vacio")
            return
        }
        const usuarioMod = await firedb.collection("Usuario").doc(idUsuario);
        return usuarioMod.update({
            name: name,
            email: email,
            password: password,
        })
        .then(() => {
            alert("Usuario Actualizado correctamente")
            Limpiardatos(e);
            getUsuarios();
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    const inhabilitarUsuario = async(id) => {
        const usuarioMod = await firedb.collection("Usuario").doc(id);
        return usuarioMod.update({
            active: false,
        })
        .then(() => {
            alert("Usuario inhabilitado correctamente")
            getUsuarios();
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
    const habilitarUsuario = async(id) => {
        const usuarioMod = await firedb.collection("Usuario").doc(id);
        return usuarioMod.update({
            active: true,
        })
        .then(() => {
            alert("Usuario inhabilitado correctamente")
            getUsuarios();
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    const editarUsuario = async (id) => {
        try {
            const data = await firedb.collection('Usuario').doc(id).get()
            const { name, email, password } = data.data()
            setName(name)
            setEmail(email)
            setPassword(password)
            setIdUsuario(id)
            
        } catch (error) {
            console.log("ERROR:",error)
        }
    }
    const Limpiardatos = (e) => {
        e.preventDefault()
        setName("")
        setEmail("")
        setPassword("")
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-4">
                    <h2 className="text-center">Administrar Usuarios</h2>
                    <form className="form-group text-center mt-5">
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
                        <button
                            className="btn btn-dark btn-block m-4"
                            onClick={(e) => {setUsuarios(e)}} 
                        >Actualizar Datos
                        </button> 
                        <button
                            onClick={(e) => {Limpiardatos(e)}} 
                            className="btn btn-danger btn-block m-2">
                                Limpiar Datos
                        </button>

                    </form>
                    {msgError != null ? (
                        <div className="alert alert-danger mt-4">{msgError}</div>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div className="col-1"></div>
                <div className="col-7">
                    <h2 className="text-center mb-5">Lista de Usuarios</h2>
                    <ul className="list-group">
                        {
                            listaUsuario?.length !== 0 
                            ? 
                            (
                                listaUsuario?.map(item => (
                                    <li className="list-group-item d-flex justify-content-between row" key={item.id}> 
                                    <p className={item.active? "col-8 text-justify":"col-8 text-justify text-secondary"} >{item.name} - {item.email} </p>
                                    <button onClick={(id) => {editarUsuario(item.id) }} className="btn btn-secondary col mx-2">Editar</button>
                                    {
                                        item.active ?
                                        <button onClick={(id) => {inhabilitarUsuario(item.id)}} className="btn btn-danger col mx-2">Deshabilitar</button> 
                                        :
                                        <button onClick={(id) => {habilitarUsuario(item.id)}} className="btn btn-success col mx-3 ">Habilitar</button>
                                    }
                                    </li>
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