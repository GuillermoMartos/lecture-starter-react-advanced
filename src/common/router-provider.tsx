import { RouterProvider, RouteObject, createBrowserRouter } from 'react-router-dom';

type Props = {
    routes: Pick<RouteObject, 'path'|'children'|'element'>[]
}

const MyRouterProvider = ({ routes }:Props): JSX.Element => {
  const router= createBrowserRouter(routes);
  return <RouterProvider router={router}/>;
};

export default MyRouterProvider;