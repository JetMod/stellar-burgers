import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const isLoggedIn = Boolean(userName);
  const location = useLocation();

  const isConstructorActive =
    location.pathname === '/' || location.pathname.startsWith('/ingredients');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isConstructorActive ? styles.link_active : styles.link
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon
                type={isConstructorActive ? 'primary' : 'secondary'}
              />
              <p
                className={`text text_type_main-default ml-2 mr-10 ${isConstructorActive ? styles.text_active : ''}`}
              >
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={`text text_type_main-default ml-2 ${isActive ? styles.text_active : ''}`}
              >
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
        <div className={styles.logo}>
          <Logo className={''} />
        </div>
        <div className={styles.menu_part_right} />
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive ? styles.link_position_last : styles.link
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon
                type={isActive || !isLoggedIn ? 'secondary' : 'primary'}
              />
              <span
                className={`text text_type_main-default ml-2 ${isActive ? styles.text_active : ''}`}
              >
                {isLoggedIn ? userName : 'Личный кабинет'}
              </span>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
