import { ChangeEvent } from 'react';
import { TripOption } from '../../common/types';

type Props = {
  allTrips: TripOption[],
  selectedTrips: TripOption[],
    setSelectedTrips: React.Dispatch<React.SetStateAction<TripOption[]>>
}

const MainFilters = ({ allTrips, setSelectedTrips }: Props)
  : JSX.Element => {
    
  function handleDurationFilter(e:ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value.toString();
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
      break;
    default:
      alert('range duration value not found');
    }
    
    setSelectedTrips(filteredTrips);
  }
    
  return (
    <section className="trips-filter">
      <h2 className="visually-hidden">Trips filter</h2>
      <form className="trips-filter__form" autoComplete="off">
        <label className="trips-filter__search input">
          <span className="visually-hidden">Search by name</span>
          <input
            data-test-id="filter-search"
            name="search"
            type="search"
            placeholder="search by title"
          />
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
          <select data-test-id="filter-level" name="level">
            <option value="">level</option>
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