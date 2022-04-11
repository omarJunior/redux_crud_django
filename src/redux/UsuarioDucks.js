import API from "../Utils/Api"
//data inicial
const dataInicial = {
    loading: false,
    activo : false
}

const LOADING = 'LOADING'
const MENSAJE = "MENSAJE"
const OBTENER_USUARIO = 'OBTENER_USUARIO'
const OBTENER_USUARIO_SIGUIENTE = 'OBTENER_USUARIO_SIGUIENTE'
const OBTENER_USUARIO_ANTERIOR = 'OBTENER_USUARIO_ANTERIOR'
const OBTENER_UN_USUARIO = 'OBTENER_UN_USUARIO'
const ACTUALIZAR_USUARIO = 'ACTUALIZAR_USUARIO'
const ELIMINAR_USUARIO = 'ELIMINAR_USUARIO'

//reducer
export default function usuariosReducer(state= dataInicial, action){
    switch (action.type) {
        case LOADING:
            return {...state, loading: true}

        case MENSAJE:
            return {...state, msg: action.payload}
    
        case OBTENER_USUARIO:
            return {...state, ...action.payload}

        case OBTENER_USUARIO_SIGUIENTE:
            return { ...state, ...action.payload }
        
        case OBTENER_USUARIO_ANTERIOR:
            return { ...state, ...action.payload }

        case OBTENER_UN_USUARIO:
            return { ...state, user: action.payload } 

        case ACTUALIZAR_USUARIO:
            return {...state, user: action.payload, msg_exito: action.msg }
        
        case ELIMINAR_USUARIO:
            return {...state, msg:  action.payload}

        default:
            return { ...state }
    }
}


//acciones
export const obtenerUsuarios = ()=> async(dispatch)=>{
    try {
        const resp = await API.get('api/app_persona/per/')
        dispatch({
            type: OBTENER_USUARIO,
            payload: resp.data
        })
    } catch (error) {
        console.error(error)
    }
}

export const obtenerUsuariosSiguientes = ()=> async(dispatch, getState)=>{
    const { next } = getState().usuario
    try {
        const resp = await API.get(next)
        dispatch({
            type: OBTENER_USUARIO_SIGUIENTE,
            payload: resp.data
        })
    } catch (error) {
        console.error(error)
    }
}

export const obtenerUsuariosAnterior = ()=> async(dispatch, getState)=>{
    const { previous } = getState().usuario
    try {
        const resp = await API.get(previous)
        dispatch({
            type: OBTENER_USUARIO_ANTERIOR,
            payload: resp.data
        })
    } catch (error) {
        console.error(error)
    }
    
}

export const obtenerUnUsuario = (id)=> async(dispatch)=>{
    try {
        const resp = await API.get(`api/app_persona/per/${id}/`)
        dispatch({
            type: OBTENER_UN_USUARIO,
            payload: resp.data            
        })
    } catch (error) {
        console.error(error)
    }
}


export const actualizarUsuario = (id)=> async(dispatch)=>{
    try {
        const resp = await API.put(`api/app_persona/per/${id}/`)
        dispatch({
            type: ACTUALIZAR_USUARIO,
            payload: resp.data,
            msg: 'Usuario actualizado'           
        })
    } catch (error) {
        console.error(error)
    }
}

export const eliminarUsuario = (id)=> async(dispatch)=>{
    
    const confirmacion = window.confirm("Deseas eliminar este usuario con el id: "+ id)
    if(confirmacion){
        try {
            const resp = await API.delete(`api/app_persona/per/${id}`)
            if(resp.status === 204){
                dispatch({
                    type: ELIMINAR_USUARIO,
                    payload: 'Eliminado correctamente'
                })
                return setTimeout(()=> {
                    window.location = "/user"
                }, 2000)
            }
        } catch (error) {
            console.error(error)
        }

    }else{
        dispatch({
            type: MENSAJE,
            payload: 'Me imagino que tu registro esta a salvo'
        })
    }
}
