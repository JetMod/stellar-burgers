import { FC, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { verifyUserAuth } from '../../slices/authSlice';
import { fetchAllIngredients } from '../../slices/ingredientsSlice';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  ResetPassword,
  Login,
  Register,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import '../../index.css';
import styles from './app.module.css';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(verifyUserAuth());
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  const getNumberOrder = () => {
    const orderNumber = location.state?.orderNumber;
    if (!orderNumber) return;

    return orderNumber.length <= 5 ? `0${orderNumber}` : orderNumber;
  };

  const handleCloseModal = () => navigate(-1);

  const routes = (
    <Routes location={background || location}>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/ingredients/:id' element={<IngredientDetails />} />
      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path='/login'
        element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );

  const modalRoutes = background && (
    <Routes>
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/feed/:number'
        element={
          <Modal title={`#${getNumberOrder()}`} onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title={`#${getNumberOrder()}`} onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      {routes}
      {modalRoutes}
    </div>
  );
};

export default App;
