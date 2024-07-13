import { ChangeEvent, FormEvent } from 'react';
import { FiltersAppliedState, TripOption, FILTER_OPTIONS } from '../../common/types';
import styles from './main-filters.module.css';

type Props = {
  allTrips: TripOption[],
  setSelectedTrips: React.Dispatch<React.SetStateAction<TripOption[]>>,
  filtersApplied: FiltersAppliedState,
  setFiltersApplied: React.Dispatch<React.SetStateAction<FiltersAppliedState>>
}

const MainFilters = (
  { allTrips, setSelectedTrips,setFiltersApplied, filtersApplied }: Props)
  : JSX.Element => {

  const applyFilters = (filters:FiltersAppliedState) => {
    let filteredTrips = allTrips.slice();
    
    if (filters[FILTER_OPTIONS.DURATION]) { 
      switch (filters[FILTER_OPTIONS.DURATION]) {
      case '10':
        filteredTrips = filteredTrips.filter(el => el.duration >= 11);
        break;
      case '5_x_10':
        filteredTrips = filteredTrips.filter(el => el.duration >= 6 && el.duration <= 10);
        break;
      case '0_x_5':
        filteredTrips = filteredTrips.filter(el => el.duration >= 1 && el.duration <= 5);
        break;
      case 'quit_filter':
        filteredTrips = filteredTrips.slice();
        setFiltersApplied(prev => {
          return { ...prev, [FILTER_OPTIONS.DURATION]: null };
        });
        break;
      default:
        alert('selected range duration value not found');
      }
    }

    if (filters[FILTER_OPTIONS.DIFFICULTY]) {
      switch (filters[FILTER_OPTIONS.DIFFICULTY]) {
      case 'easy':
        filteredTrips = filteredTrips.filter(el => el.level === 'easy');
        break;
      case 'moderate':
        filteredTrips = filteredTrips.filter(el => el.level === 'moderate');
        break;
      case 'difficult':
        filteredTrips = filteredTrips.filter(el => el.level === 'difficult');
        break;
      case 'quit_filter':
        filteredTrips = filteredTrips.slice();
        setFiltersApplied(prev => {
          return { ...prev, [FILTER_OPTIONS.DIFFICULTY]:null };
        });
        break;
      default:
        alert('selected range difficulty value not found');
      }
    }

    if (filters[FILTER_OPTIONS.SEARCH]) {
      filteredTrips = filteredTrips.filter(el =>
        el.title.toLowerCase()
          .startsWith((filters[FILTER_OPTIONS.SEARCH] as string)
            .toLowerCase()));
    }

    setSelectedTrips(filteredTrips);
  };

  
  function handleFilters(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const name = e.target.name;

    setFiltersApplied(prev => {
      const newFilters = {
        ...prev, [
        FILTER_OPTIONS[(name.toUpperCase()) as FILTER_OPTIONS]]: value
      };
      applyFilters(newFilters);
      return newFilters;
    });
  }

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem(
      ([ FILTER_OPTIONS.SEARCH ]) as unknown as string) as HTMLInputElement).value;
    setFiltersApplied(prev => {
      const newFilters = { ...prev, [FILTER_OPTIONS.SEARCH]: value };
      applyFilters(newFilters);
      return newFilters;
    });
  }

  function clearSearchFilter() {
    setFiltersApplied(prev => {
      const newFilters = { ...prev, [FILTER_OPTIONS.SEARCH]: null };
      applyFilters(newFilters);
      return newFilters;
    });
  }
    
  return (
    <section className={styles['trips-filter']}>
      <h2 className="visually-hidden">Trips filter</h2>
      <form className={styles['trips-filter__form']} autoComplete="off" onSubmit={(e)=> search(e)}>
        <label className={`${styles['trips-filter__search']} input`}>
          <span className="visually-hidden">Search by name</span>
          <input
            data-test-id="filter-search"
            name= { FILTER_OPTIONS.SEARCH }
            type="search"
            placeholder={filtersApplied[FILTER_OPTIONS.SEARCH] ?? 'Search...'}
          />
          <button type="button" className="clear-button clickeable-pointer" onClick={() => clearSearchFilter()}>×</button>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by duration</span>
          <select defaultValue={filtersApplied[FILTER_OPTIONS.DURATION] ?? 'duration'}
            data-test-id="filter-duration"
            name={FILTER_OPTIONS.DURATION}
            onChange={(e) => handleFilters(e)}>
            <option disabled selected>duration</option>
            <option value="quit_filter">No filter</option>
            <option value="0_x_5">&lt; 5 days</option>
            <option value="5_x_10">&lt; 10 days</option>
            <option value="10">&ge; 10 days</option>
          </select>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by level</span>
          <select defaultValue={filtersApplied[FILTER_OPTIONS.DIFFICULTY] ?? 'level'}
            data-test-id="filter-level"
            name={FILTER_OPTIONS.DIFFICULTY}
            onChange={(e) => handleFilters(e)}>
            <option disabled selected>level</option>
            <option value="quit_filter">No filter</option>
            <option value="easy">easy</option>
            <option value="moderate">moderate</option>
            <option value="difficult">difficult</option>
          </select>
        </label>
      </form>
    </section>
  );
};

export default MainFilters;