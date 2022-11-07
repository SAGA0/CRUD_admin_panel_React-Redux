import { configureStore } from '@reduxjs/toolkit';
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';


const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args)

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
// }

// const store = createStore(
//     combineReducers({ filters, heroes }),
//     compose(applyMiddleware(ReduxThunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

const store = configureStore({
    reducer: { filters, heroes },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
}

)

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default store;