import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppHeaderUI } from '@ui';
import { selectUserData, verifyUserAuth } from '../../slices/authSlice';

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const userName = user ? user.name : '';

  useEffect(() => {
    dispatch(verifyUserAuth() as any);
  }, [dispatch]);

  return <AppHeaderUI userName={userName} />;
};
