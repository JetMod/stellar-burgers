import { FC } from 'react';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectFeedOrders,
  selectTotalFeedOrders,
  selectTotalTodayFeedOrders
} from '../../slices/feedOrdersSlice';

const filterOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter(({ status: orderStatus }) => orderStatus === status)
    .map(({ number }) => number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectTotalFeedOrders);
  const totalToday = useSelector(selectTotalTodayFeedOrders);

  const readyOrders = filterOrdersByStatus(orders, 'done');
  const pendingOrders = filterOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
