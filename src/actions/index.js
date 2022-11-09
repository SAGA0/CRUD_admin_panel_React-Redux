import { heroesFetched, heroesFetching, heroesFetchingError, heroesDeleted, } from "../components/heroesList/heroesSlice"
import { filtersFetched } from '../components/heroesFilters/filtersSlice'

export const fetchedHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching())
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}


export const deletedHeroes = (request, id) => (dispatch) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(heroesDeleted(id)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchedFilters = (request) => (dispatch) => {
    request('http://localhost:3001/filters')
        .then(data => dispatch(filtersFetched(data)))
        .catch(err => console.log(err))
}




// export const filtersChoosed = (activeFilter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch(
//             {
//                 type: 'FILTERS_CHOOSED',
//                 payload: activeFilter
//             })
//     }, 1000)
// }



