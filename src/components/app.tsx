import { Navigate, RouteObject } from 'react-router-dom';
import RouterProvider from '../common/router-provider';
import Footer from './footer/footer';
import Header from './header/header';
import SignUp from './sign-up/sign-up';
import SignIn from './sign-in/sign-in';
import Trip from './trip/trip';
import Main from './main/main';
import Bookings from './bookings/bookings';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import trips from '../assets/data/trips.json';
import { TripOption } from '../common/types';



const App = (): JSX.Element => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [allTripsOptions] = useState<TripOption[]>(trips);
  const [filteredTripsOptions, setFilteredTripsOptions] =
    useState<TripOption[]>(allTripsOptions);

  /* we use Layout to have header and footer in each page, and being inside Router Provider 
  allow us to have Link/Navigate available. And Outlet will be the space to render children 
  (the rest of the components) */
  function Layout() {
    return (
      <>
        <Header isUserLogged={isUserLogged} setIsUserLogged={setIsUserLogged} />
        <Outlet />
        <Footer />
      </>
    );
  }
    

  const routes: Pick<RouteObject, 'path' | 'children' | 'element'>[] = [
    {
      element: <Layout />, children: [
        {
          path: '/sign-up',
          element: (<SignUp setIsUserLogged={setIsUserLogged}/>)
        },
        {
          path: '/sign-in',
          element: (<SignIn setIsUserLogged={setIsUserLogged}/>)
        },
        {
          path: '/trip/:tripId',
          element:(<Trip/>)
        },
        {
          path: '/',
          element: (<Main isUserLogged={isUserLogged}
            allTrips={allTripsOptions}
            selectedTrips={filteredTripsOptions}
            setSelectedTripsOptions={setFilteredTripsOptions} />)
        },
        {
          path: '/bookings',
          element:(<Bookings/>)
        },
        {
          path: '*',
          element:(<Navigate to={'/'} />)
        }
      ]}
    
  ];
    
    
  return <> 

    <RouterProvider routes={routes} />
  </>;
};

export default App;