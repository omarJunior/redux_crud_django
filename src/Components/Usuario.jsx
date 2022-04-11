import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerUsuarios, obtenerUsuariosSiguientes, obtenerUsuariosAnterior, eliminarUsuario } from '../redux/UsuarioDucks'
import { Link } from 'react-router-dom'
import './Usuario.css'

const Usuario = () => {

    const dispatch = useDispatch()
    const usuarios = useSelector(store => store?.usuario?.results)
    const next = useSelector(store => store?.usuario?.next)
    const mensaje = useSelector(store => store?.usuario?.msg)
    const previous = useSelector(store => store?.usuario?.previous)

    useEffect(()=> {
        const obtenerData = ()=>{
            dispatch(obtenerUsuarios())
        }
        obtenerData()
    }, [dispatch])

    const eliminar = (id_usuario)=>{
        dispatch(eliminarUsuario(id_usuario))
    }

  return usuarios != undefined  ? (
      <Fragment>
        {
            mensaje && (
                <p className='msg_info'>{mensaje}</p>
            )
        }
        <table className='table'>
            <thead className='thead-dark'>
                <tr>
                    <th scope="col">#</th>
                    <th scope='col'>Nombres</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Edad</th>
                    <th scope='col'>Ciudad</th>
                    <th scope='col'>Identificacion</th>
                    <th scope='col'>N°</th>
                    <th scope='col'>Sexo</th>
                    <th scope='col'>Telefono</th>
                    <th scope='col'>Celular</th>
                    <th scope='col'>Color</th>
                    <th scope='col'>Accion</th>
                </tr>
            </thead>
            <tbody>
                { 
                    usuarios.map((item, index)=> (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{item.get_nombre_completo}</td>
                            <td>{item.email}</td>
                            <td>{item.edad}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.tipoIdentificacion ? item.tipoIdentificacion.descripcion : "-"}</td>
                            <td>{item.numeroIdentificacion}</td>
                            <td>{item.sexo ? item.sexo : "-"}</td>
                            <td>{item.telefono}</td>
                            <td>{item.celular}</td>
                            <td>{item.color_favorito}</td>
                            <td>
                            <button onClick={()=> eliminar(item.id)} className="btn btn-danger" style={{marginLeft: '4px'}} ><i className="fas fa-trash" style={{fontSize:'10px'}}></i></button>
                            <Link to={`/user/${item.id}/`}><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div className='div_button'>
            { previous && (<button className='btn btn-dark ml-2' onClick={()=> dispatch(obtenerUsuariosAnterior()) }>Anterior</button>) }
            { usuarios.length == 0 && ( <button className='btn btn-dark ml-2' onClick={()=> dispatch(obtenerUsuarios()) }>Obtener datos</button> ) }
            { next && (<button className='btn btn-dark ml-2' onClick={()=> dispatch(obtenerUsuariosSiguientes()) }>Siguiente</button>)}
       </div>
      </Fragment>
  ) : 
  null
}

export default Usuario
