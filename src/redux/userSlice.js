import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state = initialState;
        },
    },
  })

  export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions

  export default userSlice.reducer