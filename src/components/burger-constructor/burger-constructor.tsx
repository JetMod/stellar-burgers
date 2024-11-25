import { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectBuilderItems,
  resetBuilder
} from '../../slices/burgerBuilderSlice';
import {
  selectIsOrderRequestPending,
  selectModalOrderData,
  createBurgerOrder,
  clearModalAfterOrder
} from '../../slices/ordersSlice';
import { selectUserData } from '../../slices/authSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectBuilderItems);
  const isUserRegistered = useSelector(selectUserData) !== null;
  const orderRequest = useSelector(selectIsOrderRequestPending);
  const orderModalData = useSelector(selectModalOrderData);
  const getBurgerIngredientIds = useMemo(() => {
    const ingredientIds = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );

    if (constructorItems.bun) {
      const bunId = constructorItems.bun._id;
      ingredientIds.unshift(bunId);
      ingredientIds.push(bunId);
    }

    return ingredientIds;
  }, [constructorItems]);

  const calculateTotalPrice = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (total, ingredient: TConstructorIngredient) => total + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const handleOrderClick = () => {
    if (!isUserRegistered) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(createBurgerOrder(getBurgerIngredientIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(clearModalAfterOrder());
    dispatch(resetBuilder());
  };

  useEffect(() => {
    if (orderModalData) {
      dispatch(resetBuilder());
    }
  }, [orderModalData, dispatch]);

  return (
    <BurgerConstructorUI
      price={calculateTotalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
