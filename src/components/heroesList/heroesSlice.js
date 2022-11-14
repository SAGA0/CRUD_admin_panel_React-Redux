import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     editHeroId: ''
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
    editHeroId: ''
})

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
            heroesAdapter.removeOne(state, action.payload)
        },
        heroesCreated: (state, action) => {
            heroesAdapter.addOne(state, action.payload)

        },
        editHero: (state, action) => {
            heroesAdapter.upsertOne(state, action.payload)
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
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchedHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addCase(deletedHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(deletedHeroes.fulfilled, (state, action) => {
                heroesAdapter.removeOne(state, action.payload)
            })
            .addCase(deletedHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addDefaultCase(() => { })
    }
});

const { actions, reducer } = heroesSlice

export default reducer

export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter);
        }
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleted,
    heroesCreated,
    editHero,
    selectEditHero
} = actions