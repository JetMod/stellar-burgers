import { FC, useEffect, useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserData, modifyUser } from '../../slices/authSlice';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (userData) {
      setFormValues({
        email: userData.email || '',
        name: userData.name || '',
        password: ''
      });
    }
  }, [userData]);

  const hasFormChanged =
    formValues.name !== userData?.name ||
    formValues.email !== userData?.email ||
    Boolean(formValues.password);

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(modifyUser(formValues));
  };

  const handleFormCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (userData) {
      setFormValues({
        name: userData.name,
        email: userData.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <ProfileUI
      formValue={formValues}
      isFormChanged={hasFormChanged}
      handleInputChange={handleInputChange}
      handleCancel={handleFormCancel}
      handleSubmit={handleFormSubmit}
    />
  );
};
