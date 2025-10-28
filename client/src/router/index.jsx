import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import MatchFinder from '../pages/MatchFinder';
import Activities from '../pages/Activities';
import ChatRoom from '../pages/ChatRoom';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/register',
    element: <Auth />,
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
