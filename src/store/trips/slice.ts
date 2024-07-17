import { FiltersAppliedState, TripOption } from '../../common/types';
import { DataStatus, TRIPS_TYPES } from '../../common/enums';
import { applyFilters, updateFilters } from '../helpers/helpers';
import { ValueOf } from '../../services/constants';
import { createSlice } from '@reduxjs/toolkit';
import { tripsActions } from './actions';
import { mapAllTripsResponseToTripOption, mapTripResponseByIdToTripOption } from '../helpers/mappers';

export type TripsState = {
  status: ValueOf<typeof DataStatus>,
  allTrips: TripOption[],
  tripDetail: TripOption|null,
  filteredTrips: TripOption[],
  filterOptions: FiltersAppliedState,
}

const initialTripsState: TripsState = {
  allTrips: [],
  filteredTrips: [],
  tripDetail:null,
  filterOptions: {
    DIFFICULTY: null,
    DURATION: null,
    SEARCH:null
  },
  status: DataStatus.IDLE
};


const { reducer, actions } = createSlice(
  {
    name: TRIPS_TYPES.TRIPS_REDUCER_NAME,
    initialState: initialTripsState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(tripsActions.changeFilters, (state, action) => {
        state.filterOptions= updateFilters(action.payload, state.filterOptions);
      });
      builder.addCase(tripsActions.filterTrips, (state, action) => {
        state.filteredTrips= applyFilters(action.payload, state.allTrips );
      });

      builder.addCase(tripsActions.getAllAPITrips.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(tripsActions.getAllAPITrips.fulfilled, (state, action) => {
        const mappedTripsResponse= mapAllTripsResponseToTripOption(action.payload);
        state.allTrips= mappedTripsResponse;
        state.status = DataStatus.SUCCESS;
      });
      builder.addCase(tripsActions.getAllAPITrips.rejected, (state) => {
        state.status= DataStatus.ERROR;
      });
      
      builder.addCase(tripsActions.getAPITripById.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(tripsActions.getAPITripById.fulfilled, (state, action) => {
        const mappedTripResponse= mapTripResponseByIdToTripOption(action.payload);
        state.tripDetail= mappedTripResponse;
        state.status = DataStatus.SUCCESS;
      });
      builder.addCase(tripsActions.getAPITripById.rejected, (state) => {
        state.status= DataStatus.ERROR;
      });
    },
  }
);

export { actions as tripsReducerActions, reducer as tripsReducer };