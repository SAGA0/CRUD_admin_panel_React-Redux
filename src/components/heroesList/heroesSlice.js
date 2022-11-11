import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    editHeroId: ''
}

export const fetchedHeroes = createAsyncThunk(
    'heroes/fetchedHeroes',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/heroes")
    }
)

export const deletedHeroes = createAsyncThunk(
    'heroes/deletedHeroes',
    async (id) => {
        const { request } = useHttp()
        return await request(`http://localhost:3001/heroes/${id}`, "DELETE")
    }
)


const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        },
        heroesCreated: (state, action) => {
            state.heroes.push(action.payload)

        },
        editHero: (state, action) => {
            state.heroes = state.heroes.map(item => item.id === action.payload.id ? action.payload : item);
            state.editHeroId = '';

        },
        selectEditHero: (state, action) => {
            state.editHeroId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchedHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload
            })
            .addCase(fetchedHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addCase(deletedHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(deletedHeroes.fulfilled, (state, action) => {
                state.heroes = state.heroes.filter(item => item.id !== action.payload.id)
            })
            .addCase(deletedHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addDefaultCase(() => { })
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