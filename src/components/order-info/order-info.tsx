import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredientsList } from '../../slices/ingredientsSlice';
import {
  fetchOrderByNumber,
  selectCurrentOrder
} from '../../slices/ordersSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const orderData = useSelector(selectCurrentOrder);
  const ingredientsAll = useSelector(selectIngredientsList);
  const { number } = useParams<{ number: string }>();

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const getIngredientsInfo = (orderIngredients: string[]) => {
    const ingredients = ingredientsAll.filter((ingredient) =>
      orderIngredients.includes(ingredient._id)
    );

    return orderIngredients.reduce(
      (acc, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = acc[item] || { ...ingredient, count: 0 };
          acc[item].count++;
        }
        return acc;
      },
      {} as Record<string, TIngredient & { count: number }>
    );
  };

  const formattedOrderInfo = useMemo(() => {
    if (!orderData) return null;

    const ingredientsInfo = getIngredientsInfo(orderData.ingredients);
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date: new Date(orderData.createdAt),
      total
    };
  }, [orderData, ingredientsAll]);

  if (!formattedOrderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={formattedOrderInfo} />;
};
