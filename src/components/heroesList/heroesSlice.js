import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    editHeroId: ''
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => { state.heroesLoadingStatus = 'loading' },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload
        },
        heroesFetchingError: state => { state.heroesLoadingStatus = 'error' },
        heroesDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        },
        heroesCreated: (state, action) => {
            state.heroes.push(action.payload)

        },
        editHero: (state, action) => {
            state.heroes = state.heroes.map(item => item.id === action.payload ? action.payload : item);
            state.editHeroId = ''
        },
        selectEditHero: (state, action) => {
            state.editHeroId = action.payload
        }
    }
});

const { actions, reducer } = heroesSlice

export default reducer

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleted,
    heroesCreated,
    editHero,
    selectEditHero
} = actions