import { ProtectedRouteProps } from './type';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectUserData,
  selectAuthCheckedStatus
} from '../../slices/authSlice';
import { Preloader } from '../ui/preloader';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectAuthCheckedStatus);
  const currentUser = useSelector(selectUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && currentUser) {
    const redirectTo = location.state?.from || '/';
    return <Navigate replace to={redirectTo} />;
  }

  if (!onlyUnAuth && !currentUser) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
