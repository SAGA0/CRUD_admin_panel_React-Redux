const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    editHeroId: ''
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
                heroesLoadingStatus: 'idle'

            }
        case 'HEROES_CREATE':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle'
            }
        case 'EDIT_HERO':
            return {
                ...state,
                heroes: state.heroes.map(item => item.id === action.payload.id ? action.payload : item),
                editHeroId: ''
            }
        case 'SELECT_EDIT_HERO':
            return {
                ...state,
                editHeroId: action.payload
            }

        default: return state
    }
}

export default heroes;