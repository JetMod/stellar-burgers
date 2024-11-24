import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredientsList } from '../../slices/ingredientsSlice';
import { useParams, useNavigate } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredientsList);
  const { id } = useParams<{ id: string }>();

  const findIngredientById = (ingredientId: string | undefined) => {
    if (!ingredientId) {
      navigate('/');
      return null;
    }
    return ingredients.find((ingredient) => ingredient._id === ingredientId);
  };

  const ingredientData = findIngredientById(id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
