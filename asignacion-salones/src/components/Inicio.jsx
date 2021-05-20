import React, { useEffect } from 'react'

const Inicio = () => {
    useEffect(() => {
        console.log(process.env.REACT_APP_API_KEY)
    }, [])
    return (
        <div>
            <h2>Inicio</h2>
        </div>
    )
}

export default Inicio
