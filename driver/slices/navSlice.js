import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    start: false,
    origin: null,
    destination: null,
    travelTimeInformation: null,
    duration : null,
    distance: null, 
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setDuration : (state, action) => {
            state.duration = action.payload;
        },
        setDistance : (state, action) => {
            state.distance = action.payload;
        },
        
    },
});


export const { setStart, setOrigin, setDestination, setTravelTimeInformation, setDistance, setDuration } = navSlice.actions;

export const selectStart = (state) => state.nav.start;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectDuration = (state) => state.nav.duration;
export const selectDistance = (state) => state.nav.distance;


export default navSlice.reducer;