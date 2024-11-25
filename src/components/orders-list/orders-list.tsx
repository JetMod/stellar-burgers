import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchAllIngredients,
  selectIngredientsList
} from '../../slices/ingredientsSlice';
import { OrdersListUI } from '../ui/orders-list';

export const OrdersList: FC<{ orders: any[] }> = ({ orders }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredientsList);

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  return (
    <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
      {orders.length === 0 ? (
        <div>No orders available.</div>
      ) : (
        <OrdersListUI orderByDate={orders} ingredients={ingredients} />
      )}
    </div>
  );
};
