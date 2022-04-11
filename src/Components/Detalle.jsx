import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { obtenerUnUsuario, actualizarUsuario } from '../redux/UsuarioDucks'


const Detalle = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const usuario  = useSelector(store => store?.usuario?.user)
  /*   const estadoInicial = {
        nombres: usuario?.nombres,
        apellidos: usuario?.apellidos,
        email: usuario?.email,
        edad: usuario?.edad,
        ciudad: usuario?.ciudad,
        numeroIdentificacion: usuario?.numeroIdentificacion,
        tipoIdentificacion: usuario?.tipoIdentificacion,
        sexo: usuario?.sexo,
        telefono: usuario?.telefono,
        celular: usuario?.celular,
        color_favorito: usuario?.color_favorito,
    }
    const [datos, setDatos] = useState(estadoInicial)
 */
    useEffect(()=> {
        const getUser = (id)=>{
            dispatch(obtenerUnUsuario(id))
        }
        getUser(id)
        
    }, [id, dispatch])


    console.log(usuario);

  return (
    <>
        <form>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label htmlFor="inputnombres">Nombres</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="inputnombres"
                        /* onChange={(e)=> )}   */
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputemail">Apellidos</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputemail"
                        /* value={apellidos} */
                        /* onChange={(e)=> } */ />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
    </>
  )
}

export default Detalle