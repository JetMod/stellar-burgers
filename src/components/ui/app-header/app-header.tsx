import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <NavLink
        to='/'
        className={({ isActive }) =>
          isActive ? styles.link_active : styles.link
        }
      >
        <BurgerIcon type='primary' />
        <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
      </NavLink>
      <NavLink
        to='/feed'
        className={({ isActive }) =>
          isActive ? styles.link_active : styles.link
        }
      >
        <ListIcon type='primary' />
        <p className='text text_type_main-default ml-2'>Лента заказов</p>
      </NavLink>
      <div className={styles.logo}>
        <Logo className={''} />
      </div>
      <div className={styles.menu_part_right} />
      <NavLink
        to='/profile'
        className={({ isActive }) =>
          isActive ? styles.link_position_last : styles.link_active
        }
      >
        <ProfileIcon type='primary' />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
      </NavLink>
    </nav>
  </header>
);
