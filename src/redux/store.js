//Tienda de react que contendra todos los estados
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import usuariosReducer from './UsuarioDucks'

 
const rootReducer = combineReducers({
    usuario: usuariosReducer,
})
 
//Se crea la tienda
export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store
}