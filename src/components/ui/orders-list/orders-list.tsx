import { FC } from 'react';
import styles from './orders-list.module.css';
import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({
  orderByDate,
  ingredients
}) => (
  <div className={styles.content}>
    {orderByDate.map((order) => (
      <OrderCard order={order} ingredients={ingredients} key={order._id} />
    ))}
  </div>
);
