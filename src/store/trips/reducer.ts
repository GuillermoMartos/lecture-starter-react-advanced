import { FiltersAppliedState, TripOption } from '../../common/types';
import { FILTER_TRIPS_TYPES } from '../../common/enums';
import { applyFilters, updateFilters } from '../helpers/helpers';
import { Action } from './actions';

export type TripsState = {
    allTrips: TripOption[],
  filteredTrips: TripOption[],
    filterOptions: FiltersAppliedState
}

const initialTripsState: TripsState = {
  allTrips: [],
  filteredTrips: [],
  filterOptions: {
    DIFFICULTY: null,
    DURATION: null,
    SEARCH:null
  }
};



export const tripsReducer = (state=initialTripsState, action: Action): TripsState => {
  switch (action.type) {
  case FILTER_TRIPS_TYPES.FILTER_TRIPS:
    return state = { ...state, filteredTrips:applyFilters(action.payload, state) };
  case FILTER_TRIPS_TYPES.CHANGE_FILTERS:
    return state = {
      ...state,
      filterOptions: updateFilters(action.payload, state.filterOptions)
    };
  default:
    return state;
  }
};