import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { registerUserApi, TRegisterData } from '../../utils/burger-api';

export const Register: FC = () => {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [registrationError, setRegistrationError] = useState<Error | null>(
    null
  );
  const navigate = useNavigate();

  const handleRegistration = (e: SyntheticEvent) => {
    e.preventDefault();
    setRegistrationError(null);

    const registrationData: TRegisterData = {
      email: userEmail,
      name,
      password: userPassword
    };

    registerUserApi(registrationData)
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(setRegistrationError);
  };

  return (
    <RegisterUI
      errorText={registrationError?.message}
      userName={name}
      email={userEmail}
      password={userPassword}
      setUserName={setName}
      setEmail={setUserEmail}
      setPassword={setUserPassword}
      handleSubmit={handleRegistration}
    />
  );
};
