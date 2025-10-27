import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import MatchFinder from '../pages/MatchFinder';
import Activities from '../pages/Activities';
import ChatRoom from '../pages/ChatRoom';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/match-finder',
    element: <MatchFinder />,
  },
  {
    path: '/activities',
    element: <Activities />,
  },
  {
    path: '/chat/:roomId',
    element: <ChatRoom />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
