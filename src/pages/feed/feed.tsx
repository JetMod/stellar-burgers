import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { selectFeedOrders } from '../../slices/feedOrdersSlice';
import { getFeedOrders } from '../../slices/feedOrdersSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedOrders());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeedOrders());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
