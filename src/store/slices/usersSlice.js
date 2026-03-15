import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersApi } from "../../api/endpoints";

export const loginThunk = createAsyncThunk("users/login", async (data, { rejectWithValue }) => {
    try {
        const res = await usersApi.login(data);
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || "Error al iniciar sesión");
    }
});

export const registerThunk = createAsyncThunk("users/register", async (formData, { rejectWithValue }) => {
    try {
        const res = await usersApi.register(formData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || "Error al registrarse");
    }
});

export const checkSessionThunk = createAsyncThunk("users/checkSession", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token || token === "null") return rejectWithValue(null);
    try {
        const res = await usersApi.checkSession();
        return { user: res.data, token };
    } catch {
        localStorage.removeItem("token");
        return rejectWithValue(null);
    }
});

export const updateUserThunk = createAsyncThunk("users/update", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const res = await usersApi.update(id, formData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || "Error al actualizar");
    }
});

export const getAllUsersThunk = createAsyncThunk("users/getAll", async (_, { rejectWithValue }) => {
    try {
        const res = await usersApi.getAll();
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || "Error");
    }
});

export const deleteUserThunk = createAsyncThunk("users/delete", async (id, { rejectWithValue }) => {
    try {
        await usersApi.remove(id);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.error || "Error");
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        users: [],
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
        },
        clearError(state) { state.error = null; },
    },
    extraReducers: (builder) => {
        const pending  = (state)        => { state.loading = true;  state.error = null; };
        const rejected = (state, action)=> { state.loading = false; state.error = action.payload; };

        builder
            .addCase(loginThunk.pending,   pending)
            .addCase(loginThunk.rejected,  rejected)
            .addCase(loginThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user  = payload.user;
                state.token = payload.token;
            })
            .addCase(registerThunk.pending,   pending)
            .addCase(registerThunk.rejected,  rejected)
            .addCase(registerThunk.fulfilled, (state) => { state.loading = false; })

            .addCase(checkSessionThunk.pending,   pending)
            .addCase(checkSessionThunk.rejected,  (state) => { state.loading = false; state.user = null; state.token = null; })
            .addCase(checkSessionThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user  = payload.user;
                state.token = payload.token;
            })
            .addCase(updateUserThunk.pending,   pending)
            .addCase(updateUserThunk.rejected,  rejected)
            .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
            })
            .addCase(getAllUsersThunk.pending,   pending)
            .addCase(getAllUsersThunk.rejected,  rejected)
            .addCase(getAllUsersThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.users = payload;
            })
            .addCase(deleteUserThunk.fulfilled, (state, { payload }) => {
                state.users = state.users.filter(u => u._id !== payload);
            });
    },
});

export const { logout, clearError } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
