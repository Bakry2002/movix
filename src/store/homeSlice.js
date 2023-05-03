import { createSlice } from "@reduxjs/toolkit";
// createSlice is a function that returns an object with 3 properties:
// 1. name: the name of the slice
// 2. initialState: the initial state of the slice
// 3. reducers: an object with the reducers of the slice and it is used to generate action creators as well
    // state is the current state of the slice
    // action is the action that was dispatched meaning the action that was passed to the reducer
    // action.payload is the data passed in the action meaning the data passed to the reducer

// * In Redux:
// A slice is a small piece of the Redux state tree that is responsible for managing a specific part of the application state.

// * In Redux Toolkit: 
// reducer is a function that receives the current state and an action, and returns a new state. 
// The state parameter represents the current state of the application, 
// while the action parameter represents an object that describes what happened in the application.
export const homeSlice = createSlice({
    name: "home", // name of the slice
    initialState: { // initial state of the slice
        url: {},
        genres: {}    
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload; 
        }, 
        getGenres: (state, action) => {
            state.genres = action.payload;
        }
    }
})

// action creators for each reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer; // export the reducer function