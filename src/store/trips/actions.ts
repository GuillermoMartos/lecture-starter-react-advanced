// set filtered trips

import { AllTripsResponse, AsyncThunkConfig, FiltersAppliedState, FiltersUpdatePayload, GetTripByIdPayload, TripResponse } from '../../common/types';
import {  TRIPS_TYPES } from '../../common/enums';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

const filterTrips = createAction(
  TRIPS_TYPES.UPDATE_FILTERED_TRIPS,
  (status:FiltersAppliedState) => {
    return {
      payload:status
    };
  }
);

const changeFilters = createAction(
  TRIPS_TYPES.UPDATE_FILTER_OPTIONS,
  (status:FiltersUpdatePayload) => {
    return {
      payload:status
    };
  }
);

const resetAllFilters = createAction(
  TRIPS_TYPES.RESET_FILTER_OPTIONS,
  (status:FiltersAppliedState) => {
    return {
      payload:status
    };
  }
);

const getAllAPITrips = createAsyncThunk<AllTripsResponse, string, AsyncThunkConfig>
(TRIPS_TYPES.GET_ALL_TRIPS,
  async ( token,{ extra }) => {
    const { tripsService } = extra;
    const allTripsResponse = await tripsService.getAllTrips(token);      
    return allTripsResponse;
  });

const getAPITripById =
  createAsyncThunk<TripResponse, GetTripByIdPayload, AsyncThunkConfig>
  (TRIPS_TYPES.GET_TRIP_BY_ID,
    async ( { token, id }, { extra }) => {
      const { tripsService } = extra;
      const allTripsResponse = await tripsService.getTripById(token, id);
      return allTripsResponse;
    });

export const tripsActions = {
  getAllAPITrips,
  getAPITripById,
  changeFilters,
  filterTrips,
  resetAllFilters
};