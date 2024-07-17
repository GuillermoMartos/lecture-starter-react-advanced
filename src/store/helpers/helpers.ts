import { FILTER_OPTIONS, FiltersAppliedState, TripOption } from '../../common/types';
import { TripsState } from '../trips/reducer';

export const applyFilters =
    (filters: FiltersAppliedState, state: TripsState): TripOption[] => {
      let tripsToFilter = state.allTrips.slice();
          
      if (filters[FILTER_OPTIONS.DURATION]) {
        switch (filters[FILTER_OPTIONS.DURATION]) {
        case '10':
          tripsToFilter = tripsToFilter.filter(el => el.duration >= 11);
          break;
        case '5_x_10':
          tripsToFilter = tripsToFilter
            .filter(el => el.duration >= 6 && el.duration <= 10);
          break;
        case '0_x_5':
          tripsToFilter = tripsToFilter
            .filter(el => el.duration >= 1 && el.duration <= 5);
          break;
        case 'quit_filter':
          tripsToFilter = tripsToFilter.slice();
          break;
        default:
          alert('selected range duration value not found');
        }
      }
      
      if (filters[FILTER_OPTIONS.DIFFICULTY]) {
        switch (filters[FILTER_OPTIONS.DIFFICULTY]) {
        case 'easy':
          tripsToFilter = tripsToFilter.filter(el => el.level === 'easy');
          break;
        case 'moderate':
          tripsToFilter = tripsToFilter.filter(el => el.level === 'moderate');
          break;
        case 'difficult':
          tripsToFilter = tripsToFilter.filter(el => el.level === 'difficult');
          break;
        case 'quit_filter':
          tripsToFilter = tripsToFilter.slice();
          break;
        default:
          alert('selected range difficulty value not found');
        }
      }
  
      if (filters[FILTER_OPTIONS.SEARCH]) {
        tripsToFilter = tripsToFilter.filter(el =>
          el.title.toLowerCase()
            .startsWith((filters[FILTER_OPTIONS.SEARCH] as string)
              .toLowerCase()));
      }
  
      return tripsToFilter;
    };

export const updateFilters =
    (payload:{value:string|null, name:FILTER_OPTIONS},
      filterOptionsState: FiltersAppliedState): FiltersAppliedState => {
      const { value, name }= payload;
      const newFilters = {
        ...filterOptionsState,
        [FILTER_OPTIONS[name.toUpperCase() as FILTER_OPTIONS]]: value
      };

      return newFilters;
    };