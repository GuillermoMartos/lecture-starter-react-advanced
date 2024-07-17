import { ChangeEvent, FormEvent } from 'react';
import { FiltersAppliedState, FILTER_OPTIONS } from '../../common/types';
import styles from './main-filters.module.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { tripsActions } from '../../store/trips/actions';


const MainFilters = ()
  : JSX.Element => {
  const tripsData = useAppSelector((state) => state.trips);
  const dispatch = useAppDispatch();

  
  function handleFilters(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const name = (e.target.name.toUpperCase()) as FILTER_OPTIONS;

    const newFilters: FiltersAppliedState = {
      ...tripsData.filterOptions, [FILTER_OPTIONS[name]]: value
    };

    dispatch(tripsActions.changeFilters({ value, name }));
    dispatch(tripsActions.filterTrips(newFilters));
  }

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name= FILTER_OPTIONS.SEARCH;
    const value = (e.currentTarget.elements.namedItem(name) as HTMLInputElement).value;
    
    const newFilters: FiltersAppliedState = {
      ...tripsData.filterOptions, [FILTER_OPTIONS.SEARCH]: value
    };

    dispatch(tripsActions.changeFilters({ value, name }));
    dispatch(tripsActions.filterTrips(newFilters));
  }

  function clearSearchFilter() {
    const newFilters = { ...tripsData.filterOptions, [FILTER_OPTIONS.SEARCH]: null };
    dispatch(tripsActions.changeFilters({ name:FILTER_OPTIONS.SEARCH, value:null }));
    dispatch(tripsActions.filterTrips(newFilters));
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
            placeholder={tripsData.filterOptions[FILTER_OPTIONS.SEARCH] ?? 'Search...'}
          />
          <button type="button" className="clear-button clickeable-pointer" onClick={() => clearSearchFilter()}>×</button>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by duration</span>
          <select defaultValue={tripsData.filterOptions[FILTER_OPTIONS.DURATION] ?? 'duration'}
            data-test-id="filter-duration"
            name={FILTER_OPTIONS.DURATION}
            onChange={(e) => handleFilters(e)}>
            <option disabled>duration</option>
            <option value="quit_filter">No duration filter</option>
            <option value="0_x_5">&lt; 5 days</option>
            <option value="5_x_10">&lt; 10 days</option>
            <option value="10">&ge; 10 days</option>
          </select>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by level</span>
          <select defaultValue={tripsData.filterOptions[FILTER_OPTIONS.DIFFICULTY] ?? 'level'}
            data-test-id="filter-level"
            name={FILTER_OPTIONS.DIFFICULTY}
            onChange={(e) => handleFilters(e)}>
            <option disabled>level</option>
            <option value="quit_filter">No level filter</option>
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