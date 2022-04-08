import API from "../Utils/Api"
//data inicial
const dataInicial = {
    loading: false,
    activo : false
}

const LOADING = 'LOADING'
const MENSAJE = "MENSAJE"
const USUARIO_ERROR = 'USUARIO_ERROR'
const OBTENER_USUARIO = 'OBTENER_USUARIO'
const ELIMINAR_USUARIO = 'ELIMINAR_USUARIO'

//reducer
export default function usuariosReducer(state= dataInicial, action){
    switch (action.type) {
        case LOADING:
            return {...state, loading: true}

        case MENSAJE:
            return {...state, msg: action.payload}

        case USUARIO_ERROR:
            return { ...dataInicial }
    
        case OBTENER_USUARIO:
            return {...state, user: action.payload}
        
        case ELIMINAR_USUARIO:
            return {...state, msg:  action.payload}

        default:
            return { ...state }
    }
}


//acciones
export const obtenerDatos = ()=> async(dispatch)=>{
    const resp = await API.get('api/app_persona/per/')
    const data = await resp.data
    try {
        dispatch({
            type: OBTENER_USUARIO,
            payload: data
        })
    } catch (error) {
        console.error(error)
    }
}

export const eliminarUsuario = (id)=> async(dispatch)=>{
    
    const confirmacion = window.confirm("Deseas eliminar este usuario con el id: "+ id)
    if(confirmacion){
        const resp = await API.delete(`api/app_persona/per/${id}`)
        const data = await resp
            if(data.status === 204){
                try {
                    dispatch({
                        type: ELIMINAR_USUARIO,
                        payload: 'Eliminado correctamente'
                    })
                    return setTimeout(()=> {
                        window.location = "/user"
                    }, 2000)
                } catch (error) {
                    console.error(error)
                }
            }
        }else{
            dispatch({
                type: MENSAJE,
                payload: 'Me imagino que tu registro esta a salvo'
            })
    }
    
}
