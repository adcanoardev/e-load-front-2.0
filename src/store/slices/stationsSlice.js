import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stationsApi } from "../../api/endpoints";

export const getAllStationsThunk = createAsyncThunk("stations/getAll", async (_, { rejectWithValue }) => {
    try { return (await stationsApi.getAll()).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const getAllStationsAdminThunk = createAsyncThunk("stations/getAllAdmin", async (_, { rejectWithValue }) => {
    try { return (await stationsApi.getAllAdmin()).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const getStationByIdThunk = createAsyncThunk("stations/getById", async (id, { rejectWithValue }) => {
    try { return (await stationsApi.getById(id)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const createStationThunk = createAsyncThunk("stations/create", async (data, { rejectWithValue }) => {
    try { return (await stationsApi.create(data)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const updateStationThunk = createAsyncThunk("stations/update", async ({ id, data }, { rejectWithValue }) => {
    try { return (await stationsApi.update(id, data)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const deleteStationThunk = createAsyncThunk("stations/delete", async (id, { rejectWithValue }) => {
    try { await stationsApi.remove(id); return id; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

const stationsSlice = createSlice({
    name: "stations",
    initialState: {
        stations: [],
        stationsAdmin: [],
        stationSelected: null,
        loading: false,
        error: null,
    },
    reducers: {
        selectStation: (state, { payload }) => { state.stationSelected = payload; },
        clearStation:  (state) => { state.stationSelected = null; },
    },
    extraReducers: (builder) => {
        const pending  = (state)         => { state.loading = true;  state.error = null; };
        const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

        builder
            .addCase(getAllStationsThunk.pending,   pending)
            .addCase(getAllStationsThunk.rejected,  rejected)
            .addCase(getAllStationsThunk.fulfilled, (state, { payload }) => {
                state.loading = false; state.stations = payload;
            })
            .addCase(getAllStationsAdminThunk.pending,   pending)
            .addCase(getAllStationsAdminThunk.rejected,  rejected)
            .addCase(getAllStationsAdminThunk.fulfilled, (state, { payload }) => {
                state.loading = false; state.stationsAdmin = payload;
            })
            .addCase(getStationByIdThunk.pending,   pending)
            .addCase(getStationByIdThunk.rejected,  rejected)
            .addCase(getStationByIdThunk.fulfilled, (state, { payload }) => {
                state.loading = false; state.stationSelected = payload;
            })
            .addCase(createStationThunk.fulfilled, (state, { payload }) => {
                state.stationsAdmin = [payload, ...state.stationsAdmin];
            })
            .addCase(updateStationThunk.fulfilled, (state, { payload }) => {
                state.stationSelected = payload;
                state.stationsAdmin = state.stationsAdmin.map(s => s._id === payload._id ? payload : s);
            })
            .addCase(deleteStationThunk.fulfilled, (state, { payload }) => {
                state.stationsAdmin = state.stationsAdmin.filter(s => s._id !== payload);
                if (state.stationSelected?._id === payload) state.stationSelected = null;
            });
    },
});

export const { selectStation, clearStation } = stationsSlice.actions;
export const stationsReducer = stationsSlice.reducer;
