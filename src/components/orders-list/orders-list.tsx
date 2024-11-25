import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchAllIngredients,
  selectIngredientsList
} from '../../slices/ingredientsSlice';
import { OrderCard } from '../order-card';

export const OrdersList: FC<{ orders: any[] }> = ({ orders }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredientsList);

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  return (
    <div>
      {orders.length === 0 ? (
        <div>No orders available.</div>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id} order={order} ingredients={ingredients} />
        ))
      )}
    </div>
  );
};
