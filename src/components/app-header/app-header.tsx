import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppHeaderUI } from '@ui';
import { selectUserData, verifyUserAuth } from '../../slices/authSlice'; // Импортируйте ваш селектор и thunk

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData); // Получаем данные пользователя
  const userName = user ? user.name : ''; // Получаем имя пользователя

  useEffect(() => {
    // Проверяем авторизацию пользователя при загрузке
    dispatch(verifyUserAuth() as any); // Приведение типа для обхода ошибки
  }, [dispatch]);

  return <AppHeaderUI userName={userName} />;
};
