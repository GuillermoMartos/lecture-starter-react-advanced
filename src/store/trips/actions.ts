// set filtered trips

import { FILTER_OPTIONS, FiltersAppliedState } from '../../common/types';
import { FILTER_TRIPS_TYPES } from '../../common/enums';

type FilterTrips= {
  type: FILTER_TRIPS_TYPES.FILTER_TRIPS,
    payload:FiltersAppliedState
}

type ChangeFilters = {
  type: FILTER_TRIPS_TYPES.CHANGE_FILTERS,
    payload:{value:string|null, name:FILTER_OPTIONS}
}

const filterTrips = (payload:FiltersAppliedState): FilterTrips => {
  return {
    type: FILTER_TRIPS_TYPES.FILTER_TRIPS,
    payload
  };
};

const changeFilters =
(payload: { value: string | null , name: FILTER_OPTIONS }): ChangeFilters => {
  return {
    type: FILTER_TRIPS_TYPES.CHANGE_FILTERS,
    payload
  };
};

export const tripsActions = {
  changeFilters,  filterTrips
};

export type Action= FilterTrips | ChangeFilters