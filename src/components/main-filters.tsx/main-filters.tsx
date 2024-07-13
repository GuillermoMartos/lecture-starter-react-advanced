import { ChangeEvent, FormEvent } from 'react';
import { FiltersAppliedState, TripOption, FILTER_OPTIONS } from '../../common/types';
import styles from './main-filters.module.css';

type Props = {
  allTrips: TripOption[],
  setSelectedTrips: React.Dispatch<React.SetStateAction<TripOption[]>>,
  filtersApplied: FiltersAppliedState,
  setFiltersApplied: React.Dispatch<React.SetStateAction<FiltersAppliedState>>
}


const MainFilters = ({ allTrips, setSelectedTrips,
  filtersApplied, setFiltersApplied }: Props)
  : JSX.Element => {
  filtersApplied;
  function handleDurationFilter(e:ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    let filteredTrips: TripOption[] = [];
    switch (value) {
    case '10':
      filteredTrips = allTrips.filter(el => el.duration >= 11);
      break;
    case '5_x_10':
      filteredTrips = allTrips.filter(el => el.duration >= 6 && el.duration <= 10);
      break;
    case '0_x_5':
      filteredTrips = allTrips.filter(el => el.duration >= 1 && el.duration <= 5);
      break;
    case 'quit_filter':
      filteredTrips = allTrips.slice();
      setFiltersApplied(prev => {
        return {...prev, [FILTER_OPTIONS.DURATION]:[]};
      });
      setSelectedTrips(filteredTrips);
      return;
    default:
      alert('range duration value not found');
    }
    
    setSelectedTrips(filteredTrips);
    setFiltersApplied(prev => {
      return {...prev, [FILTER_OPTIONS.DURATION]:filteredTrips};
    });
  }

  function handleDifficultyFilter(e:ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    let filteredTrips: TripOption[] = [];
    switch (value) {
    case 'easy':
      filteredTrips = allTrips.filter(el => el.level === 'easy');
      break;
    case 'moderate':
      filteredTrips = allTrips.filter(el => el.level === 'moderate');
      break;
    case 'difficult':
      filteredTrips = allTrips.filter(el => el.level === 'difficult');
      break;
    case 'quit_filter':
      filteredTrips = allTrips.slice();
      setFiltersApplied(prev => {
        return {...prev, [FILTER_OPTIONS.DIFFICULTY]:[]};
      });
      setSelectedTrips(filteredTrips);
      return;
    default:
      alert('range duration value not found');
    }
    
    setSelectedTrips(filteredTrips);
    setFiltersApplied(prev => {
      return {...prev, [FILTER_OPTIONS.DIFFICULTY]:filteredTrips};
    });
  }

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem('search')as HTMLInputElement).value;
    const filteredTrips = allTrips.filter(el =>
      el.title.toLowerCase().startsWith(value.toLowerCase()));
    setFiltersApplied(prev => {
      return {...prev, [FILTER_OPTIONS.SEARCH]:filteredTrips};
    });
    setSelectedTrips(filteredTrips);
  }

  function clearSearchFilter() {
    setFiltersApplied(prev => {
      return {...prev, [FILTER_OPTIONS.SEARCH]:[]};
    });
    setSelectedTrips(allTrips);
  }
    
  return (
    <section className={styles['trips-filter']}>
      <h2 className="visually-hidden">Trips filter</h2>
      <form className={styles['trips-filter__form']} autoComplete="off" onSubmit={(e)=> search(e)}>
        <label className={`${styles['trips-filter__search']} input`}>
          <span className="visually-hidden">Search by name</span>
          <input
            data-test-id="filter-search"
            name="search"
            type="search"
            placeholder="search by title"
          />
          <button type="button" className="clear-button clickeable-pointer" onClick={() => clearSearchFilter()}>×</button>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by duration</span>
          <select data-test-id="filter-duration" name="duration" onChange={(e)=>handleDurationFilter(e)}>
            <option>duration</option>
            <option value="quit_filter">Quit filter</option>
            <option value="0_x_5">&lt; 5 days</option>
            <option value="5_x_10">&lt; 10 days</option>
            <option value="10">&ge; 10 days</option>
          </select>
        </label>
        <label className="select">
          <span className="visually-hidden">Search by level</span>
          <select data-test-id="filter-level" name="level" onChange={(e)=>handleDifficultyFilter(e)}>
            <option value="">level</option>
            <option value="quit_filter">Quit filter</option>
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