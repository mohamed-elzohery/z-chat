import React from 'react';
import classes from './Profile.module.css';
import { UIActions } from '../../slices/UISlice';
import { useAppDispatch } from '../../hooks/app';
import { useAppSelector } from '../../hooks/app';

const Profile = () =>  {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.User);
    console.log(userData)
    const handleClick = () => {
        dispatch(UIActions.openProfileEditor());
    }

  return (
    <section className={classes.profile}>
            <img className={`${classes['profile__img']} clickable`} alt="profile" src={userData.photo} onClick={handleClick} />
            <div className={`${classes['profile__info']} clickable`} onClick={handleClick}>
                <h2 className="heading-2">
                    {userData.name}
                </h2>
                <p className={classes['profile__status']}>
                    {userData.status}
                </p>
            </div>
        </section>
  )
}

export default Profile;
