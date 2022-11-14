import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

// const initialState = {
//     filters: [],
//     activeFilter: 'all',
// }

const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all'
})

export const fetchedFilters = createAsyncThunk(
    'filters/fetchedFilters',
    async () => {
        const { request } = useHttp()
        return await request('http://localhost:3001/filters')
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersChoosed: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedFilters.pending, () => console.log('loading'))
            .addCase(fetchedFilters.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase(fetchedFilters.rejected, () => console.log('error'))
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = filtersSlice

export default reducer

const { selectAll } = filtersAdapter.getSelectors(state => state.filters);

export const filteredFiltersSelector = createSelector(
    selectAll,
    (filters) => {
        return filters;
    }
);



export const {
    filtersFetched,
    filtersChoosed
} = actions