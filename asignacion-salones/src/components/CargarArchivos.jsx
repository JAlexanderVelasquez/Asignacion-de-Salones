import React, { useEffect, useState } from 'react'
import { store } from '../firebaseconfig'

const CargarArchivos = () => {

    const [date, setDate] = useState(new Date().toLocaleDateString())
    const [progreso, setProgreso] = useState(0)
    const [archivoD, setArchivoD] = useState("")
    const [archivoA, setArchivoA] = useState("")
//    const [asignacion, setAsignacion] = useState('<h1 style="color:red;">Aun no ha realizado una asignacion</h1>')
    const base_Url = 'http://localhost:5000/api';
    useEffect(() => {
        setDate(new Date().toLocaleDateString().replaceAll("/","-"));
    }, [])
    //const dat = new Date().toISOString();

    const subirArchivos = () => {
        if(archivoD == null || archivoD === undefined){
            alert("Por favor seleccione un archivo para la disponibilidad docente")
            return
        }
        if(archivoA == null || archivoA === undefined){
            alert("Por favor seleccione un archivo para la programacion academica")
            return
        }
//        const sotrageRef = store.ref(`Historial/${date}/${archivoD.name}`)
        const sotrageRef = store.ref(`Historial/${date}/Disponibilidad`)
        const task = sotrageRef.put(archivoD);
        task.on('state_changed',
            (snapshot) => {
                setProgreso((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            },
            function error(err) {
            },
            function complete() {   
                alert(`Archivo ${archivoD.name} subido con exito`)
            }
        )
        //const sotrageRefA = store.ref(`Historial/${date}/${archivoA.name}`)
        const sotrageRefA = store.ref(`Historial/${date}/Programacion`)
        const taskA = sotrageRefA.put(archivoA);
        taskA.on('state_changed',
            (snapshot) => {
                setProgreso((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            },
            function error(err) {
            },
            function complete() {
                alert(`Archivo ${archivoA.name} subido con exito`)
            }
        )
        const formData = new FormData();
		formData.append('csvProg', archivoA);
		formData.append('csvDispo', archivoD);
        fetch(base_Url, {method : "POST", body : formData}).then((response) => {
            return response.text()
        }).then((data) => {
        })
    }
    return (
        <div className="container">
            <h2 className=" my-5">Cargue los archivos</h2>
            
            <form className="form-group text-center">
                <p className=" my-4">Seleccion la disponibilidad docente</p>
                <input className="form-control my-4" onChange={(e) => { setArchivoD(e.target.files[0]) }} type="file" accept=".csv" />
                <p className=" my-4">Seleccion la programacion academica</p>
                <input className="form-control my-4" onChange={(e) => { setArchivoA(e.target.files[0]) }} type="file" accept=".csv" />
                <button className="btn btn-block btn-primary mt-4" onClick={(e) => {e.preventDefault(); subirArchivos();  }}>Enviar Archivos</button>
            </form>
        </div>
    )
}

export default CargarArchivos
