import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { spotsApi } from "../../api/endpoints";

export const getAllSpotsThunk = createAsyncThunk("spots/getAll", async (_, { rejectWithValue }) => {
    try { return (await spotsApi.getAll()).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const getSpotsByStationThunk = createAsyncThunk("spots/getByStation", async (id, { rejectWithValue }) => {
    try { return (await spotsApi.getByStation(id)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const getSpotsByUserThunk = createAsyncThunk("spots/getByUser", async (id, { rejectWithValue }) => {
    try { return (await spotsApi.getByUser(id)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const createSpotThunk = createAsyncThunk("spots/create", async (data, { rejectWithValue }) => {
    try { return (await spotsApi.create(data)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const updateSpotThunk = createAsyncThunk("spots/update", async ({ id, data }, { rejectWithValue }) => {
    try { return (await spotsApi.update(id, data)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const updateSpotStateThunk = createAsyncThunk("spots/updateState", async ({ id, state }, { rejectWithValue }) => {
    try { return (await spotsApi.updateState(id, state)).data; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

export const deleteSpotThunk = createAsyncThunk("spots/delete", async (id, { rejectWithValue }) => {
    try { await spotsApi.remove(id); return id; }
    catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
});

const replace = (arr, item) => arr.map(s => s._id === item._id ? item : s);

const spotsSlice = createSlice({
    name: "spots",
    initialState: {
        spots: [], spotsByStation: [], spotsByUser: [],
        spotToCharge: null, loading: false, error: null,
    },
    reducers: {
        clearSpotToCharge: (state) => { state.spotToCharge = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSpotsThunk.fulfilled, (state, { payload }) => { state.spots = payload; })
            .addCase(getSpotsByStationThunk.fulfilled, (state, { payload }) => { state.spotsByStation = payload; })
            .addCase(getSpotsByUserThunk.fulfilled, (state, { payload }) => { state.spotsByUser = payload; })
            .addCase(createSpotThunk.fulfilled, (state, { payload }) => {
                state.spots = [payload, ...state.spots];
                state.spotsByStation = [payload, ...state.spotsByStation];
            })
            .addCase(updateSpotThunk.fulfilled, (state, { payload }) => {
                state.spots = replace(state.spots, payload);
                state.spotsByStation = replace(state.spotsByStation, payload);
            })
            .addCase(updateSpotStateThunk.fulfilled, (state, { payload }) => {
                state.spotsByStation = replace(state.spotsByStation, payload);
                if (payload.state === "Ocupado") state.spotToCharge = payload;
                if (payload.state === "Libre") state.spotToCharge = null;
            })
            .addCase(deleteSpotThunk.fulfilled, (state, { payload }) => {
                state.spots = state.spots.filter(s => s._id !== payload);
                state.spotsByStation = state.spotsByStation.filter(s => s._id !== payload);
            });
    },
});

export const { clearSpotToCharge } = spotsSlice.actions;
export const spotsReducer = spotsSlice.reducer;
