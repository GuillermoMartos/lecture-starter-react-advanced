import { Navigate, RouteObject } from 'react-router-dom';
import RouterProvider from '../common/router-provider';
import Footer from './footer/footer';
import Header from './header/header';
import SignUp from './sign-up/sign-up';
import SignIn from './sign-in/sign-in';
import Trip from './trip/trip';
import Main from './main/main';
import Bookings from './bookings/bookings';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../common/protected-route';
import CheckedRoute from '../common/checked-route';
import { ToastContainer } from 'react-toastify';


const App = (): JSX.Element => {  
  /* we use Layout to have header and footer in each page, and being inside Router Provider 
  allow us to have Link/Navigate available. And Outlet will be the space to render children 
  (the rest of the components) */
  function Layout() {
    return (
      <>
        <Header />
        <ToastContainer/>
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
              <Trip/>
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
              <Bookings />
            </ProtectedRoute>
          )
        },
        {
          path: '*',
          element:(<Navigate to={'/'} />)
        }
      ] }
    
  ];
    
    
  return <RouterProvider routes={routes} />
  ;
};

export default App;