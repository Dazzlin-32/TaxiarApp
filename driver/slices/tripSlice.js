import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tripStatus : null, // 0 no request, 1 trip reqested, 2 accepted, 3 started, 4 finished
    driverAvailability : null,
    requestDetails : null,
};

export const tripSlice = createSlice({
    name: "trip",
    initialState,
    reducers: {
        setTripStatus : (state, action) => {
            console.log("Payload received:", action.payload)
            state.tripStatus = action.payload;
        },
        setDriverAvailability : (state, action) => {
            console.log("Payload received:", action.payload)
            state.driverAvailability = action.payload;
        },
         // Action to handle receiving a ride request
        receiveRequest: (state, action) => {
        state.tripStatus = 'Request';
        state.requestDetails = action.payload;
        },
        // Action to handle accepting the ride request
        acceptRequest: (state, action) => {
            state.tripStatus = 'Accepted';
        },
        // Action to handle starting the trip
        startTrip: (state, action) => {
            state.tripStatus = 'In Progress';
            // Optionally add more trip details here if needed
        },
        // Action to handle finishing the trip
        finishTrip: (state) => {
            state.tripStatus = 'Completed';
        },
    },
});


export const {setTripStatus, setDriverAvailability,  receiveRequest, acceptRequest, startTrip, finishTrip } = tripSlice.actions;


export const selecetTripStatus = (state) => state.trip.tripStatus;
export const selectDriverAvailability = (state) => state.trip.driverAvailability;


export default tripSlice.reducer;