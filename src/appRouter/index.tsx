import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Wrapper from '../components/wrapper';
import Loader from '../components/loader';

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/auth'));
const UserDetail = lazy(() => import('../pages/userDetail'));
const ErrorPage = lazy(() => import('../pages/errorPage'));
const NotFound = lazy(() => import('../pages/notFound'));

const AppRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/home',
        element: (
          <Suspense fallback={<Loader />}>
            <Wrapper>
              <Home />
            </Wrapper>
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/user/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <Wrapper>
              <UserDetail />
            </Wrapper>
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFound />, errorElement: <ErrorPage /> },
    ],
  },
]);

export default AppRouter;
