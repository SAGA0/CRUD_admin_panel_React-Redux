import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    activeFilter: 'all',
}

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
                state.filters = action.payload
            })
            .addCase(fetchedFilters.rejected, () => console.log('error'))
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = filtersSlice

export default reducer

export const {
    filtersFetched,
    filtersChoosed
} = actions