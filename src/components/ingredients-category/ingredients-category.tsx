import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { selectBuilderItems } from '../../slices/burgerBuilderSlice';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const builderItems = useSelector(selectBuilderItems);

  const calculateIngredientCounts = useMemo(() => {
    const { bun, ingredients: constructorIngredients } = builderItems;
    const counters: { [key: string]: number } = {};

    constructorIngredients.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (bun) {
      counters[bun._id] = (counters[bun._id] || 0) + 2;
    }

    return counters;
  }, [builderItems]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={calculateIngredientCounts}
      ref={ref}
    />
  );
});
