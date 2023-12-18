import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false
    },
    reducers: {
        loggedin: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getUser.pending, (state) => {
        state.isLoading = true;
        });

        builder.addCase(actions.getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
        });

        builder.addCase(actions.getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.current = null;
        });
    }
})

export const { loggedin, logout } = userSlice.actions

export default userSlice.reducer