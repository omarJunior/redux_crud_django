import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerDatos, eliminarUsuario } from '../redux/UsuarioDucks'
import { Link } from 'react-router-dom'
import './Usuario.css'

const Usuario = () => {

    const dispatch = useDispatch()
    const usuarios = useSelector(item => item?.usuario?.user?.results)
    const mensaje = useSelector(item => item?.usuario?.msg)

    useEffect(()=> {
        const obtenerData = ()=>{
            dispatch(obtenerDatos())
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
                            <Link><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </Fragment>
  ) : 
  null
}

export default Usuario
