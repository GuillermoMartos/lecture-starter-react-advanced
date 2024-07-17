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
import { MyBooking } from '../common/types';
import ProtectedRoute from '../common/protected-route';
import CheckedRoute from '../common/checked-route';

const App = (): JSX.Element => {
  const [ myBookings, setMyBookings ]=useState<MyBooking[]>([]);
  
  
  /* we use Layout to have header and footer in each page, and being inside Router Provider 
  allow us to have Link/Navigate available. And Outlet will be the space to render children 
  (the rest of the components) */
  function Layout() {
    return (
      <>
        <Header />
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
          element: (
            <CheckedRoute>
              <SignUp />
            </CheckedRoute>
          )
        },
        {
          path: '/sign-in',
          element: (
            <CheckedRoute>
              <SignIn />
            </CheckedRoute>
          )
        },
        {
          path: '/trip/:tripId',
          element: (
            <ProtectedRoute>
              <Trip setMyBookings={setMyBookings} />
            </ProtectedRoute>
          )
        },
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <Main/>
            </ProtectedRoute>)
        },
        {
          path: '/bookings',
          element: (
            <ProtectedRoute>
              <Bookings myBookings={myBookings} setMyBookings={setMyBookings} />
            </ProtectedRoute>
          )
        },
        {
          path: '*',
          element:(<Navigate to={'/'} />)
        }
      ] }
    
  ];
    
    
  return <> 

    <RouterProvider routes={routes} />
  </>;
};

export default App;